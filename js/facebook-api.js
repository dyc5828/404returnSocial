/* Facebook API Library*/
// console.log('Facebook API Library');

statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    // console.log(response);

    var fbSvc = angular.element(document.body).injector().get('facebook');
    // console.log(fbSvc);

    fbSvc.setToken(response.authResponse.accessToken);

    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
		// Logged into your app and Facebook.
		console.log('fb connected');
		var userid;

		fbSvc.getUsername(function(response) {
			// console.log(response);
			helper.updateSC('HeaderController','username',response.first_name);
			helper.checkUser(response.id);
		});

		fbSvc.getPosts(function(response) {
			// console.log(response);
		});

		// displayName();
		// facebook.getApi(response.authResponse.accessToken);
		// $('#username').html('Connected');

    } else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.

		console.log('fb not auth');
		helper.updateSC('HeaderController','username','not auth');

		// $('#username').html('Not Authorized');

    } else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.

		console.log('fb not log');
		helper.updateSC('HeaderController','username','log in');

		// $('#username').html('Log In');
    }
}

checkLoginState = function() {
	console.log('checkLoginState');
    FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
    });
}

fbInit = function(app) {
	console.log('facebook.init api.js');
	// console.log(app.id, app.ver);;

	window.fbAsyncInit = function() {
		FB.init({
			appId      : app.id, // app id
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : app.ver // use version 2.2
		});

		FB.getLoginStatus(function(response) {
			console.log('getLoginStatus');
			statusChangeCallback(response);
		});
	};
}

// getApi = function(token) {
// 	var feed = '/me/posts?limit=100&access_token=' + token;
// 	// console.log(feed);

// 	FB.api(feed, function(response) {
// 		// console.log(response);
// 		results.fb = response.data;
// 		console.log(results.fb);
// 	});
// }
