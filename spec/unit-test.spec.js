describe('Product', function() {
	it('should have a hasDiscount property true if price > discountprice', function() {
		// 1. Arrange
		var shoe = new Product({
			price: 50,
			discountprice: 25,
		});

		// 2. Act

		// 3. Asset
		expect(shoe.hasDiscount).toEqual(true);
		
	});

	it('should have a hasDiscount property false if price !> discountprice', function() {
		// 1. Arrange
		var shoe = new Product({
			price: 50,
			discountprice: 50,
		});

		// 2. Act

		// 3. Asset
		expect(shoe.hasDiscount).toEqual(false);
	});
});

describe('ProductCollection', function() {
	var products;

	beforeEach(function() {
		products = new ProductCollection([
			{ colorcode: 'BLK', color: 'black', price: 40},
			{ colorcode: 'RED', color: 'red', price: 30},
			{ colorcode: 'ORG', color: 'orange', price: 50},
			{ colorcode: 'RED', color: 'red', price: 20},
		]);
	});
	
	describe('filterByColor()', function() {
		it('should filter products by color', function() {
			var filteredProcts = products.filterByColor('red');
			expect(filteredProcts).toEqual([
				{ colorcode: 'RED', color: 'red', price: 30},
				{ colorcode: 'RED', color: 'red', price: 20},
			]);
		});
	});
});