var nodemailer = require("nodemailer");

exports.send = function(model, recovery, cb) {
  var text, html, smtp, options;

  // TODO TEMPLATE EMAIL
  text = 'Set new Password in http://localhost:1337/recovery/' + recovery;
  html = '<p>Set new Password in <a href="http://localhost:1337/recovery/' + recovery + '" target="_blank">http://localhost:1337/recovery/' + recovery + '</a></p>';

  smtp = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "user", // TODO
      pass: "pass" // TODO
    }
  });

  options = {
    from: "folhas",
    to: model.email,
    subject: 'folhas - Password recovery',
    text: text,
    html: html
  };

  smtp.sendMail(options, function (error, response) {
    smtp.close();

    if (error) return cb(error);

    cb(null, response);
  });
};