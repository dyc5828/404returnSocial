/*
 * MAIN JS - ng app SOCIAL
 */
// console.log('main.js -ng app SOCIAL');
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
	$rootScope.username = 'Waiting for Facebook Login';
	$rootScope.userids = {
		twitterid: '',
		instagramid: '',
		pinterestid: '',
	};
	$rootScope.userReady = {
		test: 'test',
	};

	$document.ready(function() {
		// console.log('DOM READY');

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

app.controller('HeaderCtrl', function($document, $scope) {
	//
})

app.controller('LoginCtrl', function($window, $document, $rootScope, $scope, user) {
	//
	$scope.fbLog = true;

	$scope.connect = function() {
		console.log('connect()');
		// console.log(user.getAll());

		$scope.userids.id = user.getID();
		console.log($scope.userids);

		// ajax request - save userids
		user.addConnect($scope.userids).then(function(response) {
			// var result = response.data;
			// console.log(result);
		});

		// push changes to rootScope
		$rootScope.$broadcast('userReady', $scope.userids);
		// console.log($rootScope.userReady);
		// console.log($scope.userReady);
		// console.log($rootScope.userids);
		console.log($scope.userids);

		// route to feed
		$window.location.href = '#/lol';
	}
});

app.controller('FeedCtrl', function($rootScope, $scope, build, user, facebook, twitter, pinterest, instagram) {
	//
	$scope.feeds = [];
	$scope.posts = [];
	$scope.items = [];

	// listen for rootScope broadcast
	$scope.$on('userReady', function(response) {
		console.log('userReady changed');
		console.log(response);
		// console.log($rootScope.userReady);
		// console.log($scope.userReady);
		// console.log($rootScope.userids);
		console.log($scope.userids);

		var user = {
			twitter: $scope.userReady.twitterid,
			instagram: $scope.userReady.instagramid,
			pinterest: $scope.userReady.pinterestid,
		}

		// rebuild posts
		// build.getFeeds(user);
	},true);

	$scope.$watch('posts', function() {
		// console.log('posts changed');
		$scope.items = build.setItems($scope.posts,$scope.feeds);
	},true);

	$scope.$watch('feeds', function() {
		// console.log('feeds changed');
		$scope.items = build.setItems($scope.posts,$scope.feeds);
	},true);

	$scope.$watch('items', function() {
		// console.log('items updated');
		// console.log($scope.items);
	})

	$scope.feeds = build.getFeed();

	$scope.test= function() {
		// console.log('test');
		console.log($scope.posts);
		console.log($scope.feeds);
	}
});

/*
 * VALUES
 */
// app.value('config', window.config);

/*
 * SERVICES
 */
app.factory('user', function($http,$rootScope) {
	// console.log('user factory');
	var prv = {
		ID: null,
		// twitter: null,
		// instagram: null,
		// pinterest: null,
	}

	function addConnect(user) {
		console.log('addConnect');

		var config =  {
			method: 'GET',
			url: 'php/connect-user.php',
			params: {
				id: user.id,
				twitter: user.twitterid,
				pinterest: user.pinterestid,
				instagram: user.instagramid,
			}
		}

		return $http(config);
	}

	// setters
	function setID(id) {
		// console.log('setID');
		prv.ID = id;
	}

	// getter
	function getID() {
		console.log('getID');
		return prv.ID;
	}

	// function getAll() {
	// 	console.log('getAll');
	// 	return prv;
	// }

	// factory return
	return {
		addConnect: addConnect,
		setID: setID,
		getID: getID,
		// getAll: getAll,
	}
});

app.factory('facebook', function($window) {
	// console.log('facebook factory');
	var FB = $window.FB;
	var prv = {
		Token: null,
		Userid: null,
	}

	function resolveDate(posts) {
		// console.log('resolveDate');
		posts.forEach(function(item) {
			var time = item.created_time;
			var date = new Date(time);
			// console.log(date);
			item.date = date;
		});

		return posts;
	}

	function cleanPosts(posts) {
		// console.log('cleanPosts');
		var cleaned = [];
		// var i = 0;
		posts.forEach(function(item) {
			// i++; console.log(i);

			var clean = {};

			// pass date
			clean.date = item.date;

			// pass type
			clean.title = item.from.name + "'s " +item.type;

			// clean message
			if (item.message != null) {
				// console.log(item.message);
				clean.message = item.message;
			} else {
				// console.log(item.story)
				clean.message = item.story;
			}

			// pass if image
			if (item.picture != null) {
				clean.image = item.picture;
			}

			// pass if place
			if (item.place != null) {
				clean.place = item.place.name;
				clean.address = item.place.location.city + ', ' + item.place.location.state;
			}

			// set type
			clean.type = 'facebook'
			
			// console.log(clean);
			cleaned.push(clean)
		});

		return cleaned;
	}

	// setter func
	function setToken(val) {
		// console.log(val);
		prv.Token = val;
		// console.log(prv.Token);
	}
	function setUserid(val) {
		// console.log(val);
		prv.Userid = val;
	}

	// getter func
	function getUserid() {
		// console.log('getUserid');
		return prv.Userid;
	}
	function getMe(callback) {
		// console.log('getMe');
		FB.api('/me', callback);
	}

	function getPosts(callback) {
		var feed = '/me/posts?limit=100&access_token=' + prv.Token;
		// console.log(feed);

		FB.api(feed, callback);
	}

	// factory return
	return {
		resolveDate: resolveDate,
		cleanPosts: cleanPosts,
		setToken: setToken,
		getMe: getMe,
		getPosts: getPosts,
		setUserid: setUserid,
		getUserid: getUserid,
	}
});

app.factory('twitter', function($http) {
	//
	function cleanTweets(tweets) {
		// console.log('cleanTweets');
		var cleaned = [];
		tweets.forEach(function(item) {
			var clean = {};

			// gen title
			clean.title = item.user.name + "'s tweet";

			// pass date
			clean.date = item.date;

			// pass message
			clean.message = item.text;

			// pass hashtags
			clean.tags = [];
			item.entities.hashtags.forEach(function(tag) {
				clean.tags.push(tag.text);
			});
			// console.log(item.entities.hashtags);

			// set type
			clean.type = 'tweet';

			// console.log(clean);
			cleaned.push(clean);
		});

		return cleaned;
	}

	function resolveDate(tweets) {
		// console.log('resolveDate()');
		tweets.forEach(function(item) {
			var time = item.created_at;
			var date = new Date(time);
			// console.log(date);
			item.date = date;
		});

		return tweets;
	}

	function get(input) {
		// console.log('twitter.get() '+input);

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
		cleanTweets: cleanTweets,
	}
});

app.factory('instagram', function($http) {
	//
	function cleanMedia(media) {
		// console.log('cleanMedia');
		var cleaned = [];
		media.forEach(function(item) {
			var clean = {};

			// pass date
			clean.date = item.date;

			// gen title
			clean.title = item.user.full_name + "'s " + item.type;

			// set type
			clean.type = 'instagram';

			// pass image
			clean.image = item.images.standard_resolution.url;

			// pass caption
			clean.message = item.caption.text

			// pass tags
			clean.tags = [];
			item.tags.forEach(function(tag) {
				clean.tags.push(tag);
			});

			// console.log(clean);
			cleaned.push(clean);
		});

		return cleaned;
	}

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
		// console.log('instagram.get() '+input);

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
		cleanMedia: cleanMedia,
	}
});

app.factory('pinterest', function($http,$window) {
	//
	function cleanPins(pins) {
		// console.log('cleanPins');
		var cleaned = [];
		pins.forEach(function(item) {
			var clean = {};

			// set type
			clean.type = 'pinterest';

			// pass date
			clean.date = item.date;

			// gen title
			clean.title = 'Pins';

			// pass image
			clean.image = item.src;

			// pass board
			clean.board = item.board.name;


			// console.log(clean);
			cleaned.push(clean);
		});

		return cleaned;
	}

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
		// console.log('pinterest.get() '+input);

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
		cleanPins: cleanPins,
	}
})

