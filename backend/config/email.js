require('dotenv').config();
const nodemailer = require('nodemailer');
const { secret } = require('./secret');

// sendEmail
module.exports.sendEmail = (body, message) => {
  const transporter = nodemailer.createTransport({
    host: secret.email_host,
    service: secret.email_service,
    port: secret.email_port,
    secure: true,
    auth: {
      user: secret.email_user,
      pass: secret.email_pass,
    },
  });

  transporter.verify(function (err, success) {
    if (err) {
      console.log(`Email verification error: ${err.message}`);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  transporter.sendMail(body, (err, data) => {
    if (err) {
      console.log(`Error sending email: ${err.message}`);
    } else {
      console.log(`Email sent successfully: ${message}`);
    }
  });
};

