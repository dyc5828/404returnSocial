<?php
/* 
 * twtitter-get.php
 */
// echo 'twitter-get.php ' . date('d/m/Y == H:i:s') . '<hr/>'; //debug line

include_once 'config.php';
require_once 'twitter-api.php';

// print_r($_GET);

$input = $_GET['input'];
// echo $input;

twitter::set_app([
    'api_key' => $TWITTER['app_key'],
    'api_secret' => $TWITTER['app_secret'],
]);

// $timeline = twitter::get_timeline('dchen2913');
$timeline = twitter::get_timeline($input);
echo $timeline;