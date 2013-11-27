var mongoose = require('mongoose');
var models = mongoose.models;

exports.init = function () {

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
		address: {
			type: String,
			match: /^([\w]([\.,]?)([\s]?)){1,60}$/
		},
		datebirth: {
			type: Date
		},
		gender: {
			type: String
		},
		dateemployed: {
			type: String
		}
	});
};
