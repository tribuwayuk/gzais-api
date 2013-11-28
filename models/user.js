var mongoose = require('mongoose');

/** User Schema **/

var userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		match: /^[\w]([\s]?){1,30}$/
	},
	middlename: {
		type: String,
		required: true,
		match: /^[\w]([\s]?){1,30}$/
	},
	lastname: {
		type: String,
		required: true,
		match: /^[\w]([\s]?){1,30}$/
	},
	email: {
		type: String,
		required: true,
		match: /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
	},
	role: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
	},
	confpassword: {
		type: String,
		required: true,
		match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
	},
	address: {
		type: String,
		match: /^(?:\w+\.?,?\s?){1,60}$/
	},
	datebirth: {
		type: Date
	},
	gender: {
		type: String
	},
	dateemployed: {
		type: Date
	},
	assets: {
		type: Array
	}
});

module.exports.userModel = mongoose.model('users', userSchema);
