<?php
/*
 * test-user.php
 */
echo 'test-user.php<hr/>'.PHP_EOL; //debug line
require_once 'user.php';

// RUN
// echo user::$data; //error private
// echo user::test();





#check-user
// if(isset($_GET['id'])) {
// 	// echo 'isset'.$_GET['id'];
// 	// print_r($_GET);

// 	$user = [];
// 	foreach($_GET as $key => $value) {
// 		$user[$key] = $value;
// 	}
// 	// print_r($user);

// 	user::updateUser($user);
// } else {
// 	// echo 'not isset';
// 	exit;
// }

// echo $id.$tw.$ins.$pin;



#connect-user
// if(isset($_GET['data'])) {
// 	$data = $_GET['data'];
// } else {
// 	$data = 'none';
// }
// echo $data;

// $response = json_encode(user::checkUserFacebook($data));
// echo $response;

// $id = $_GET['id'];
// $tw = $_GET['twitter'];
// $ins = $_GET['instagram'];
// $pin = $_GET['pinterest'];