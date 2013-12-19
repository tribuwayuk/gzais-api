'use strict';

var mongoose = require( 'mongoose' );
var Asset    = mongoose.model( 'Asset' );
var Employee = mongoose.model( 'Employee' );
var AccessToken = mongoose.model( 'AccessToken' );
var mailer   = require( '../models/mailer' );
var _        = require( 'underscore' )._;



exports.get = function( req, res ) {
    var temp = '';

    AccessToken.findOne( { access_token : req.query.access_token } )
        .populate( 'assignee' )
	.exec( function ( err, access_token ) {
	    var query    = { };

	    if ( access_token && access_token.employee.user_role === 'employee' ) {
		query = { assignee : access_token.employee._id }
            }

	    Asset.find( query )
		.populate( 'assignee' )
		.exec( function( err, results ) {
		    if ( err ) {
			return res.end( JSON.stringify( err ) );
		    }

		    res.end( JSON.stringify( results ) );
		} );
        } );

};

exports.getId = function( req, res ) {

    Asset.findOne( {
        _id: req.params.id
    } )
        .populate( 'assignee' )
        .exec( function( err, data ) {
            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }
            res.end( JSON.stringify( data ) );
        } );

};

exports.post = function( req, res ) {
    var asset = new Asset( req.body );

    asset.save( function( err ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( asset ) );
    } );
};

exports.del = function( req, res ) {
    Asset.remove( {

        _id: req.params.id

    }, function( err, data ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( data ) );

    } );
};

exports.put = function( req, res ) {

	// removed _id field from the request body to prevent error
    delete req.body._id;

    Asset.findByIdAndUpdate( req.params.id, req.body, function( err, asset ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }

        if ( req.body.assignee ) {

        	Employee.findById( req.body.assignee )
        		.exec( function( err, employee ) {
        			if ( err ) {
        				return res.end( JSON.stringify( err ) );
        			}

        			/**
        			*	Check if this asset is already added to the employee's list of assets
        			*/
        			// cast string as an ObjectId
        			var assetId = mongoose.Types.ObjectId( req.params.id );
        			if ( _.findWhere( employee.assets, assetId ) ) {
        				// send Not Modified status code
        				res.statusCode = 304;
        				return res.end( JSON.stringify( employee ) );
        			}

        			/**
        			*	Otherwise, add asset id and SAVE
        			*/
        			employee.assets.push( req.params.id );
        			employee.save( function( err, employee, numberAffected ) {
        				if ( err ) {
        					return res.end( JSON.stringify( err ) );
        				}

        				/**
        				* Notify the new assigned Employee
        				**/
        				var msgTemplate = mailer.messageTemplate( {
        				    first_name    : employee.first_name,
        				    last_name     : employee.last_name,
        				    asset_id      : req.params.id,
        				    asset_name    : req.body.asset_name,
        				    serial_number : req.body.serial_number
        				}, 'assign' );
        				var msgSubject     = "AIS: New Assigned Item";
        				var messageOptions = {
        				    subject              : msgSubject,
        				    generateTextFromHTML : true,
        				    html                 : msgTemplate
        				};

        				mailer.sendOne( employee.email, messageOptions );
        				res.end( JSON.stringify( employee ) );

        			} );

        		} );

        }
    } );
};
