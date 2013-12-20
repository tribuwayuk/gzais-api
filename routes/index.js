'use strict';

var mongoose         = require( 'mongoose' );
var AccessToken      = mongoose.model( 'AccessToken' );
var Employee         = mongoose.model( 'Employee' );
var generatePassword = require( 'randpass' );
var mailer           = require( '../models/mailer');

exports.index = function( req, res ) {

    var index = { };
    index.name    = 'GZAIS API';
    index.version = '0.0.1';

    res.end( JSON.stringify( index ) );

};

exports.accessControl = function( req, res, next ) {

    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS' );
    res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );

    if ( req.method === 'OPTIONS' ) {
        return res.end( );
    }

    res.setHeader( 'Content-Type', 'application/json' );

    // Exclude /user-login routes from access_token required routes
    if ( req.url.match( /(user-login|reset-password)/ ) ) {
		return next( );
    }

    // If no access_token
	if ( !req.query.access_token ) {
		res.statusCode = 403;
		return res.end( '{ "error" : "access denied", "error_message" : "access token not found" }' );
	}

	// Check if access_token is valid
	if ( req.query.access_token ) {

		AccessToken.findOne( {
			access_token: req.query.access_token
		}, function( err, access_token ) {

			// If access_token is found, continue
			if ( access_token ) {
				return next( );
			}

			// Otherwise return 403
			res.statusCode = 403;
			res.end( '{ "error" : "access denied", "error_message" : "access token is invalid" }' );

		} );
	}

};

exports.userLogin = function( req, res ) {

    Employee.findOne( {
        email    : req.body.email,
        password : req.body.password
    }, function( err, employee ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }

        // If log in fails, return a 403 status code and error message
        if ( !employee ) {

            var message = { };

            message.error   = 'Access Denied';
            message.message = 'Wrong email or password. Please try again!';
            res.statusCode  = 403;

            return res.end( JSON.stringify( message ) );

        }

        // Create access token for the successfully logged in user
        var accessToken = new AccessToken( {
            employee: employee._id
        } );

        accessToken.save( function( err ) {
            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }

            // Find and populate access token's employee field
            AccessToken.findOne( {
                access_token: accessToken.access_token
            } )
                .populate( 'employee' )
                .exec( function( err, newToken ) {

                    if ( err ) {
                        return res.end( JSON.stringify( err ) );
                    }

                    // return the complete access token object with the populated
                    // employee field
                    res.end( JSON.stringify( newToken ) );

                } );
        } );


    } );
};

exports.resetPassword = function( req, res ) {

    // Generate Password
    var newPassword = {
		password: generatePassword( {
            symbols: false
        } )
    };

    var data = {};
    if ( req.body.oldPassword ) {
    	data._id      = req.body._id;
    	data.email    = req.body.email;
    	data.password = req.body.oldPassword;
    } else if ( req.body._id ) {
    	data._id   = req.body._id;
    } else if ( req.body.email ) {
    	data.email = req.body.email;
    } else {
    	// data is null;
    }

    Employee.findOne( req.body, function( err, result ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }

        if ( !result ) {
            var responseText = {};

            responseText.error = 'not found';
            if(req.body.password){
				responseText.error_message = 'password does not exist';
            } else {
				responseText.error_message = '_id or email does not exist';
            }

            return res.end( JSON.stringify( responseText ) );
        }
        if(req.body.password){
			result.password = req.body.password;
        } else {
			result.password = newPassword.password;
        }
        result.save( function( err ) {
            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }

            var msgTemplate = mailer.messageTemplate( result, req.body._id ? 'reset' : 'forgot' );
            var msgSubject  = req.body._id ? "GZAIS | Request to Reset Password ( Reset by Admin )" : "GZAIS | Request to Reset Password ( Forgot Password )";

			if (req.body.password) {
				msgTemplate = mailer.messageTemplate( result, 'change');
				msgSubject  = 'GZAIS | Request to Change Password';
			}

            var messageOptions = {
                subject: msgSubject,
                generateTextFromHTML: true,
                html: msgTemplate
            };

            mailer.sendOne( result.email, messageOptions );
            return res.end( '{ "ok" : "success" }' );
        } );

    } );
};
