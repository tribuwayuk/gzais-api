var imodel = require('../models/item');
var mongoose = require('mongoose');

exports.ilist = function(req, res) {
    var temp = '';
    imodel.itemModel.find(function(err, data) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(data));
    });
};

exports.iview = function(req, res) {
    imodel.itemModel.findOne({
        _id: req.params.id
    }, function(err, data) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(data));
    });
}

exports.iadd = function(req, res) {
    var itemObj = new imodel.itemModel({
        item_name: req.body.item_name,
        item_type: req.body.item_type,
        item_desc: req.body.item_desc,
        serial_num: req.body.serial_num,
        date_purchased: Date.now()
    });

    itemObj.save(function(err) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(itemObj));
    });
}

exports.idelete = function(req, res) {
    imodel.itemModel.remove({
        _id: req.params.id
    }, function(err, data) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(data));
    });
}

exports.iedit = function(req, res) {
    imodel.itemModel.update({
        _id: req.params.id
    }, {
        item_name: req.body.item_name,
        item_type: req.body.item_type,
        item_desc: req.body.item_desc,
        serial_num: req.body.serial_num
    }, function(err, data) {
        res.writeHead(200, {
            'content-type': 'application/json'
        });

        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(data));
    });
}

// All functions below are used only for testing
exports.ideleteTest = function(req, res) {
    imodel.itemModel.remove({
        item_name: "Test Item Name"
    }, function(err, data) {

    });
}

exports.iaddTest = function(req, res) {
    var itemObj = new imodel.itemModel({
        item_name: 'Test Add Item Name',
        item_type: 'Test Add Item Type',
        item_desc: 'Test Add Item Description',
        serial_num: 'Test Add Item Serial Number',
        date_purchased: Date.now()
    });

    itemObj.save(function(err) {});
    return itemObj;
}
