var validator = require('validator'),
  bcrypt = require('bcrypt');

var fn_assembly = function (model) {
  return {
    name: (model.name ? model.name.trim() : null),
    email: (model.email ? model.email.trim() : null),
    password: model.password,
    new_password: model.new_password,
    confirm_new_password: model.confirm_new_password
  }
};

var fn_push_error = function (message, name, value) {
  return {
    message: message,
    name: name,
    value: value
  }
};


module.exports = {

  index: function (req, res) {
    var author = req.session.user;

    Document.find({author: author.email, isActive: true}, function(err, documents) {
      if (err) throw new Error(err);

      var data = {
        pageTitle: "folhas | " + author.name + "'s Dashboard",
        isPhone: MobileDetect.isPhone(req),
        user: author,
        documents: documents
      };

      res.render('dashboard/index', data);
    });
  },

  edit: function (req, res) {
    res.render('dashboard/edit', {user: req.session.user});
  },

  update: function (req, res) {
    var user, session;

    var fn_validate = function (user, fn_update, fn_error) {
      var errors = [];

      if (!validator.isLength(user.name, 1, 80)) {
        errors.push(fn_push_error('Invalid name', 'name', user.name))
      }

      if (!validator.isEmail(user.email)) {
        errors.push(fn_push_error('Invalid e-mail', 'email', user.email));
      }

      User.findOne({email: user.email}).done(function (err, doc) {
        if (err) {
          errors.push(fn_push_error('MongoDB error', '', err));
        } else if (doc && doc.id !== session.id) {
          errors.push(fn_push_error('E-mail already exists', 'email', user.email));
        }

        !errors.length ? fn_update(user) : fn_error(errors);
      });
    };

    var fn_error = function (errors) {
      res.json({success: false, errors: errors});
    };

    var fn_update = function (user) {
      User.findOne({id: session.id}, function (err, doc) {
        if (err) {
          return res.json({
            success: false, errors: [
              fn_push_error('MongoDB error', '', err)
            ]});
        }

        doc.email = user.email;
        doc.name = user.name;

        doc.save(function (err) {
          if (err) {
            return res.json({
              success: false, errors: [
                fn_push_error('MongoDB error', '', err)
              ]});
          }

          req.session.user = doc;
          res.json({success: true, user: {name: doc.name, email: doc.email}});
        });
      });
    };

    user = fn_assembly(req.param('user'));
    session = req.session.user;
    fn_validate(user, fn_update, fn_error);
  },

  change_password: function (req, res) {
    var user, session;

    var fn_validate = function (user, fn_update, fn_error) {
      var errors = [];

      User.findOne({email: session.email}).done(function (err, doc) {
        if (err) {
          errors.push(fn_push_error('MongoDB error', '', err));
        }

        if (!validator.isLength(user.password, 4)) {
          errors.push(fn_push_error('Invalid password', 'password', user.password));
        }

        if (!validator.equals(user.new_password, user.confirm_new_password)) {
          errors.push(fn_push_error('Invalid password confirmation', 'password', user.new_password));
        }

        bcrypt.compare(user.password, doc.password, function (err, result) {
          if (err) {
            errors.push(fn_push_error('bcrypt error', '', err));
          }

          if (!result) {
            errors.push(fn_push_error('Incorrect password', 'password', ''));
          }

          !errors.length ? fn_update(user, doc) : fn_error(errors);
        });
      });
    };

    var fn_error = function (errors) {
      res.json({success: false, errors: errors});
    };

    var fn_update = function (user, doc) {
        doc.password = user.new_password;

        doc.save(function (err) {
          if (err) {
            return res.json({
              success: false, errors: [
                fn_push_error('MongoDB error', '', err)
              ]});
          }

          req.session.user = doc;
          res.json({success: true, user: {name: doc.name, email: doc.email}});
        });
    };

    user = fn_assembly(req.param('user'));
    session = req.session.user;
    fn_validate(user, fn_update, fn_error);
  },

  destroy: function (req, res) {
    var user, session;

    var fn_validate = function (user, fn_update, fn_error) {
      var errors = [];

      if (!validator.equals(user.email, session.email)) {
        errors.push(fn_push_error('Incorrect e-mail or password', 'email', ''));
      }

      User.findOne({email: user.email}).done(function (err, doc) {
        if (err) {
          errors.push(fn_push_error('MongoDB error', '', err));
        }

        bcrypt.compare(user.password, doc.password, function (err, result) {
          if (err) {
            errors.push(fn_push_error('bcrypt error', '', err));
          }

          if (!result) {
            errors.push(fn_push_error('Incorrect password or password', 'password', ''));
          }

          !errors.length ? fn_update(user, doc) : fn_error(errors);
        });
      });
    };

    var fn_error = function (errors) {
      res.json({success: false, errors: errors});
    };

    var fn_update = function (user, doc) {
      doc.isActive = false;

      doc.save(function (err) {
        if (err) {
          return res.json({
            success: false, errors: [
              fn_push_error('MongoDB error', '', err)
            ]});
        }

        req.session.user = null;
        res.json({success: true, user: null});
      });
    };

    user = fn_assembly(req.param('user'));
    session = req.session.user;
    fn_validate(user, fn_update, fn_error);
  }

};
