/*
 * HELPER JS FILE - require jquery
 */
var helper = window.helper || {};

// angular helpers
helper.ngSC = function(ctrl) {
	el = '[ng-controller='+ctrl+']'
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

// ajax
helper.getAjax = function(url,data) {
	console.log('getAjax');
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