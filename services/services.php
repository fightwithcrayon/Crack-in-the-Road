<?php
define( 'WP_USE_THEMES', false ); 
<<<<<<< HEAD:services/services.php
<<<<<<< HEAD:services/services.php
require( '/var/www/crackintheroad.com/htdocs/wp-load.php' );
=======
require( $_SERVER['DOCUMENT_ROOT'] .'/wp-load.php' );
>>>>>>> 289707a65fc384dd4372c48928258c93aacbb7b1:services/services.php
=======
require( $_SERVER['DOCUMENT_ROOT'] .'/wp-load.php' );
>>>>>>> 289707a65fc384dd4372c48928258c93aacbb7b1:services/services.php
function updateSpotify($force = false) {
  $ignore = array(
    'Release radar' => '37i9dQZEVXbs3J2wfh1mGg'
  );
  syslog(LOG_NOTICE, strtotime('now') . " Checking Spotify....");
   loadSpotify();
    $session = new SpotifyWebAPI\Session(
        '4a98167631d64a4ca9e77f267cf3fb51',
        'ac20fadd1b7e4574857fdefc52fa9aa3',
        'https://www.crackintheroad.com'
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
    foreach($set as $playlist) {
      $image = $playlist->images[0]->url;
      $filename = basename($image);
      $uploads = wp_upload_dir()['basedir'];
      $file = $uploads . '/spotify/' . $filename . '.jpg';
      $service = 'http://api.resmush.it/ws.php?img=';
      $quality = '&qlty=66';
      if(!file_exists($file)){
        file_put_contents($file, file_get_contents($image));
        $o = json_decode(file_get_contents($service . 'https://www.crackintheroad.com/' . $file . $quality));
        file_put_contents($uploads . "/spotify/optimised/" . $filename . '.jpg', file_get_contents($o->dest));
        $playlist->images[0]->url = $uploads . '/spotify/optimised/' . $filename;
        $thumb = new Imagick($playlist->images[0]->url . '.jpg');
        $thumb->resizeImage(150,150,Imagick::FILTER_LANCZOS,1, true);
        $thumb->writeImage($playlist->images[0]->url .'_150.jpg');
        $thumb->destroy();
      } else {
        $filename = basename($playlist->images[0]->url);
        $playlist->images[0]->url = $uploads . '/spotify/optimised/' . $filename;
      }
    }
    $set = json_encode($set);
    update_option('spotify_playlist', $set);
    syslog(LOG_NOTICE, strtotime('now') . " Spotify updated.");
}

function updatePopularAnalytics(){
  $current_time = strtotime('now');
  syslog(LOG_NOTICE, $current_time . " contacting Google services for popular posts....");
<<<<<<< HEAD:services/services.php
<<<<<<< HEAD:services/services.php
  require_once get_stylesheet_directory() . '/class/Google/vendor/autoload.php';
  $KEY_FILE_LOCATION = get_stylesheet_directory() . '/class/service-account-credentials.json';
=======
  require_once get_stylesheet_directory_uri() . '/class/Google/vendor/autoload.php';
  $KEY_FILE_LOCATION = get_stylesheet_directory_uri() . '/class/service-account-credentials.json';
>>>>>>> 289707a65fc384dd4372c48928258c93aacbb7b1:services/services.php
=======
  require_once get_stylesheet_directory_uri() . '/class/Google/vendor/autoload.php';
  $KEY_FILE_LOCATION = get_stylesheet_directory_uri() . '/class/service-account-credentials.json';
>>>>>>> 289707a65fc384dd4372c48928258c93aacbb7b1:services/services.php

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
        $pathFragments = explode('/', $dimensions[$i]);
        $idFragments = explode('-', end($pathFragments));
        if(is_numeric($idFragments[0])) $results[$rowIndex] = array($idFragments[0]);
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
  syslog(LOG_NOTICE, strtotime('now') . $results);
}

updateSpotify();
updatePopularAnalytics();