var user;
var build;
var facebook;

beforeEach(angular.mock.module('social',['ngRoute']));
beforeEach(inject(function(_USER_,_BUILD_,_FACEBOOK_) {
	user = _USER_;
	build = _BUILD_;
	facebook = _FACEBOOK_
}));

describe('userSvc', function() {
	beforeEach(angular.mock.module('social'));

	it('should setAll with userInfo', function() {
		var userInfo = {
			id: 1,
			twitter: 2,
			instagram: 3,
			piterest: 4,
		}

		user.setAll(userInfo);

		var user = user.getAll();

		expect(user).toEqual({
			id: 1,
			twitter: 2,
			instagram: 3,
			piterest: 4,
		});
	});

	it('should ids.id with getID', function() {
		var id = user.getID();

		expect(id).toEqual(null);
	});
});

describe('buildSvc', function() {
	beforeEach(angular.mock.module('social'));

	it('should reformateDate', function() {
		var date = new Date('12/2/12 6:00pm');
		var date = build.reformateDate(date);

		expect(date).toEqual('Mon Dec 2 2014, 6:00:00 PM');
	});

	it('should getFeed', function() {
		var feed = build.getFeed();

		expect(feed).toEqual([]);
	});
});


describe('facebookSvc', function() {
	beforeEach(angular.mock.module('social'));

	it('setId with value', function() {
		var value = 5;
		facebook.setId(value);

		var id = facebook.getId();

		expect(id).toEqual(5);
	});
});