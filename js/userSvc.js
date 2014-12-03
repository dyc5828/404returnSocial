/*
 * User Service
 */
app.factory('user', function($http) {
	// console.log('user factory');
	var ids = {
		id: null,
		twitter: null,
		instagram: null,
		pinterest: null,
	}

	function updateConnect(user) {
		// console.log('addConnect');

		var config =  {
			method: 'GET',
			url: 'php/connect-user.php',
			params: {
				id: user.id,
				twitter: user.twitter,
				pinterest: user.pinterest,
				instagram: user.instagram,
			}
		}

		return $http(config);
	}


	/* setter funcs */
	function setAll(user) {
		// console.log('setAll');

		ids.id = user.id;
		ids.twitter = user.twitter;
		ids.instagram = user.instagram;
		ids.pinterest = user.pinterest;

		// console.log(ids);
	}


	/* getter funcs */
	function getAll() {
		// console.log('getAll');
		return ids;
	}

	function getID() {
		// console.log('getID');
		return ids.id;
	}

	

	// factory return
	return {
		updateConnect: updateConnect,

		setAll: setAll,

		getAll: getAll,
		getID: getID,
	}
});