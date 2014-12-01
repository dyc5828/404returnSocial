<?php
/*
 * instagram-get.php
 */
// echo 'instagram-get.php<hr/>'; //debug line

// config
include_once 'config.php';

// instagram endpoints
// https://api.instagram.com/v1/users/search?q=USERNAME&client_id=CLIENT-ID
$user_ep = ['https://api.instagram.com/v1/users/search?q=','&client_id='];
// https://api.instagram.com/v1/users/USER-ID/media/recent/?client_id=CLIENT-ID
$media_ep = ['https://api.instagram.com/v1/users/','/media/recent/?client_id='];

// capture data
// print_r($_GET);
$input = $_GET['input'];
// echo $input;



$user_url = $user_ep[0].$input.$user_ep[1].$INSTAGRAM['client_id'];
// echo $user_url;
$user_response = file_get_contents($user_url);
$user = json_decode($user_response);
// print_r($user);
$userid = $user->data[0]->id;
// echo $userid;

$media_url = $media_ep[0].$userid.$media_ep[1].$INSTAGRAM['client_id'];
// echo $media_url;
$media_json = file_get_contents($media_url);
// echo $media_json;
$media_response = json_decode($media_json);
$media = json_encode($media_response->data);
echo $media;