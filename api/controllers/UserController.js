var bcrypt = require('bcrypt'),
    validator = require('validator'),
    _ = require('underscore');

module.exports = {

  create: function(req, res) {

  },

  auth: function (req, res) {
    var user = req.param('user');
        errors = [];

    errors.push(
      UserValidation.email(user.email.trim())
    );

    errors.push(
      UserValidation.password(user.password)
    );

    errors = _.compact(errors);

    if (errors.length) return res.json(errors);


    UserValidation.authentication(user, function(user, errors) {
      if (user) {
        req.session.user = user;
        return res.json(null);
      }

      return res.json([errors]);
    });
  },

  validate: function (req, res) {
    var user = req.param('user'),
        errors = [];

    if (user.hasOwnProperty('email')) {
      errors.push(
        UserValidation.email(user.email.trim())
      );
    }

    if (user.hasOwnProperty('password')) {
      errors.push(
        UserValidation.password(user.password)
      );
    }

    errors = _.compact(errors);
    res.json(errors);
  }

};
