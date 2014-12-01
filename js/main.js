/*
 * NG APP social
 */
// console.log('main.js');
var app = angular.module('social', ['ngRoute']);

/*
 * CONFIG
 */
app.config(function($routeProvider) {
	//
});

/*
 * RUN
 */
app.run(function($window,$document,$rootScope) {
	//
	$rootScope.config = $window.config;

	$document.ready(function() {
		console.log('DOM READY');

		$window.fbInit({
			id: config.FBID,
			ver: config.FBVER,
		});
	});
});

/*
 * CONTROLLERS
 */
app.controller('TestCtrl', function($window,$scope, twitter, instagram, pinterest, shared) {
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
			// console.log(media);
		});

		pinterest.get(input).then(function(response) {
			var result = response.data;
			// console.log(result);

			var dates = pinterest.findDate(result.rss);
			var rawPins = result.pins;
			// console.log(rawPins);

			var pins = pinterest.addDate(rawPins,dates)
			// console.log(pins);
		});
	}
});

app.controller('HeaderController', function($document,$scope,facebook,config) {
	//
})

app.controller('LoginController', function($window,$document, $scope, facebook) {
	//
	$scope.loginSubmit = function() {
		console.log('loginSubmit()');
		facebook.get();

		console.log(facebook.testInit());

		$window.location.href = '#/lol';
	}
});

app.controller('FeedsController', function($scope, $http, facebook, twitter, pinterest, instagram) {
	//
	$scope.feed = {};
	$scope.event = [];
});

/*
 * VALUES
 */
app.value('results', window.results);
app.value('config', window.config);

/*
 * SERVICES
 */
app.factory('shared', function($window){
	// console.log('shared factory');
	var data = {};
	data.Example = 'exmaple';

	window.test = 'in factory';

	// getter func
	function getExample() {
		return data.Example;
	}

	// setter func
	function setExample(setVal) {
		console.log(setVal);

		data.Example = setVal;
		console.log(data.Example);
	}

	return {
		getExample: getExample,
		setExample: setExample,
	}
})

app.factory('facebook', function($window) {
	// console.log('facebook factory');
	var FB = $window.FB;
	var prv = {
		Token: null,
	}

	// setter func
	function setToken(val) {
		// console.log(val);
		prv.Token = val;
		// console.log(prv.Token);
	}

	// getter func
	function getUsername(callback) {
		console.log('getUsername');
		FB.api('/me', callback);
	}

	function getPosts(callback) {
		var feed = '/me/posts?limit=100&access_token=' + prv.Token;
		// console.log(feed);

		FB.api(feed, callback);
	}

	// factory return
	return {
		setToken: setToken,
		getUsername: getUsername,
		getPosts: getPosts,
	}
});

app.factory('twitter', function($http) {
	//
	function resolveDate(tweet) {
		// console.log('resolveDate()');
		tweet.forEach(function(item) {
			var time = item.created_at;
			var date = new Date(time);
			// console.log(date);
			item.date = date;
		});

		return tweet;
	}

	function get(input) {
		console.log('twitter.get() '+input);

		var config = {
			method: 'GET',
			url: 'php/twitter-get.php',
			params: {
				input: input,
			},
		}

		return $http(config);
	}

	// factory return
	return {
		get: get,
		resolveDate: resolveDate,
	}
});

app.factory('instagram', function($http) {
	//
	function resolveDate(media) {
		// console.log('resolveDate()');
		media.forEach(function(item) {
			var rawTime = item.caption.created_time;
			// console.log(rawTime);
			time = parseInt(rawTime) * 1000;
			var date = new Date(time);
			// console.log(date);
			item.date = date;
		});

		return media;
	}

	function get(input) {
		console.log('instagram.get() '+input);

		var config = {
			method: 'GET',
			url: 'php/instagram-get.php',
			params: {
				input: input,
			},
		}

		return $http(config);
	}

	// factory return
	return {
		get: get,
		resolveDate: resolveDate,
	}
});

app.factory('pinterest', function($http,$window) {
	//
	function findDate(xml) {
		// console.log('findDate()');

		var dates = [];
		var json = $window.jQuery.xml2json(xml);
		json = json.channel.item;
		// console.log(json);

		json.forEach(function(item) {
			// console.log(item.pubDate);
			dates.push(item.pubDate);
		});

		return dates;
	}

	function get(input) {
		console.log('pinterest.get() '+input);

		var config = {
			method: 'GET',
			url: 'php/pinterest-get.php',
			params: {
				input: input,
			},
		}

		return $http(config);
	}

	function addDate(pins, dates) {
		// console.log('addDate()');
		// console.log(pins);

		for (var i = 0; i < pins.length; i++) {
			var date = new Date(dates[i]);
			pins[i].date = date;
			// console.log(date);
		}

		return pins;
	}

	// factory return
	return {
		get: get,
		findDate: findDate,
		addDate: addDate,
	}
})