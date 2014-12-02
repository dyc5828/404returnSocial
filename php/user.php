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

	public static function checkNull($array) {
		// echo 'checkNull<br/>'.L;
		
		foreach($array as $key => $value) {
			if ($key == 'id') {
				$array[$key] = $value;
			} else if($value == '') {
				$array[$key] = 'NULL';
			} else {
				$array[$key] = "'".$value."'";
			}
		}
		// print_r($array);

		return $array;
	}

	public static function updateUser($user) {
		// echo 'updateUser<br/>'.L;
		// print_r($user);
		// echo $user['id'];
		$user = user::checkNull($user);

		$con = user::connectDB();

		$update_sql = 
			"UPDATE users
			SET twitter=$user[twitter],
				instagram=$user[instagram],
				pinterest=$user[pinterest]
			WHERE id = $user[id]";
		// echo $update_sql;
		$update_result = mysqli_query($con,$update_sql);
		if(!$update_result) {
			exit ('user update error'.mysqli_error($con));
		} else {
			// echo 'user updated';
		}
	}

	public static function captureUser($fbid) {
		// echo 'captureUser<br/>'.$fbid.L;

		$con = user::connectDB();

		$capture_sql = "SELECT * FROM users WHERE facebook = $fbid";
		$capture_result = mysqli_query($con,$capture_sql);
		if(!$capture_result) {
			exit ('user capture error'.mysqli_error($con));
		}

		$user = mysqli_fetch_array($capture_result);
		// print_r($user); 

		return $user;
	}

	public static function createUser($fbid) {
		// echo 'createUser<br/>'.$fbid.L;

		$con = user::connectDB();
		$user = null;

		$create_sql = "INSERT INTO users (facebook) VALUES ($fbid)";
		$create_result = mysqli_query($con,$create_sql);
		if(!$create_result) {
			exit('create error:'.mysqli_error($con));
		} else {
			// echo 'capture user'.L;
			$user = user::captureUser($fbid);
		}

		return $user;
	}
	
	public static function checkUserFacebook($fbid) {
		// echo 'checkUserFacebook<br/>'.$fbid.L;
		
		$con = user::connectDB();
		$user = null;

		$user_sql = "SELECT id FROM users WHERE facebook = $fbid";
		$user_result = mysqli_query($con,$user_sql);
		if(!$user_result) {
			exit('user error:'.mysqli_error($con));
		}
		// print_r($user_result);

		$user_known = $user_result->num_rows;
		// echo $user_known;

		if($user_known == 0) {
			// echo 'create user'.L;
			$user = user::createUser($fbid);
		} else {
			// echo 'user found'.L;
			$user = user::captureUser($fbid);
		}

		return $user;
	}

	public static function test() {
		return HOST;
	}
}