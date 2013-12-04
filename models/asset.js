var mongoose = require('mongoose');

Schema = mongoose.Schema;

/* Schema for user collection */
var AssetSchema = new Schema({
  asset_name: {
    type: String,
    required: true
  },
  asset_type: {
    type: String,
    required: true
  },
  asset_description: {
    type: String,
    required: true
  },
  serial_number: {
    type: String,
    required: true,
    unique: true
  },
  date_purchased: {
    type: Date,
    required: true,
    default: Date.now
  },
  supplier: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }
});

module.exports.Asset = mongoose.model('Asset', AssetSchema);
