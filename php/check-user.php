<?php
/*
 * check-user.php
 */
// echo 'check-user.php<hr/>'.PHP_EOL; //debug line
require_once 'user.php';

if(isset($_GET['data'])) {
	$data = $_GET['data'];
} else {
	$data = 'none';
}
// echo $data;


$response = json_encode(user::checkUserFacebook($data));
echo $response;