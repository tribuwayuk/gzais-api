'use strict';

var model    = require( '../models/asset' );
var mongoose = require( 'mongoose' );

exports.get = function( req, res ) {
    var temp = '';

    model.Asset.find( {} )
    .populate( 'assignee' )
    .exec( function ( err, results ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }

        res.end( JSON.stringify( results ) );
    } );

};

exports.getId = function( req, res ) {

    model.Asset.findOne( { _id: req.params.id })
    .populate( 'assignee' )
    .exec( function( err, data ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( data ) );
    } );

};

exports.post = function( req, res ) {
    var asset = new model.Asset( req.body );

    asset.save( function( err ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( asset ) );
    } );
};

exports.del = function( req, res ) {
    model.Asset.remove( {
        _id: req.params.id
    }, function( err, data ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( data ) );
    } );
};

exports.put = function( req, res ) {
    delete req.body._id;

    model.Asset.update( {
        _id: req.params.id
    }, req.body, function( err, data ) {
        if ( err ) {
            return res.end( JSON.stringify( err ) );
        }
        res.end( JSON.stringify( data ) );
    } );
};