'use strict';

var model            = require( '../models/employee' );
var mailer           = require( '../models/mailer' );
var mongoose         = require( 'mongoose' );
var generatePassword = require( 'randpass' );


exports.get = function( req, res ) {

    model.Employee.find( function( err, data ) {

        if ( err ) {

            return res.end(JSON.stringify(err));

        }

        return res.end( JSON.stringify( data ) );

    } );
};

exports.searchName = function(req, res) {
    res.header('Content-Type', 'application/json');
    res.header('Charset', 'utf-8');

    var searchItem = req.query.search;

    model.Employee.find({
        $or : [
            {first_name : new RegExp('^' + searchItem, "i")},
            {last_name : new RegExp('^' + searchItem, "i")}
        ]  
    }, function(err, data) {
      console.log(data);

        if(err)
            return res.json(err);
        return res.json(data);
    });
};

exports.getId = function(req, res) {

    model.Employee.findOne({

        _id: req.params.id

    }, function( err, data ) {

        if ( err ) {

            return res.end( JSON.stringify( err ) );

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

exports.del = function( req, res ) {

    model.Employee.remove( {

        _id: req.params.id

    }, function( err, data ) {

        if ( err ) {

            return res.end(JSON.stringify(err));

        }

        res.end( JSON.stringify( data ) );

    } );
};

exports.put = function( req, res ) {

    var newData = req.body;

    delete newData._id;

    model.Employee.update( {

        _id: req.params.id

    }, newData, function( err, data ) {

        if ( err ) {

            return res.end( JSON.stringify( err ) );

        }

        res.end( JSON.stringify( data ) );

    });

};

exports.resetPassword = function( req, res ) {

    // Generate Password
    var newPassword = {
        password: generatePassword( {
            symbols: false
        } )
    };

    model.Employee.findOne( req.body, function( err, result ) {

        if ( err ) {
           return res.end( JSON.stringify( err ) ); 
        }

        if ( !result ) {
            var responseText          = {};

            responseText.error        = 'not found';
            responseText.error_message = '_id or email does not exist';

            return res.end( JSON.stringify( responseText ) );
        }

        result.password = newPassword.password;
        result.save( function ( err ) {
            if ( err ) return res.end( JSON.stringify( err ) );

            var msgTemplate    = mailer.messageResetPassword( data );
            var msgSubject     = req.body._id ? "GZAIS | Request to Reset Password ( Reset by Admin )" : "GZAIS | Request to Reset Password ( Forgot Password )";
            var messageOptions = {
                subject              : msgSubject,
                generateTextFromHTML : true,
                html                 : msgTemplate
            };

            mailer.sendOne( result.email, messageOptions );
            res.end( result );
        });

        return res.end( 'ok');
    });
};

