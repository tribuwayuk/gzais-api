var nodemailer = require('nodemailer');

exports.messageResetPassword = function ( data )
{
	// setup e-mail data      
    var msgline      = "<br/>--------------------------------------------------------------------<br/>";
    var msgGreetings = "Hi " + data['first_name'] + ' ' + data['last_name'] + ",<br/><br/>";
    var msgSuccess   = "Your password has just been reset.";
    var msgBody      = msgSuccess + "<br/>Your new login password: <b>"+ data['password'] + "</b><br/><br/><br/>";
    var msgFooter    = "Thank you,<br/><br/>GZAIS Support Team<br/><br/>" + msgline + "<small>This is a system-generated email: Please do not reply.</small>";
    
    var msgTemplate  = msgGreetings + msgBody + msgFooter;

    return msgTemplate;
};

exports.sendOne = function ( sendTo, messageOptions) {

    // create a defaultTransport using gmail and authentication
    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: "smtp.gmail.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "tribuwayuk@gmail.com",
            pass: "gz123456"
        },
    });

    var mailOptions = messageOptions;

    mailOptions.from = 'GZAIS Support <tribuwayuk@gmail.com>';
    mailOptions.to   = sendTo;

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close(); // shut down the connection pool, no more messages
    });
};
