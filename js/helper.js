/*
 * HELPER JS - require jquery
 */
// console.log('helper.js');
var helper = window.helper || {};

// general helpers
helper.serialize = function(data) {
	// console.log('serialize');
	return JSON.stringify(data);
}
helper.wipeArray = function(array) {
	while (array.length) {
		array.pop();
	}

	return array;
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

	return scope[key];
}
helper.ngSvc = function(name) {
	return angular.element(document.body).injector().get(name);
}
helper.ngRtSC = function() {
	return angular.element(document).scope()
}
helper.updateRtSC = function(key,val) {
	var rootScope = helper.ngRtSC();
	rootScope[key] = val;
	rootScope.$apply();

	return rootScope[key];
}

// ajax
helper.getAjax = function(url,data,type) {
	// console.log('getAjax');

	var dataType = typeof data;
	// console.log(dataType);
	if(!data) {
		// console.log('no data');
		data = 'none';
	} else if((dataType == 'string') || (dataType == 'number')) {
		// console.log('basic');
		data = data;
	} else {
		// console.log('not basic');
		data = helper.serialize(data);
	}
	// console.log(data);

	return $.ajax({
        url: config.DIR + url,
        type: 'GET',
        data: {
        	data: data,
        },
        dataType: type,
    });
}

// database
helper.checkUser = function(fbUserId,callback) {
	// console.log('checkUser');
	var ajaxSend = helper.getAjax('php/check-user.php',fbUserId,'JSON');

	var ajaxComplete = ajaxSend.done(callback);
	
	ajaxComplete.done(function() {
		// console.log('checkUser done');
	});
}