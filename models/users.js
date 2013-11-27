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
		lastname: {
			type: String,
			required: true,
			match: /^[\w]([\s]?){1,30}$/
		},
		middlename: {
			type: String,
			required: true,
			match: /^[\w]([\s]?){1,30}$/
		}
	});
};
