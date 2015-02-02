var express = require('express');
var mailer = require('./mailer.js');
var https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Sun Surfers' });
});

router.get('/contactus', function(req, res) {
  res.render('contactme', { title: 'Sun Surfers | Contact Us' });
});

router.post('/contactus', function(req, res) {
  var fromAddress = req.body.email;
  var toAddress = 'kroozhki@gmail.com';
  var subject = 'You have a message';
  var message = req.body.message;
  var name = req.body.name;
  var captcha = req.body['g-recaptcha-response'];

  if (!captcha) {
    res.json(200, { error : true, captchafailed : true });
    return;
  }

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var url = 'https://www.google.com/recaptcha/api/siteverify';

  url = url + '?secret=6Ld_UgETAAAAAEKJKjfbAc0o-_mzBjH6pcD4XUK8';
  url = url + '&response=' + captcha;
  url = url + '&remoteip=' + ip;

  https.get(url, function(response) {
    
    response.on('data', function(d) {

      try {
        d = JSON.parse(d);
      } catch(e) {
        res.json(200, { error : true });
        return;
      }

      console.log(d);

      if (!d || !d.success) {
        res.json(200, { error : true, captchafailed : true });
        return;
      }

      var mailmessage = "Name: " + name + 
        "; Email: " + fromAddress + 
        "; Message: " + message;

      mailer.sendMail(fromAddress, toAddress, subject, mailmessage, function(e) {

        var error = false;

        if (e) {
          console.log(e);
          error = true;
        }

        res.json(200, { error : error, captchafailed : false });
      });
    });

  }).on('error', function(e) {
    res.json(200, { error : true, captchafailed : true });
  });
});

router.get('/portfolio', function(req, res) {
  res.render('portfolio', { title: 'Sun Surfers | Portfolio' });
});

module.exports = router;
