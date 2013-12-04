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

  model.Employee.update({
    _id: req.params.id
  }, req.body, function(err, data) {

    if (err) {
      return res.end(JSON.stringify(err));
    }

    res.end(JSON.stringify(data));

  });
};
