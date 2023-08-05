const nodemailer = require("nodemailer");
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  tls: {
    rejectUnauthorized: false
  },
  debug:true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
  }
});
console.log("Mailer hier")
module.exports = {
    async sendOptInMail(email, username) {
      let activationLink = `${process.env.BASE_URL}verify/${username}`;
      console.log(activationLink)
      let mail = {
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "Please activate your account",
        html: `<p>To activate your account, please click this link: <a href="${activationLink}">${activationLink}</a></p>`,
      };
      try {
        const info = await transporter.sendMail(mail);
        console.log('Email sent:', info);
      } catch (err) {
        console.error('Error sending email:', err);
      }
    }
  };