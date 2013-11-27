var mongoose = require('mongoose');

Schema = mongoose.Schema;

/* Schema for user collection */
var itemSchema = new Schema({
  item_name: {type: String, required: true, trim: true},
  item_type: {type: String, required: true, trim: true},
  item_desc: {type: String, required: true, trim: true},
  serial_num: {type: String, required: true, trim: true},
  date_purchased: {type: Date, required: true, default: Date.now}
});

module.exports.itemModel = mongoose.model('items', itemSchema);