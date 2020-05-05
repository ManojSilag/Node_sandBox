const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);
console.log('dev: process.env.API_KEY', process.env.API_KEY)

const msg = {
  to: "manojsilag@gmail.com",
  from: "silagmanoj@yahoo.in",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);

const sendwelComeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "silagmanoj@yahoo.in",
    subject: "Thanks for Joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "silagmanoj@yahoo.in",
    subject: "Soory to see you go!",
    text: `Goodby, ${name}. Hope to see you see back soon`,
  });
};

module.exports = {
  sendwelComeEmail,
  sendCancelEmail,
};
