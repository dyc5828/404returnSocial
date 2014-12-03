<?php
/*
 * PHP CONFIG FILE
 */
// echo 'config.php<hr/>'.PHP_EOL; //debug

/* server name */
define('SERVER', $_SERVER['SERVER_NAME']);
// echo SERVER;

if(SERVER == 'localhost') {
	// echo  'localhost config';
	define('DIR', 'http://localhost:8080/itp404/returnSocial/'); //base dir
	define('JQ', 'http://code.jquery.com/jquery-2.1.1.js'); //jquery uncomp
	$FB = [];
	$FB['app_id'] = '544843495653322'; //fb app id
	$FB['app_secret'] = '1f661950a02ac76c0611c0345a7fe5d7'; //fb app secret
	$TWITTER = [];
	$TWITTER['app_key'] = 'kce44m40sezTJxTwk7C7j36ww'; //twitter app key
	$TWITTER['app_secret'] = 'hvUrDc3oqBnMmoGoHHppKTlON9XSoEk5Vw0GHXRR3yIWcpk03i'; //twitter app secret
	$INSTAGRAM = [];
	$INSTAGRAM['client_id'] = '34c1dbb66e944743bdb531609e6653e8'; //instagram client id
} else {
	// echo 'server config';
	define('DIR', 'http://itp.dchenportal.com/returnSocial/'); //base dir
	define('JQ', 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'); //jquery google min
	$FB = [];
	$FB['app_id'] = '544842565653415'; //fb app id
	$FB['app_secret'] = 'ed649a8655171df1e0e8f1c5f605d1ce'; //fb app secret
	$TWITTER = [];
	$TWITTER['app_key'] = 'AmKsHckwn2HUDrrRXuQDcC242'; //twitter app key
	$TWITTER['app_secret'] = 'uVk8aMzNny8P0FopMC72i6PlieZUGQB4dwpOc9kemXMl0fh9Rm'; //twitter app secret
	$INSTAGRAM = [];
	$INSTAGRAM['client_id'] = 'a7adc452b3db45d8bbfabc388070b578'; //instagram client id
}

/*
 * BASE DIR
 */
// const DIR = 'http://localhost:8080/itp404/returnSocial/'; //localhost
// const DIR = 'http://itp404.dchenportal.com/'; //dchenportal

/*
 * PHP CONST
 */
const L = PHP_EOL;

/*
 * PLUGIN LINKS
 */
// jQuery - google cdn/prod
// const JQ = "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"; //min
// const JQ = "http://code.jquery.com/jquery-2.1.1.js"; //uncompressed


/*
 * DATABASE SETTINGS
 */
const HOST = "uscitp.com";
const USER = "dongyanc_2014";
const PASSWORD = "usc2014";
const DATABASE = "dongyanc_returnSocial";
// echo HOST;


/*
 * FACEBOOK APP SETTINGS
 */
// $FB = [];

// App ID
// $FB['app_id'] = '544843495653322'; //localhost
// $FB['app_id'] = '544842565653415'; //dchenportal

// App Secret
// $FB['app_secret'] = '1f661950a02ac76c0611c0345a7fe5d7'; //localhost
// $FB['app_secret'] = 'ed649a8655171df1e0e8f1c5f605d1ce'; //dchenportal


/*
 * TWITTER APP SETTINGS
 */
// $TWITTER = [];

// App Key
// $TWITTER['app_key'] = 'kce44m40sezTJxTwk7C7j36ww'; //locahost

// App Secret
// $TWITTER['app_secret'] = 'hvUrDc3oqBnMmoGoHHppKTlON9XSoEk5Vw0GHXRR3yIWcpk03i'; //locahost


/*
 * INSTAGRAM APP SETTINGS
 */
// $INSTAGRAM = [];

//Client ID
// $INSTAGRAM['client_id'] = '34c1dbb66e944743bdb531609e6653e8'; //localhost