<?php
define('WP_USE_THEMES', false);
require('./wp-load.php');
date_default_timezone_set('Europe/London');
require_once __DIR__ . '/../class/Google/vendor/autoload.php';

$analytics = initializeAnalytics();
$response = getReport($analytics);
$results = calculateResults($response);

submitResults($results);

function initializeAnalytics()
{
  // Creates and returns the Analytics Reporting service object.

  // Use the developers console and download your service account
  // credentials in JSON format. Place them in this directory or
  // change the key file location if necessary.
  $KEY_FILE_LOCATION = __DIR__ . '/service-account-credentials.json';

  // Create and configure a new client object.
  $client = new Google_Client();
  $client->setApplicationName("Hello Analytics Reporting");
  $client->setAuthConfig($KEY_FILE_LOCATION);
  $client->setScopes(['https://www.googleapis.com/auth/analytics.readonly']);
  $analytics = new Google_Service_AnalyticsReporting($client);

  return $analytics;
}

function getReport($analytics) {

  // Replace with your view ID, for example XXXX.
  $VIEW_ID = "49013870";

  // Create the DateRange object.
  $dateRange = new Google_Service_AnalyticsReporting_DateRange();
  $dateRange->setStartDate("today");
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
  return $analytics->reports->batchGet( $body );
}

function calculateResults($reports) {
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
  return $results;
}

function submitResults($results) {
  update_option('popular_stats', $results);
}
?>