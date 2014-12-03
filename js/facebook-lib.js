/*
 * FACEBOOK LIBRARY JS
 */
// console.log('facebook-lib.js');

statusChangeCallback = function(response) {
    // console.log('statusChangeCallback');
    // console.log(response);

    var fbSvc = helper.ngSvc('facebook');
    var userSvc = helper.ngSvc('user');

    // var buildSvc = helper.ngSvc('build');
    // console.log(buildSvc);

    if (response.status === 'connected') {
		// console.log('fb connected');
		
		fbSvc.setToken(response.authResponse.accessToken);
		helper.updateSC('BkgdCtrl','showFB',false);

		fbSvc.getMe(function(response) {
			// console.log('/me callback');
			// console.log(response);

			// set user info
			fbSvc.setId(response.id);
			helper.updateSC('BkgdCtrl','username',response.first_name);
			
			// check for user in DB
			helper.checkUser(response.id, function(response) {
				// console.log('checkUser callback');
				// console.log(response);

				var user = {
					id: response.id,
					twitter: response.twitter,
					instagram: response.instagram,
					pinterest: response.pinterest
				};
				// console.log(user);

				userSvc.setAll(user);
				helper.ngSC('BkgdCtrl').$apply();

				helper.updateSC('BkgdCtrl','userReady',true);
			});
		});

    } else if (response.status === 'not_authorized') {
		// console.log('fb not auth');

		helper.updateSC('BkgdCtrl','username','Please authorize our app');
		helper.updateSC('BkgdCtrl','showFB',false);
		helper.updateSC('BkgdCtrl','userReady','none');
    } else {
		// console.log('fb not log');

		helper.updateSC('BkgdCtrl','username','Please log in');
		helper.updateSC('BkgdCtrl','showFB',true);
		helper.updateSC('BkgdCtrl','userReady','none');
    }
}

checkLoginState = function() {
	// console.log('checkLoginState');
    FB.getLoginStatus(function(response) {
    	statusChangeCallback(response);
    });
}

fbInit = function(app) {
	// console.log('facebook.init api.js');
	// console.log(app);

	FB.init({
		appId      : app.id, // app id
		cookie     : true,  // enable cookies to allow the server to access the session
		xfbml      : true,  // parse social plugins on this page
		version    : app.ver // use version 2.2
	});

	FB.getLoginStatus(function(response) {
		// console.log('getLoginStatus');
		statusChangeCallback(response);
	});
}