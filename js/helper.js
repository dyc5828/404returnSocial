/*
 * HELPER JS FILE - require jquery
 */
console.log('helper.js');
var helper = window.helper || {};

// general helpers
helper.serialize = function(data) {
	console.log('serialize');
	return JSON.stringify(data);
}

// angular helpers
helper.ngSC = function(ctrl) {
	var el = '[ng-controller='+ctrl+']'
	return angular.element($(el)).scope();
}
helper.updateSC = function(ctrl,key,val) {
	// console.log('updateSC');
	var scope = helper.ngSC(ctrl);
	// console.log(scope);
	scope[key] = val;
	// console.log(scope);
	scope.$apply();
}
helper.ngSvc = function(name) {
	return angular.element(document.body).injector().get(name);
}

// ajax
helper.getAjax = function(url,data) {
	console.log('getAjax');

	var dataType = typeof data;
	// console.log(dataType);
	if(!data) {
		data = 'none';
	} else if((dataType == 'string') || (dataType == 'number')) {
		console.log('basic');
		data = data;
	} else {
		console.log('not basic');
		data = helper.serialize(data);
	}
	// console.log(data);

	return $.ajax({
        url: config.DIR + url,
        type: 'GET',
        data: {
        	data: data,
        },
        // dataType: 'JSON',
    });
}

// database
helper.checkUser = function(fbUserId) {
	console.log('checkUser');

	var ajax = helper.getAjax('php/user.php',fbUserId);

	ajax.done(function(response) {
		console.log('ajax done');
		console.log(response);
	});
}