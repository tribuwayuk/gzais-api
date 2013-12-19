'use strict';

var mongoose    = require( 'mongoose' );
var AccessToken = mongoose.model( 'AccessToken' );
var Employee    = mongoose.model( 'Employee' );

exports.index = function( req, res ) {

    var index 	  = {};
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
    if ( req.url.match( /user-login/ ) ) {
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

}

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

            var message 	= {};
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
}
