var bcrypt = require('bcrypt'),
    validator = require('validator'),
    _ = require('underscore');

var assembly = function (model, method) {
  var user = {
    name: (model.name ? model.name.trim() : null),
    email: (model.email ? model.email.trim() : null),
    password: model.password,
    new_password: model.new_password,
    confirm_new_password: model.confirm_new_password
  };

  if (method === 'create') {
    delete user.new_password;
    delete user.confirm_new_password;
  }

  return user;
};

module.exports = {

  create: function(req, res) {
    var user = assembly(req.param('user'), 'create');

    UserService.create(user, function(errors, model) {
      if (errors) return res.json(errors);

      req.session.user = model;
      res.json(null);
    });
  },

  update: function (req, res) {
    var email = req.param('email'),
        user = assembly(req.param('user')),
        form = req.param('form'),
        session = req.session.user;

    var response = function (errors, model) {
      if (errors) return res.json(errors);

      var user = {
        name: model.name,
        email: model.email
      };

      req.session.user = model;

      res.json({success: true, user: user});
    };

    if (!email.length) throw new Error();

    switch (form) {
    case 'profile' : UserService.updateProfile(user, session, response); break;
    case 'password': UserService.updatePassword(user, session, response); break;
    }
  },

  destroy: function(req, res) {
    var email = req.param('email'),
      user = assembly(req.param('user')),
      session = req.session.user;

    UserService.destroy(user, session, function(errors, model) {
      if (errors) return res.json(errors);

      req.session.user = null;
      res.json({success: true, user: null});
    });
  },

  auth: function (req, res) {
    // TODO extrair para UserService
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

    UserValidation.authentication(user, function(model, errors) {
      if (!model) return res.json([errors]);

      req.session.user = model;
      return res.json(null);
    });
  },

  remember: function (req, res) {
    var email = req.param('email'),
        user = assembly(req.param('user'));

    if (!email.length) throw new Error();

    UserService.hasRecovery(user, function(errors, recovery, model) {
      if (errors) return res.json(errors);

      if (!recovery) {
        UserService.createRecovery(model, function (model, recovery) {

          EmailService.send(model, recovery, function(errors, response) {
            if (errors) return res.json(errors);

            model.save(function (err) {
              if (err) return res.json(err);

              return res.json({success: true, message: response.message});
           });
          });
        });
      } else {
        EmailService.send(model, recovery, function(errors, response) {
          if (errors) return res.json(errors);

          return res.json({success: true, message: response.message});
        });
      }
    });
  },

  recovery: function (req, res) {
    var email = req.param('email'),
        unique_id = req.param('unique_id'),
        user = assembly(req.param('user'));

    UserService.findUserByRecovery(unique_id, function(errors, model) {
        if (errors) return res.json(errors);

        UserService.findUserByEmail(model.email, function(errors, model) {
          if (errors) return res.json(errors);

          UserService.recoveryPassword(user, model, function(errors, model) {
            if (errors) return res.json(errors);

            req.session.user = model;
            res.json({success: true, user: {name: model.name, email: model.email}});
          });
        });
    });
  },

  validate: function (req, res) {
    var user = req.param('user'),
        errors = [];

    if (user.hasOwnProperty('name')) {
      errors.push(
        UserValidation.name(user.name.trim())
      );
    }

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
