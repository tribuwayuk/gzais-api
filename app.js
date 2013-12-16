/**
 * Module dependencies.
 */

var express  = require( 'express' );
var mongoose = require( 'mongoose' );
var routes   = require( './routes' );
var employee = require( './routes/employee' );
var asset    = require( './routes/asset' );
var http     = require( 'http' );
var path     = require( 'path' );
var dbURI    = process.env.MONGOHQ_URL || 'mongodb://localhost/ams';

mongoose.connect( dbURI );

var app        = express();
module.exports = app;

app.configure( function() {

    app.set( 'port', process.env.PORT || 3000 );
    app.use( express.favicon() );
    app.use( express.logger('dev' ) );
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.cookieParser('your secret here' ) );
    app.use( express.session() );

    app.use( function(req, res, next ) {

        res.setHeader( 'Access-Control-Allow-Origin', '*' );
        res.setHeader( 'Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS' );
        res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type' );

        if ( req.method === 'OPTIONS' ) {
            return res.end();
        }

        res.setHeader( 'Content-Type', 'application/json' );
        next();

    } );

    app.use( app.router );

} );

app.configure( 'development', function() {
    app.use( express.errorHandler() );
} );

app.get( '/', routes.index );

app.post( '/resetPassword'    , employee.resetPassword );

app.get( '/employees'         , employee.get );
app.get( '/employees/:id'     , employee.getId );
app.post( '/employees'        , employee.post );
app.put( '/employees/:id'     , employee.put );
app.del( '/employees/:id'     , employee.del );

app.get( '/assets'    , asset.get );
app.get( '/assets/:id', asset.getId );
app.post( '/assets'   , asset.post );
app.put( '/assets/:id', asset.put );
app.del( '/assets/:id', asset.del );

http.createServer( app ).listen( app.get( 'port' ), function() {

    console.log( "Express server listening on port " + app.get( 'port' ) );

} );

