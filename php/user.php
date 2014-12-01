<?php
/*
 * users.php
 */
// echo 'user.php<hr/>'.PHP_EOL; //debug line
include_once 'config.php';

class user
{
	private static $data = [];

	private static function connectDB() {
		return mysqli_connect(HOST, USER, PASSWORD, DATABASE);
	}

	public static function captureUser($fbid) {
		echo 'captureUser<br>'.$fbif.L;

		$con = user::connectDB();
		$capture_sql = "SELECT id FROM users WHERE facebook = $fbid";
		$capture_result = mysqli_query($con,$capture_sql);
	}

	public static function createUser($fbid) {
		echo 'createUser<br/>'.$fbid.L;

		$con = user::connectDB();

		$create_sql = "INSET INTO users(facebook) VALUES ($fbid)"
		$create_result = mysqli_query($con,$create_sql);
		if(!$create_result) {
			exit('create error:'.mysqli_error($con));
		} else {
			echo 'capture user'.L;
		}
	}
	
	public static function checkUserFacebook($fbid) {
		echo 'checkUserFacebook<br/>'.$fbid.L;
		
		$con = user::connectDB();

		$user_sql = "SELECT id FROM users WHERE facebook = $fbid";
		$user_result = mysqli_query($con,$user_sql);
		if(!$user_result) {
			exit('user error:'.mysqli_error($con));
		}
		// print_r($user_result);

		$user_known = $user_result->num_rows;
		// echo $user_known;

		if ($user_knwon == 0) {
			echo 'create user'.L;
		} else {
			echo 'user found'.L;
		}

	}

	public static function test() {
		return HOST;
	}
}


// RUN
// echo user::$data; //error private
// echo user::test();

$data = $_GET['data'];
// echo $data;

user::checkUserFacebook($data);