'use strict';

var mailer           = require( '../models/mailer' );
var mongoose         = require( 'mongoose' );
var Employee         = mongoose.model( 'Employee' );
var generatePassword = require( 'randpass' );


exports.get = function( req, res ) {

    Employee.find( {} )
        .populate( 'assets' )
        .exec( function( err, data ) {

            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }

            return res.end( JSON.stringify( data ) );

        } );
};

exports.searchName = function( req, res ) {

    var searchItem = req.query.search;

    Employee.find( {
        $or: [ {
            first_name : new RegExp( '^' + searchItem, "i" )
        }, {
            last_name  : new RegExp( '^' + searchItem, "i" )
        } ]
    }, function( err, data ) {
        if ( err )
            return res.json( err );
        return res.json( data );
    } );
};

exports.getId = function( req, res ) {

    Employee.findOne( {
        _id: req.params.id
    } )
        .populate( 'assets' )
        .exec( function( err, data ) {

            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }

            return res.end( JSON.stringify( data ) );

        } );
};

exports.post = function( req, res ) {

    var employee = new Employee( req.body );

    var newPassword = {
        password: generatePassword( {
            symbols: false
        } )
    };

    employee.password = newPassword.password;
    employee.save( function( err ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        var msgTemplate = mailer.messageTemplate( employee, 'new' );
        var msgSubject = "GZAIS | Successfull Registration ( Sent by Admin )";
        var messageOptions = {
            subject: msgSubject,
            generateTextFromHTML: true,
            html: msgTemplate
        };

        mailer.sendOne( employee.email, messageOptions );
        return res.end( JSON.stringify( employee ) );
    } );
};

exports.del = function( req, res ) {

    Employee.remove( {

        _id: req.params.id

    }, function( err, data ) {

        if ( err ) {

            return res.end( JSON.stringify( err ) );

        }

        res.end( JSON.stringify( data ) );

    } );
};

exports.put = function( req, res ) {

    var newData = req.body;

    delete newData._id;
    delete newData.assets;

    Employee.update( {

        _id: req.params.id

    }, newData, function( err, data ) {

        if ( err ) {

            return res.end( JSON.stringify( err ) );

        }

        res.end( JSON.stringify( data ) );

    } );

};