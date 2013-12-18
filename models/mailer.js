var nodemailer = require( 'nodemailer' );

exports.messageTemplate = function ( data, type ) {
    // setup e-mail data
    var msgline = "<br/>--------------------------------------------------------------------<br/>";
    var msgGreetings = "Hi " + data.first_name + ' ' + data.last_name + ",<br/><br/>";
    var msgFooter = "Thank you,<br/><br/>GZAIS Support Team<br/><br/>" + msgline + "<small>This is a system-generated email: Please do not reply.</small>";

    var msgSuccess, msgBody;

    switch (type)
    {
		case 'new':
			msgSuccess = "You have been registered to Global Zeal Asset Inventory System.";
			msgBody = msgSuccess + "<br/> Your Email is: " + data.email + "<br/><br/>Your new password: <b>" + data.password + "<br/> <a href=http://gzais.herokuapp.com/>Log in Here </a>" + "</b><br/><br/><br/>";
			break;
		case 'reset':
			msgSuccess = "Your password has just been reset.";
			msgBody = msgSuccess + "<br/>Your new login password: <b>" + data.password + "</b><br/><br/><br/>";
			break;
		case 'forgot':
			msgSuccess = "We have received a report that you have forgot your password.";
			msgBody = msgSuccess + "<br/>Your new login password: <b>" + data.password + "</b><br/><br/><br/>";
			break;
        case 'assign':
            msgSuccess = "You have been assigned to an item";
            msgBody = msgSuccess + " Asset " + data.asset_name + ", Serial #" + data.serial_number + " has been assigned to " +
                      "<User Name>.To view asset details, please login to http://gzais.herokuapp.com" +
                      ".</b><br/><br/><br/>";
    }

    var msgTemplate = msgGreetings + msgBody + msgFooter;
    return msgTemplate;
};

exports.sendOne = function ( sendTo, messageOptions ) {

    // create a defaultTransport using gmail and authentication
    var smtpTransport = nodemailer.createTransport( "SMTP", {
        host: "smtp.gmail.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "tribuwayuk@gmail.com",
            pass: "gz123456"
        },
    } );

    var mailOptions = messageOptions;

    mailOptions.from = 'GZAIS Support <tribuwayuk@gmail.com>';
    mailOptions.to = sendTo;

    // send mail with defined transport object
    smtpTransport.sendMail( mailOptions, function ( error, response ) {
        if ( error ) {
            console.log( error );
        } else {
            console.log( "Message sent: " + response.message );
        }

        smtpTransport.close( ); // shut down the connection pool, no more messages
    } );
};
