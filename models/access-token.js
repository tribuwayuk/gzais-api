var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var crypto   = require( 'crypto' );

var accessTokenSchema = new Schema( {
    access_token: {
        type   : String,
        unique : true,
    },
    expires_on: {
        type    : Date,
    },
    employee: {
        type : Schema.Types.ObjectId,
        ref  : 'Employee'
    }
} );

accessTokenSchema.pre('save', function (next) {

	// Generate access token
	if ( !this.access_token ) {
		this.access_token = crypto.createHash( 'sha1' ).update( Date.now( ).toString( ) ).digest( 'hex' );
	}

	// Generate expiration date
	if ( !this.expires_on ) {
		this.expires_on = new Date( ( new Date( ) ).getTime( ) + ( 24 * 1000 * 60 * 60 ) )
	}

  next();

})

mongoose.model( 'AccessToken', accessTokenSchema );
