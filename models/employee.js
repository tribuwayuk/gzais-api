var mongoose = require('mongoose');

Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    unique: true
  },
  user_role: {
    type: String,
    required: true,
    match: /^(admin|custodian|employee)$/ // Should be either admin, custodian, or employee only
  },
  password: {
    type: String,
    required: true,
    // Password be atleast 6 characters long
    match: /^.{6,}$/
  },
  address: {
    type: String,
    require: true,
  },
  date_of_birth: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    required: true
  },
  date_employed: {
    type: Date,
    required: true
  },
  assets: [{
    type: Schema.Types.ObjectId,
    ref: 'Asset'
  }]
});

module.exports.Employee = mongoose.model('Employee', EmployeeSchema);
