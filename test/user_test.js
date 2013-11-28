var request = require('supertest'),
		expect = require('chai').expect,
		app = require('../app');

describe('User Route', function() {
	describe('#PUT', function() {
		it('Add user', function(done) {
			var add = {
				firstname: 'AAA',
				middlename: 'BBB',
				lastname: 'CCC',
				email: 'DDD@EEE.FFF',
				role: 'GGG',
				address: 'HHH',
				datebirth: Date.now(),
				gender: 'III',
				dateemployed: Date.now()
			};

			request(app);
				
		});
	});
});