app.factory('build', function($q, facebook, twitter, instagram, pinterest, user) {
	//
	var data = {
		feed:[],
	};

	function setItems(posts, feeds) {
		var merged = [];
		posts.forEach(function(post) {
			merged.push(post);
		});
		feeds.forEach(function(feed) {
			merged.push(feed);
		})
		return merged;
	}

	function getFeed() {
		return data.feed;
	}

	function getFeeds(user) {
		console.log(user);
		// wipe array
		data.feed.length = 0;

		var twitterid = user.twitter;
		var instagramid = user.instagram;
		var pinterestid = user.pinterest;
		
		var twitterPromise;
		var pinterestPromise;
		var instagramPromise;

		if(twitterid != null && twitterid != '') {
			console.log('get twitter');

			twitterPromise = twitter.get(twitterid).then(function(response) {
				var result = response.data;
				// console.log(result);

				var tweets = twitter.resolveDate(result);
				// console.log(tweets);

				tweets = twitter.cleanTweets(tweets);
				// console.log(tweets);

				tweets.forEach(function(tweet) {
					data.feed.push(tweet);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('twitter fail');
		}

		if(instagramid != null && instagramid != '') {
			console.log('get instagram');

			instagramPromise = instagram.get(instagramid).then(function(response) {
				var result = response.data;
				// console.log(result);

				var media = instagram.resolveDate(result);
				// console.log(media);

				media = instagram.cleanMedia(media);
				// console.log(media);
				media.forEach(function(each) {
					data.feed.push(each);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('instagram fail');
		}

		if(pinterestid != null && pinterestid != '') {
			console.log('get pinterest');

			pinterestPromise = pinterest.get(pinterestid).then(function(response) {
				var result = response.data;
				// console.log(result);

				var dates = pinterest.findDate(result.rss);
				var rawPins = result.pins;
				// console.log(rawPins);

				var pins = pinterest.addDate(rawPins,dates)
				// console.log(pins);

				pins = pinterest.cleanPins(pins);
				// console.log(pins);
				pins.forEach(function(pin) {
					data.feed.push(pin);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('pinterest fail');
		}

		$q.all([twitterPromise,instagramPromise,pinterestPromise]).then(function() {
			console.log('feeds done');
			console.log(data.feed);
		});
	}

	// factory return
	return {
		setItems: setItems,
		getFeeds: getFeeds,
		getFeed: getFeed,
	}
});