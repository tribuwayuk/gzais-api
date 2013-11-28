var request = require('supertest'),
    expect = require('chai').expect,
    app = require('../app');

var userId = '';

describe('User Route', function() {
	describe('#uadd', function() {
		it('Add user', function(done) {
			var body = {
				firstname: "Johmel",
				middlename: "Malapitan",
				lastname: "Pintor",
				email: "jamp@yahoo.com",
				role: "Janitor",
				password: "Password123",
				confpassword: "Password123",
				address: "Talisay City",
				datebirth: Date.now(),
				gender: "Male",
				dateemployed: Date.now()
			};

			request(app)
				.post('/users/add')
				.send(body)
				.expect('Content-Type', /json/)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					userId = JSON.parse(JSON.stringify(res.body))._id;

					var firstname = JSON.parse(JSON.stringify(res.body)).firstname,
							middlename = JSON.parse(JSON.stringify(res.body)).middlename,
							lastname = JSON.parse(JSON.stringify(res.body)).lastname,
							email = JSON.parse(JSON.stringify(res.body)).email,
							role = JSON.parse(JSON.stringify(res.body)).role,
							password = JSON.parse(JSON.stringify(res.body)).password,
							confpassword = JSON.parse(JSON.stringify(res.body)).confpassword,
							address = JSON.parse(JSON.stringify(res.body)).address,
							gender = JSON.parse(JSON.stringify(res.body)).gender;

					expect(firstname).to.equal("Johmel");
					expect(middlename).to.equal("Malapitan");
					expect(lastname).to.equal("Pintor");
					expect(email).to.equal("jamp@yahoo.com");
					expect(role).to.equal("Janitor");
					expect(password).to.equal("Password123");
					expect(confpassword).to.equal("Password123");
					expect(address).to.equal("Talisay City");
					expect(gender).to.equal("Male");

					done();
				});
		});
	});
});
