var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]{1,30}$/
    },
    middle_name: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]{1,30}$/
    },
    last_name: {
        type: String,
        required: true,
        match: /^[a-zA-Z\s]{1,30}$/
    },
    email: {
        type: String,
        required: true,
        match: /^[a-z]+\.[a-z]+@globalzeal\.net$/,
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
        //match: /^.{6,}$/
    },
    address: {
        type: String,
        require: true,
        match: /^.{2,60}$/
    },
    date_of_birth: {
        type: Date,
        match: /^\d{2}\/\d{2}\/\d{4}$/
    },
    gender: {
        type: String,
        required: true,
        match: /^(male|female)$/
    },
    date_employed: {
        type: Date,
        required: true,
        match: /^\d{2}\/\d{2}\/\d{4}$/
    },
    assets: [{
        type: Schema.Types.ObjectId,
        ref: 'Asset'
    }]
});

module.exports.Employee = mongoose.model('Employee', EmployeeSchema);

