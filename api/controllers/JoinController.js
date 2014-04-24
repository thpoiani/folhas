var validator = require('validator');

module.exports = {

  index: function (req, res) {
    res.view('join/index');
  },

  create: function (req, res) {
    var user, fn_assembly, fn_push_error, fn_validate, fn_save, fn_error;

    /**
     * Receive socket POST params
     *
     * @param model
     * @returns {{name: (string), email: (string), password: (*)}}
     */
    fn_assembly = function (model) {
      return {
        name: model.name.trim(),
        email: model.email.trim(),
        password: model.password
      }
    };

    /**
     * Populate a Error object
     *
     * @param message
     * @param name
     * @param value
     * @returns {{message: (string), name: (string), value: *}}
     */
    fn_push_error = function (message, name, value) {
      return {
        message: message,
        name: name,
        value: value
      }
    };

    /**
     * Validade model and executes fn_save|fn_error in success|fail
     *
     * @param user
     * @param fn_save
     * @param fn_error
     */
    fn_validate = function (user, fn_save, fn_error) {
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
        } else if (doc) {
          errors.push(fn_push_error('E-mail already exists', 'email', user.email));
        }

        if (!validator.isLength(user.password, 4)) {
          errors.push(fn_push_error('Invalid password', 'password', user.password));
        }

        !errors.length ? fn_save(user) : fn_error(errors);
      });
    };

    /**
     * Persist model in database
     * @param user
     */
    fn_save = function (user) {
      User.create(user).done(function (err, user) {
        if (err) {
          res.json({
            success: false, errors: [
              fn_push_error('MongoDB error', '', err)
            ]});
        }

        req.session.user = user;
        res.json({success: true, user: {name: user.name, email: user.email}});
      });
    };

    /**
     * Return errors objects
     * @param errors
     */
    fn_error = function (errors) {
      res.json({success: false, errors: errors});
    };

    user = fn_assembly(req.param('user'));
    fn_validate(user, fn_save, fn_error);
  }

};
