/*
 * CONFIG JS
 */
// console.log('config.js');
var config = window.config || {};

/* server name */
config.SERVER = window.location.hostname;
// console.log(config.server);

if(config.SERVER == 'localhost') {
	// localhost config
	config.DIR = 'http://localhost:8080/itp404/returnSocial/'; //base dir
	config.FBID = '544843495653322'; //fb app id
	config.FBVER = 'v2.2'; //fb sdk ver
	config.INSID = '34c1dbb66e944743bdb531609e6653e8'; //instagram client id
} else {
	// server config
	config.DIR = 'http://itp404.dchenportal.com/'; //base dir
	config.FBID = '544842565653415'; //fb app id
	config.FBVER = 'v2.2'; //fb sdk ver
	config.INSID = ''; //instagram client id
}


// /*
//  * BASE DIR
//  */
// config.DIR = 'http://localhost:8080/itp404/returnSocial/'; //localhost
// // config.DIR = 'http://itp404.dchenportal.com/'; //dchenportal


// /*
//  * FACEBOOK APP SETTINGS
//  */
// // App ID
// config.FBID = '544843495653322'; //localhost
// // config.FBID = '544842565653415'; //dechenportal

// // App Version
// config.FBVER = 'v2.2'; //js sdk version


// /*
//  * INSTAGRAM APP SETTINGS
//  */
// // Client ID
// config.INSID = '34c1dbb66e944743bdb531609e6653e8'; //localhost