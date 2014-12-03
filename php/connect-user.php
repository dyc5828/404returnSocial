<?php
/*
 * connect-user.php
 */
// echo 'connect-user.php<hr/>'.PHP_EOL; //debug line
require_once 'user.php';

if(isset($_GET['id'])) {
	// echo 'isset'.$_GET['id'];
	// print_r($_GET);

	$user = [];
	foreach($_GET as $key => $value) {
		$user[$key] = $value;
	}
	// print_r($user);

	user::updateUser($user);
	// echo 'success';
	exit;
} else {
	// echo 'not isset';
	// echo 'failure';
	exit;
}