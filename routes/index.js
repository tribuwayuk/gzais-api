/*
 * GET home page.
 */

exports.index = function( req, res ) {

    var index     = { }
    index.name    = 'GZAIS API';
    index.version = '0.0.1';

    res.end( JSON.stringify( index ) );

};