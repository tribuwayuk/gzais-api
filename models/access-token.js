var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var accessTokenSchema = new Schema( {
    access_token: {
        type     : String,
        required : true
    },
    date_expired: {
        type    : Date,
        default : new Date( ( new Date( ) ).getTime( ) + ( 24 * 1000 * 60 * 60 ) )
    }
    user: {
        type : Schema.Types.ObjectId,
        ref  : 'Employee'
    }
} );

module.exports.AccessToken = mongoose.model( 'AccessToken', accessTokenSchema );