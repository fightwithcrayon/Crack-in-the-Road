<?php
function updateSpotify($force = false) {
	$ignore = array(
		'Release radar' => '37i9dQZEVXbs3J2wfh1mGg'
	);
  syslog(LOG_NOTICE, strtotime('now') . " Checking Spotify....");
	loadSpotify();
	$session = new SpotifyWebAPI\Session(
	    '4a98167631d64a4ca9e77f267cf3fb51',
	    'ac20fadd1b7e4574857fdefc52fa9aa3',
	    'http://citrdev:8888'
	);
	$api = new SpotifyWebAPI\SpotifyWebAPI();

	// Request a access token with optional scopes
	$scopes = array(
	    'playlist-read-private',
	    'user-read-private'
	);

	$session->requestCredentialsToken($scopes);
	$accessToken = $session->getAccessToken(); // We're good to go!

	// Set the code on the API wrapper
	$api->setAccessToken($accessToken);

	$set = array();
	$list = $api->getUserPlaylists('crackintheroad')->items;
	foreach($list as $entry) {
		if(!in_array($entry->id, $ignore)) {
			$set[] = $api->getUserPlaylist('crackintheroad', $entry->id);
		}
	}
	$set = json_encode($set);
	update_option('spotify_playlist', $set);
  syslog(LOG_NOTICE, strtotime('now') . " Spotify updated.");
}

function updatePopularAnalytics(){
  $current_time = strtotime('now');
  syslog(LOG_NOTICE, $current_time . " contacting Google services for popular posts....");
	require_once __DIR__ . '/../class/Google/vendor/autoload.php';
  $KEY_FILE_LOCATION = __DIR__ . '/../class/service-account-credentials.json';

  // Create and configure a new client object.
  $client = new Google_Client();
  $client->setApplicationName("CITR Popular posts pull");
  $client->setAuthConfig($KEY_FILE_LOCATION);
  $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
  $analytics = new Google_Service_AnalyticsReporting($client);

  // Replace with your view ID, for example XXXX.
  $VIEW_ID = "49013870";

  // Create the DateRange object.
  $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  if ($current_time > strtotime('12:00am') && $current_time < strtotime('03:00am')) { 
  	$dateRange->setStartDate("yesterday");
  } else {
  	$dateRange->setStartDate("today");
  }
  $dateRange->setEndDate("today");

  // Create the Metrics object.
  $pageviews = new Google_Service_AnalyticsReporting_Metric();
  $pageviews->setExpression("ga:pageviews");

  // Create the Dimensions object.
  $dimensions = new Google_Service_AnalyticsReporting_Dimension();
  $dimensions->setName("ga:pagePath");

  $order = new Google_Service_AnalyticsReporting_OrderBy();
  $order->setFieldName("ga:pageviews");
  $order->setSortOrder("DESCENDING");

  // Create the ReportRequest object.
  $request = new Google_Service_AnalyticsReporting_ReportRequest();
  $request->setViewId($VIEW_ID);
  $request->setDateRanges($dateRange);
  $request->setMetrics(array($pageviews));
  $request->setDimensions(array($dimensions));
  $request->setOrderBys(array($order));
  $request->setPageSize(10);

  $body = new Google_Service_AnalyticsReporting_GetReportsRequest();
  $body->setReportRequests( array( $request) );

  $reports = $analytics->reports->batchGet( $body );

  $results = array();
  for ( $reportIndex = 0; $reportIndex < count( $reports ); $reportIndex++ ) {
    $report = $reports[ $reportIndex ];
    $header = $report->getColumnHeader();
    $dimensionHeaders = $header->getDimensions();
    $metricHeaders = $header->getMetricHeader()->getMetricHeaderEntries();
    $rows = $report->getData()->getRows();

    for ( $rowIndex = 0; $rowIndex < count($rows); $rowIndex++) {
      $row = $rows[ $rowIndex ];
      $dimensions = $row->getDimensions();
      $metrics = $row->getMetrics();
      for ($i = 0; $i < count($dimensionHeaders) && $i < count($dimensions); $i++) {
        //This is page path
        //Debug: print($dimensionHeaders[$i] . ": " . $dimensions[$i] . "\n");
        if($dimensions[$i] !== '/') {
          $pathFragments = explode('/', $dimensions[$i]);
          $idFragments = explode('-', end($pathFragments));
          $results[$rowIndex] = array($idFragments[0]);
        } else {
          $results[$rowIndex] = array('Home');
        }
      }

      for ($j = 0; $j < count( $metricHeaders ) && $j < count( $metrics ); $j++) {
        $entry = $metricHeaders[$j];
        $values = $metrics[$j];
        //This is junk: metric type
        //Debug: print("Metric type: " . $entry->getType() . "\n" );
        for ( $valueIndex = 0; $valueIndex < count( $values->getValues() ); $valueIndex++ ) {
          $value = $values->getValues()[ $valueIndex ];
          //This is pageviews
          //Debug: print($entry->getName() . ": " . $value . "<br />");
          $results[$rowIndex][] = $value;
        }
      }
    }
  }
  update_option('popular_stats', $results);
  syslog(LOG_NOTICE, strtotime('now') . " Finished pulling popular posts");
}

add_action( 'citr_updateSpotify_cron', 'updateSpotify' );
add_action( 'citr_popularanalytics_cron', 'updatePopularAnalytics' );


function on_activation_cron() {
    if ( ! wp_next_scheduled( 'citr_updateSpotify_cron' ) ) {
  		wp_schedule_event( time(), 'hourly', 'citr_updateSpotify_cron' );
	}
    if ( ! wp_next_scheduled( 'citr_popularanalytics_cron' ) ) {
  		wp_schedule_event( time(), 'hourly', 'citr_popularanalytics_cron' );
	}
}
register_activation_hook(__FILE__, 'on_activation_cron');

function on_deactivation_cron() {
	wp_clear_scheduled_hook('citr_updateSpotify_cron');
	wp_clear_scheduled_hook('citr_popularanalytics_cron');
}
register_deactivation_hook(__FILE__, 'on_deactivation_cron');
