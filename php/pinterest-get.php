<?php
/*
 * pinterest-get.php
 */
// echo 'pinterest-get.php<hr/>'; //debug line

// config
include_once 'config.php';

// pinterest endpoints
// http://www.pinterest.com/USERNAME/feed.rss
$rss_ep = ['http://www.pinterest.com/','/feed.rss'];
// http://pinterestapi.co.uk/USERNAME/pins
$pin_ep = ['http://pinterestapi.co.uk/','/pins'];

// capture data
// print_r($_GET);
$input = $_GET['input'];
// echo $input;

// call api
$rss_url = $rss_ep[0].$input.$rss_ep[1];
// echo $rss_url;
$rss_xml = file_get_contents($rss_url);
// echo $rss_xml;

$pin_url = $pin_ep[0].$input.$pin_ep[1];
$pin_json = file_get_contents($pin_url);
// echo $pin_json;
$pin_response = json_decode($pin_json);
// print_r($pin_response);
$pin = $pin_response->body;
// echo $pin;

$pins = json_encode(['rss'=>$rss_xml,'pins'=>$pin]);
echo $pins;