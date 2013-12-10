var model = require('../models/employee');
var mongoose = require('mongoose');

exports.get = function(req, res) {
  var temp = '';

  model.Employee.find(function(err, data) {

    if (err) {
      return res.end(JSON.stringify(err));
    }

    return res.end(JSON.stringify(data));
  });
};

exports.getId = function(req, res) {
  model.Employee.findOne({
    _id: req.params.id
  }, function(err, data) {

    if (err) {
      return res.end(JSON.stringify(err));
    }

    return res.end(JSON.stringify(data));
  });
};

exports.post = function(req, res) {

  var employee = new model.Employee(req.body);

  employee.save(function(err) {

    if (err) {
      return res.end(JSON.stringify(err));
    }

    return res.end(JSON.stringify(employee));
  });
};

exports.del = function(req, res) {
  model.Employee.remove({
    _id: req.params.id
  }, function(err, data) {

    if (err) {
      return res.end(JSON.stringify(err));
    }

    res.end(JSON.stringify(data));

  });
};

exports.put = function(req, res) {

  var newData = {
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    address: req.body.address,
    email: req.body.email,
    gender: req.body.gender,
    date_employed: req.body.date_employed,
    user_role: req.body.user_role,
    password: req.body.password
  };
  
  model.Employee.update({ _id: req.params.id  }, newData, function(err, data) {

    if (err) {
      return res.end(JSON.stringify(req.body) + ' ' + JSON.stringify(err));
    }
    res.end(JSON.stringify(data));
  });
};
