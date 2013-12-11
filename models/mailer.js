var nodemailer = require('nodemailer');

exports.sendOne = function(sendTo, messageOptions) {

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