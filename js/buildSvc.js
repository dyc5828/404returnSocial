/*
 * Build Service
 */
app.factory('build', function($q, facebook, twitter, instagram, pinterest, user, helper) {
	// build factory
	var feed = [];
	var prev = {};

	function reformatDate(date) {
		// console.log('reformatDate ',date );
		var day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var month = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
		dateStr = date.toDateString()+ ', ';
		dateStr += date.toLocaleTimeString();

		return dateStr;
	}

	function mergeFeeds(posts, feeds) {
		// console.log('setItems');
		// console.log(posts,feeds);

		var merged = [];
		posts.forEach(function(post) {
			post.time = reformatDate(post.date);
			merged.push(post);
		});
		feeds.forEach(function(feed) {
			feed.time = reformatDate(feed.date);
			merged.push(feed);
		})
		return merged;
	}

	function getFeed() {
		return feed;
	}

	function getFeeds(user) {
		// console.log('getFeeds');
		// wipe array
		while(feed.length > 0) {
			feed.pop();
		}
		// console.log(feed.length);

		var tw = user.twitter;
		var ig = user.instagram;
		var pn = user.pinterest;
		
		var twitterPromise;
		var pinterestPromise;
		var instagramPromise;

		if(twitter != null && twitter != '') {
			// console.log('get twitter');

			// twitterPromise = 
			twitter.get(tw).then(function(response) {
				var result = response.data;
				// console.log(result);

				var tweets = twitter.resolveDate(result);
				// console.log(tweets);

				tweets = twitter.cleanTweets(tweets);
				// console.log(tweets);

				tweets.forEach(function(tweet) {
					feed.push(tweet);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('twitter fail');
		}

		if(instagram != null && instagram != '') {
			// console.log('get instagram');

			instagramPromise = 
			instagram.get(ig).then(function(response) {
				var result = response.data;
				// console.log(result);

				var media = instagram.resolveDate(result);
				// console.log(media);

				media = instagram.cleanMedia(media);
				// console.log(media);
				media.forEach(function(each) {
					feed.push(each);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('instagram fail');
		}

		if(pinterest != null && pinterest != '') {
			// console.log('get pinterest');

			pinterestPromise = 
			pinterest.get(pn).then(function(response) {
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
					feed.push(pin);
				})
				// console.log(feeds);
			});
		} else {
			// console.log('pinterest fail');
		}

		$q.all([twitterPromise,instagramPromise,pinterestPromise]).then(function() {
			// console.log('feeds done');
			// console.log(data.feed);
		});
	}

	// factory return
	return {
		mergeFeeds: mergeFeeds,
		reformatDate: reformatDate,

		getFeeds: getFeeds,
		getFeed: getFeed,
	}
});