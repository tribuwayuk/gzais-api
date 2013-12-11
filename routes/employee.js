var model            = require('../models/employee'),
    mailer           = require('../models/mailer'),
    mongoose         = require('mongoose'),   
    generatePassword = require('randpass');


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

  var newData = req.body;

  delete newData._id;

  model.Employee.update({ _id: req.params.id  }, newData, function(err, data) {
    if (err) {
      return res.end(JSON.stringify(req.body) + ' ' + JSON.stringify(err));
    }
    res.end(JSON.stringify(data));
  });
};

exports.resetPassword = function(req, res) {

  // Generate Password
  var newPassword          = {
      password: generatePassword({symbols: false})
  };

  model.Employee.update({ _id: req.params.id  }, newPassword, function(err, done) {

    if(err) { return res.end ( "Reset password denied!" ); }

    if(done){
      model.Employee.findOne({_id: req.params.id}).exec(function(err, data){
        if( err ) { return res.end ( "Can not find Employee Records."); }
        // setup e-mail data      
        var msgline      = "<br/>--------------------------------------------------------------------<br/>";
        var msgGreetings = "Hi " + data['first_name'] + ' ' + data['last_name'] + ",<br/><br/>";
        var msgSuccess   = "Your password has just been reset.";
        var msgBody      = msgSuccess + "<br/>Your new login password: <b>"+ data['password'] + "</b><br/><br/><br/>";
        var msgFooter    = "Thank you,<br/><br/>GZAIS Support Team<br/><br/>" + msgline + "<small>This is a system-generated email: Please do not reply.</small>";
        
        var msgTemplate  = msgGreetings + msgBody + msgFooter;

        var messageOptions = {
            subject: "GZAIS | Request to Reset Password",
            generateTextFromHTML: true,
            html: msgTemplate
        };

        mailer.sendOne(data['email'], messageOptions);

        return res.end ( 'Successfully reset password! ' + newPassword.password );
      });
    }

  });
};