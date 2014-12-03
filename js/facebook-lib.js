/*
 * FACEBOOK LIBRARY JS
 */
// console.log('facebook-lib.js');

statusChangeCallback = function(response) {
    // console.log('statusChangeCallback');
    // console.log(response);

    var fbSvc = helper.ngSvc('facebook');
    var userSvc = helper.ngSvc('user');
    var buildSvc = helper.ngSvc('build');
    // console.log(buildSvc);

    if (response.status === 'connected') {
		// Logged into your app and Facebook.
		// console.log('fb connected');

		fbSvc.setToken(response.authResponse.accessToken);

		// helper.updateSC('LoginCtrl','fbLog', false);
		// helper.updateSC('LoginCtrl','userids.twitterid','bacon');
		helper.ngRtSC()['fbLog'] = false;
		helper.ngRtSC().$apply();

		fbSvc.getMe(function(response) {
			// console.log(response);
			helper.updateSC('HeaderCtrl','username',response.first_name);

			fbSvc.setUserid(response.id);
			// console.log(fbSvc.getUserid());
			
			helper.checkUser(response.id, function(response) {
				// console.log('callback');
				// console.log(response);

				var userids = {
					twitterid: response.twitter,
					instagramid: response.instagram,
					pinterestid: response.pinterest
				};

				// helper.updateSC('LoginCtrl','userids',userids);
				helper.ngRtSC()['userids'] = userids;
				helper.ngRtSC().$apply();

				userSvc.setID(response.id);

				buildSvc.getFeeds(response);
			});
		});

		fbSvc.getPosts(function(response) {
			// console.log('get facebook');
			// console.log(response);

			var result = response.data;
			// console.log(result);

			var posts = fbSvc.resolveDate(result);
			// console.log(posts);

			posts = fbSvc.cleanPosts(posts);
			// console.log(posts);
			// helper.updateSC('FeedCtrl','posts',posts);
			helper.ngRtSC()['posts'] = posts;
			helper.ngRtSC().$apply();
			console.log('posts done');
		});
    } else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		// console.log('fb not auth');

		helper.updateSC('HeaderCtrl','username','Please authorize our app');

		// helper.updateSC('LoginCtrl','fbLog', false);
		helper.ngRtSC()['fbLog'] = false;
		helper.ngRtSC().$apply();
    } else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		// console.log('fb not log');

		helper.updateSC('HeaderCtrl','username','Please log in');

		// helper.updateSC('LoginCtrl','fbLog', true);
		helper.ngRtSC()['fbLog'] = true;
		helper.ngRtSC().$apply();
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