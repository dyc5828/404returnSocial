/*
 * Pinterest Service
 */
app.factory('pinterest', function($http,$window) {
	//
	function cleanPins(pins) {
		// console.log('cleanPins');
		// console.log(pins);

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

			// set message
			clean.message = item.desc;

			// pass board
			clean.board = item.board.name;
			clean.aux = 'Pinned On: '+clean.board;

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
});