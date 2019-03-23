/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var nodemailer = require("nodemailer");
const dotenv = require('dotenv');

var app = express();

app.set('port', 3000);
var server = app.listen(app.get('port'));
var port = server.address().port;
dotenv.config();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {  
    res.sendFile( __dirname + "/" + "index-5.html" );  
 })  
console.log("Server started "+ port);
var username = process.env.MAIL_USER;
var password = process.env.MAIL_PASS;

// POST route from contact form
app.post('/contact', function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      name: 'www.mail.yahoo.com',  
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secureConnection: false,
      auth: {
        user: username,
        pass: password
      }
      
    });
    mailOpts = {
      from: username,
      to: username,
      subject: 'Keshava Alur - Enquiry from ' + req.body.name,
      text: `${req.body.name} (${req.body.email}) says: ${req.body.comments}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
        if (error) {
            console.log('Message not sent.', error);
          } else {           
            console.log('Message sent.', response);}
    });
  });