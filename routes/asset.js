var model = require('../models/asset');
var mongoose = require('mongoose');

exports.get = function(req, res) {
    var temp = '';
    model.Asset.find(function(err, data) {
	if (err)
	    res.end(JSON.stringify(err));
	res.end(JSON.stringify(data));
    });
};

exports.getId = function(req, res) {
    model.Asset.findOne({
	_id: req.params.id
    }, function(err, data) {
	if (err) {
	    return res.end(JSON.stringify(err));
	}
	res.end(JSON.stringify(data));
    });
}

exports.post = function(req, res) {

    var asset = new model.Asset(req.body);

    asset.save(function(err) {

	if (err) {
	    return res.end(JSON.stringify(err));
	}

	res.end(JSON.stringify(asset));

    });
}

exports.del = function(req, res) {
    model.Asset.remove({
	_id: req.params.id
    }, function(err, data) {
	if (err)
	    res.end(JSON.stringify(err));
	res.end(JSON.stringify(data));
    });
}

exports.put = function(req, res) {
    var data = {
	asset_name: req.body.asset_name,
	asset_type: req.body.asset_type,
	asset_description: req.body.asset_description,
	date_purchased: req.body.date_purchased,
	status: req.body.status,
	serial_number: req.body.serial_number,
	supplier: req.body.supplier,
	reason: req.body.reason
    };

    model.Asset.update({
	_id: req.params.id
    }, data, function(err, data) {
	if (err) {
	    console.log(err);
	    res.end(JSON.stringify(err));
	}
	res.end(JSON.stringify(data));
    });
}
