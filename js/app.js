/*
 * APP JS - ng app SOCIAL
 */
// console.log('main.js -ng app SOCIAL');
var app = angular.module('social', ['ngRoute']);
// var app = angular.module('social', []);

/*
 * CONFIG
 */
app.config(function($routeProvider) {
	// app.config(function() {
	console.log('config app')

	$routeProvider
    .when('/connect', { //mysite.com/#/gradebook
      templateUrl: 'js/templates/connect.html',
      // controller: 'ConnectCtrl'
    })
    .when('/feed', {
      templateUrl: 'js/templates/feed.html',
      // controller: 'FeedCtrl'
    })
    .otherwise({
      redirectTo: 'connect'
    })
});

/*
 * RUN
 */
app.run(function($window,$document,$rootScope,config) {
	console.log('run app');

	// // register listener to watch route changes
	// // $locationChangeStart | next.$$route | next.$route.templateUrl
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		console.log('routing');
	// 	if ( $rootScope.loggedUser == null ) {
	// 		// no logged user, we should be going to #login
	// 		if ( next.templateUrl == "partials/login.html" ) {
	// 			// already going to #login, no redirect needed
	// 		} else {
	// 			// not going to #login, we should redirect now
	// 			$location.path( "/login" );
	// 		}
	// 	}
	});

	$document.ready(function() {
		console.log('DOM ready');
		// console.log(config);

		// facebook api
		$window.fbInit({
			id: config.FBID,
			ver: config.FBVER,
		});
	});
});

/*
 * CONTROLLERS
 */
app.controller('TestCtrl', function($window, $scope, twitter, instagram, pinterest) {
	// console.log('TestCtrl');
	$scope.feed = {};
	$scope.testInput = 'dchen2913';

	$scope.formSubmit = function() {
		// console.log($scope.testInput);
		var input = $scope.testInput;

		twitter.get(input).then(function(response) {
			var result = response.data;
			// console.log(result);

			var tweet = twitter.resolveDate(result);
			console.log(tweet);
		});

		instagram.get(input).then(function(response) {
			var result = response.data;
			// console.log(result);

			var media = instagram.resolveDate(result);
			console.log(media);
		});

		pinterest.get(input).then(function(response) {
			var result = response.data;
			// console.log(result);

			var dates = pinterest.findDate(result.rss);
			var rawPins = result.pins;
			// console.log(rawPins);

			var pins = pinterest.addDate(rawPins,dates)
			console.log(pins);
		});
	}
});

app.controller('BkgdCtrl', function($location, $scope, user, build, facebook, FB) {
	console.log('BkgdCtrl');

	$scope.feeds = build.getFeed();
	$scope.posts = [];
	$scope.userReady = false;

	// background auto
	$scope.username = 'Waiting for Facebook Login';
	$scope.showFB = true;
	$scope.userInfo = user.getAll();

	$scope.$watch('showFB', function() {
		// console.log('show FB changed ',$scope.showFB);
		FB.XFBML.parse();
	});

	$scope.$watch('userInfo', function() {
		// console.log('userInfo changed ',$scope.userInfo);
		// user.setAll($scope.userInfo);
	}, true);

	// default run
	$scope.$watch('userReady', function(newVal) {
		// console.log('userReady changed ',newVal);

		if ($scope.userReady == true) {
			facebook.getPosts(function(response) {
				var posts = response.data;
				posts = facebook.resolveDate(posts);
				posts = facebook.cleanPosts(posts);
				$scope.posts = posts;
			});

			build.getFeeds($scope.userInfo);
		} else if ($scope.userReady == 'none') {
			$location.path('/connect');
		}
	});

	// event task
	$scope.$on('newConnect', function(event, response) {
		// console.log('newConnect ', event, response)

		facebook.getPosts(function(response) {
			// console.log('getPosts Callback');
			// console.log(response);

			var posts = response.data;
			// console.log(result);

			posts = facebook.resolveDate(posts);
			// console.log(posts);

			posts = facebook.cleanPosts(posts);
			// console.log(posts);

			$scope.posts = posts;
		});

		build.getFeeds($scope.userInfo);
	});

	$scope.bc = function(name,msg) {
		return $scope.$broadcast(name,msg);
	}
	$scope.$watch('posts', function() {
		// console.log('posts changed');

		$scope.bc('feedReady',$scope.posts);
	});
	$scope.$watch('feeds', function() {
		// console.log('feeds changed')

		$scope.bc('feedReady',$scope.posts);
	},true);
});

app.controller('ConnectCtrl', function($location, $scope, user) {
	console.log('ConnectCtrl');

	// current user
	
	$scope.$watch('userInfo', function(newInfo) {
		// console.log('userInfo changed ', newInfo);
	}, true);

	// connect function
	$scope.connect = function() {
		// console.log('connect()');
		$scope.userInfo = user.getAll();

		user.updateConnect($scope.userInfo).then(function(response) {
			// console.log(response.data);
		});

		// send task to bkgd ctrl
		$scope.$emit('newConnect', user.getAll());

		$location.path('/feed');
	}
});

app.controller('FeedCtrl', function($scope, build) {
	console.log('FeedCtrl');

	$scope.feeds = build.getFeed();
	$scope.posts = [];
	$scope.master = [];

	$scope.$on('feedReady', function(event, response) {
		// console.log('on feedReady');

		$scope.posts = response;
		// console.log($scope.posts.length,$scope.feeds.length);
		$scope.master = build.mergeFeeds($scope.posts,$scope.feeds)
	});
});

/*
 * VALUES
 */
app.value('config', window.config);
app.value('helper', window.helper);
app.value('FB', window.FB);

/*
 * SERVICES - facebook, twitter, instagram, pinterest, user
 */
