/*
 * Twitter Service
 */
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
			var conc = 'Tags: ';
			clean.tags.forEach(function(tag) {
				conc += '#'+tag+' ';
			})
			clean.aux = conc; 
			// console.log(item.entities.hashtags);

			// set type
			clean.type = 'twitter';

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
		// console.log('twitter.get ', input);

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