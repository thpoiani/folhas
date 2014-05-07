var q = require('q');

module.exports = {

  create: function (req, res) {
    var user = req.param('user');

// TODO
    q
      .allSettled([
        UserValidation.email(user.email.trim()),
        UserValidation.password(user.password),
        UserValidation.authentication(user.email.trim(), user.password)
      ])

      .then(function (results) {
        var response = [];

        results.forEach(function (result) {
          if (result.state !== "fulfilled") {
            response.push(result.reason);
          }
        });

        res.json(response);
      });
  },

  validate: function (req, res) {
    var user = req.param('user');

    var json = function(response) {
      res.json(response);
    };

    if (user.hasOwnProperty('email')) {
      q
        .fcall(UserValidation.email(user.email.trim()))
        .then(json)
        .fail(json);
    }

    if (user.hasOwnProperty('password')) {
      q
        .fcall(UserValidation.password(user.password))
        .then(json)
        .fail(json);
    }
  }

};
