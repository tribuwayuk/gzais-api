var umodel = require('../models/user');
var mongoose = require('mongoose');

exports.ulist = function(req, res){
	var temp = '';

	umodel.userModel.find(function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if(err) {
			return res.end(JSON.stringify(err));
		}

		return res.end(JSON.stringify(data));
	});
};

exports.uview = function(req, res) {
	umodel.userModel.findOne({
		_id: req.params.id
	}, function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if(err) {
			return res.end(JSON.stringify(err));
		}

		return res.end(JSON.stringify(data));
	});
};

exports.uadd = function(req, res) {
	var userObj = new umodel.userModel({
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		email: req.body.email,
		role: req.body.role,
		password: req.body.password,
		confpassword: req.body.confpassword,
		address: req.body.address,
		datebirth: req.body.datebirth,
		gender: req.body.gender,
		dateemployed: req.body.dateemployed,
		assets: req.body.assets
	});

	userObj.save(function(err) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if(err) {
			return res.end(JSON.stringify(err));
		}

		return res.end(JSON.stringify(userObj));
	});
};

exports.udelete = function(req, res) {
	umodel.userModel.remove({
		_id: req.params.id
	}, function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if(err) {
			return res.end(JSON.stringify(err));
		}

		return res.end(JSON.stringify(data));
	});
};

exports.uedit = function(req, res) {
	umodel.userModel.update({
		_id: req.params.id
	}, {
		firstname: req.body.firstname,
		middlename: req.body.middlename,
		lastname: req.body.lastname,
		email: req.body.email,
		role: req.body.role,
		address: req.body.address,
		datebirth: req.body.datebirth,
		gender: req.body.gender,
		dateemployed: req.body.dateemployed
	}, function(err, data) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		if(err) {
			return res.end(JSON.stringify(err));
		}

		return res.end(JSON.stringify(data));
	});
};
