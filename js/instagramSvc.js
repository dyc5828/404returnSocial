/*
 * Instagram Service
 */
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
			var conc = 'Tags: ';
			clean.tags.forEach(function(tag) {
				conc += '#'+tag+' ';
			})
			clean.aux = conc; 

			// console.log(clean);
			cleaned.push(clean);
		});

		return cleaned;
	}

	function resolveDate(media) {
		// console.log('resolveDate()');
		// console.log(media);
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