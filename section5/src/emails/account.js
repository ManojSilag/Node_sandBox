const sgMail = require("@sendgrid/mail");
const sendGridAPIkey =
  "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";

sgMail.setApiKey(sendGridAPIkey);

const msg = {
  to: "manojsilag@gmail.com",
  from: "silagmanoj@yahoo.in",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);
