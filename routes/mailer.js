var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kroozhki@gmail.com',
        pass: 'koltsa808'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

module.exports.sendMail = function sendMail(fromAddress, toAddress, subject, message, callback) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: fromAddress, // sender address
        to: toAddress, // list of receivers
        subject: subject, // Subject line
        text: message // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            callback(error, null)
        }else{
            callback(null);
        }
    });
}