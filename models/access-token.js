var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var crypto   = require( 'crypto' );

var accessTokenSchema = new Schema( {

    id: false,

    access_token: {
        type    : String,
        unique  : true,
        default : crypto.createHash( 'sha1' ).update( Date.now( ).toString( ) ).digest( 'hex' )
    },
    expires_on: {
        type    : Date,
        default : new Date( ( new Date( ) ).getTime( ) + ( 24 * 1000 * 60 * 60 ) )
    },
    employee: {
        type : Schema.Types.ObjectId,
        ref  : 'Employee'
    }
} );

mongoose.model( 'AccessToken', accessTokenSchema );
