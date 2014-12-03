/*
 * Facebook Service
 */
app.factory('facebook', function(FB) {
	// console.log('facebook factory');
	// console.log(FB);

	var user = {
		Token: null,
		Id: null,
	}


	/* custom funcs */
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
				clean.aux = 'At ' + item.place.name + ' in ' + clean.address;
			}

			// set type
			clean.type = 'facebook'
			
			// console.log(clean);
			cleaned.push(clean)
		});

		return cleaned;
	}


	/* setter funcs */
	function setToken(val) {
		// console.log('setToken '+val);
		user.Token = val;
		// console.log(user.Token);
	}

	function setId(val) {
		// console.log('setId '+val);
		user.Id = val;
		// console.log(user.Id);
	}


	/* getter funcs */
	function getId() {
		// console.log('getId');
		return user.Id;
	}
	function getMe(callback) {
		// console.log('getMe');
		FB.api('/me', callback);
	}

	function getPosts(callback) {
		// console.log('getPosts');
		var feed = '/me/posts?limit=100&access_token=' + user.Token;
		// console.log(feed);

		FB.api(feed, callback);
	}

	// factory return
	return {
		resolveDate: resolveDate,
		cleanPosts: cleanPosts,

		setToken: setToken,
		setId: setId,

		getMe: getMe,
		getPosts: getPosts,
		getId: getId,
	}
});