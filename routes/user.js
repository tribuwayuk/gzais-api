var umodel = require('../models/user');
var mongoose = require('mongoose');

exports.ulist = function(req, res){
	var temp = '';

	umodel.userModel.find(function(err, data) {
		res.writeHead(200, {
			'content-type': 'application/json'
		});

		if(err) {
			res.end(JSON.stringify(err));
		}

		res.end(JSON.stringify(data));
	});
};

exports.uview = function(req, res) {
	umodel.userModel.findOne({
		_id: req.params.id
	}, function(err, data) {
		res.writeHead(200, {
			'content-type': 'application/json'
		});

		if(err) {
			res.end(JSON.stringify(err));
		}

		res.end(JSON.stringify(data));
	});
};

exports.uadd = function(req, res) {
	var userObj = new umodel.userModel({
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		email: req.body.email,
		role: req.body.role,
		address: req.body.address,
		datebirth: req.body.datebirth,
		gender: req.body.gender,
		dateemployed: req.body.dateemployed
	});

	userObj.save(function(err) {
		res.writeHead(200, {
			'content-type': 'application/json'
		});

		if(err) {
			res.end(JSON.stringify(err));
		}

		res.end(JSON.stringify(userObj));
	});
};























