// All functions below are used only for testing

var imodel = require('../models/item');
var mongoose = require('mongoose');

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
