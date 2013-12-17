'use strict';

var mongoose = require( 'mongoose' );
var Asset    = mongoose.model( 'Asset' );
var Employee = mongoose.model( 'Employee' );

exports.get = function( req, res ) {
    var temp = '';

    Asset.find( {} )
        .populate( 'assignee' )
        .exec( function( err, results ) {
            if ( err ) {
                return res.end( JSON.stringify( err ) );
            }

            res.end( JSON.stringify( results ) );
        } );

};

exports.getId = function( req, res ) {

    Asset.findOne( {
        _id : req.params.id
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

        _id : req.params.id

    }, function( err, data ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( data ) );

    } );
};

exports.put = function( req, res ) {

    delete req.body._id;

    Asset.update( {

        _id : req.params.id

    }, req.body, function( err, data ) {

        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }

        if ( req.body.assignee ) {

        	// update assigned employee's assets
            Employee.findByIdAndUpdate( req.body.assignee, {
                $push : {
                    assets: req.params._id
                }
            }, function( err ) {

                if ( err ) {
                    return res.end( JSON.stringify( err ) );
                }

                res.end( JSON.stringify( data ) );
            } );

        }
    } );
};
