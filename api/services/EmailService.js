var nodemailer = require("nodemailer");

exports.send = function(model, recovery, cb) {
  var text, html, transport, options;

  // TODO TEMPLATE EMAIL
  text = 'Set new Password in http://localhost:1337/recovery/' + recovery;
  html = '<p>Set new Password in <a href="http://localhost:1337/recovery/' + recovery + '" target="_blank">http://localhost:1337/recovery/' + recovery + '</a></p>';

  transport = nodemailer.createTransport("SES", {
    AWSAccessKeyID: "AKIAICXQ7IMARSYUJLKA",
    AWSSecretKey: "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",
    ServiceUrl: "https://email.us-west-2.amazonaws.com"
  });

  options = {
    from: '"Thiago Henrique Poiani" <thpoiani@gmail.com>',
    to: model.email,
    subject: 'folhas - Password recovery',
    text: text,
    html: html
  };

  transport.sendMail(options, function (error, response) {
    if (error) {
      console.error(error);
      return cb(error)
    }

    cb(null, response);
  });
};