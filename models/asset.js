var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/* Schema for user collection */
var AssetSchema = new Schema({
    asset_name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\.\-\,\''\s]{3,30}$/
    },
    asset_type: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{3,30}$/
    },
    asset_description: {
        type: String,
        required: true,
        match: /^.{5,160}$/
    },
    serial_number: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9\.\-\,\\s]{2,15}$/
    },
    date_purchased: {
        type: Date,
        required: true,
        match: /^\d{2}\/\d{2}\/\d{4}$/
    },
    supplier: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{5,160}$/
    },
    status: { 
        type: String,
        required: true,
        match: /^(working|defective)$/
    },
    reason: {
        type: String,
        required: true,
        match: /^.{5,160}$/
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
});

module.exports.Asset = mongoose.model('Asset', AssetSchema);

