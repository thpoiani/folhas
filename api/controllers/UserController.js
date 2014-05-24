var bcrypt = require('bcrypt'),
    validator = require('validator'),
    _ = require('underscore');

var assembly = function (model, method) {
  if (!model) throw new Error('Missing user data');

  var user = {
    name: (model['name'] ? model.name.trim() : null),
    email: (model['email'] ? model.email.trim() : null),
    password: model['password'],
    new_password: model['new_password'],
    confirm_new_password: model['confirm_new_password']
  };

  if (method === 'create') {
    delete user.new_password;
    delete user.confirm_new_password;
  }

  return user;
};

var errorObject = function(id, message, url) {
  return {
    id: id,
    message: message,
    url: url || 'http://docs.folhas.apiary.io/'
  };
}

module.exports = {

  create: function(req, res) {
    var user;

    try {
      user = assembly(req.param('user'), 'create');
    } catch (err) {
      return res.json(400, errorObject('user_data', err.message, 'http://docs.folhas.apiary.io/#post-%2Fuser'));
    }

    UserService.create(user, function(errors, model) {
      if (errors) return res.json(400, errorObject('user_data', errors));

      req.session.user = model;
      res.json(201, model);
    });
  },

  update: function (req, res) {
    var email = req.param('email'),
        form = req.param('form') || 'profile',
        session = req.session.user || req.param('client_id'),
        user;

    var response = function (errors, model) {
      if (errors) return res.json(400, errorObject('user_update', errors));

      var user = {
        name: model.name,
        email: model.email
      };

      req.session.user = model;
      res.json(200, model);
    };

    if (!email) return res.json(400, errorObject('user_email', 'Missing user email', 'http://docs.folhas.apiary.io/#put-%2Fuser%2F%7Bemail%7D%2F%7B%3Fclient_id%7D'));
    if (!session) return res.json(401, errorObject('user_client_id', 'Missing authentication or client_id', 'http://docs.folhas.apiary.io/#put-%2Fuser%2F%7Bemail%7D%2F%7B%3Fclient_id%7D'));

    try {
      user = assembly(req.param('user'));
    } catch (err) {
      return res.json(400, errorObject('user_data', err.message));
    }

    switch (form) {
    case 'profile' : UserService.updateProfile(user, session, response); break;
    case 'password': UserService.updatePassword(user, session, response); break;
    }
  },

  destroy: function(req, res) {
    var email = req.param('email'),
      user = assembly(req.param('user')),
      session = req.session.user || req.param('client_id');

    if (!email) return res.json(400, errorObject('user_email', 'Missing user email', 'http://docs.folhas.apiary.io/#delete-%2Fuser%2F%7Bemail%7D%2F%7B%3Fclient_id%7D'));
    if (!session) return res.json(401, errorObject('user_client_id', 'Missing authentication or client_id', 'http://docs.folhas.apiary.io/#delete-%2Fuser%2F%7Bemail%7D%2F%7B%3Fclient_id%7D'));

    try {
      user = assembly(req.param('user'));
    } catch (err) {
      return res.json(400, errorObject('user_data', err.message));
    }

    UserService.destroy(user, session, function(errors, model) {
      if (errors) return res.json(400, errorObject('user_update', errors));

      req.session.user = null;
      res.json(200, model);
    });
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

    UserService.authentication(user, function(model, errors) {
      if (!model) return res.json([errors]);

      req.session.user = model;
      res.json(null);
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
