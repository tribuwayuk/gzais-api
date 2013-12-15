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

    var reqParam = { };

    // Generate Password
    var newPassword = {
        password: generatePassword( {
            symbols: false
        } )
    };

    if ( req.params.id ) {

        reqParam._id = req.params.id;

    } else {

        reqParam.email = req.params.email;

    }

    model.Employee.findOne( reqParam ).exec( function( err, data ) {
        if ( err ) {

            return res.end( JSON.stringify( err ) );

        }

        model.Employee.update( reqParam, newPassword, function( err ) {

            if ( err ) {

                return res.end( JSON.stringify( err ) );

            }

            var msgTemplate    = mailer.messageResetPassword( data );
            var msgSubject     = reqParam._id ? "GZAIS | Request to Reset Password ( Reset by Admin )" : "GZAIS | Request to Reset Password ( Forgot Password )";
            var messageOptions = {
                subject              : msgSubject,
                generateTextFromHTML : true,
                html                 : msgTemplate
            };

            mailer.sendOne( data.email, messageOptions );
            return res.end( 'ok' );

        });
    });
};

