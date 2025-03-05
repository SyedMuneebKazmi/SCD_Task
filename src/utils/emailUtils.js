const nodemailer = require('nodemailer');

// Set up the mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Send email notification
exports.sendEmailNotification = (userEmail, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
