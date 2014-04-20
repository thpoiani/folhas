var bcrypt = require('bcrypt'),
  validator = require('validator');

module.exports = {

  index: function (req, res) {
    res.view('enter/index');
  },

  enter: function (req, res) {
    var user, fn_assembly, fn_push_error, fn_validate, fn_find, fn_error;

    /**
     * Receive socket POST params
     *
     * @param model
     * @returns {{email: (string), password: (*)}}
     */
    fn_assembly = function (model) {
      return {
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
     * Validade model and executes fn_find|fn_error in success|fail
     *
     * @param user
     * @param fn_find
     * @param fn_error
     */
    fn_validate = function (user, fn_find, fn_error) {
      var errors = [];

      if (!validator.isEmail(user.email)) {
        errors.push(fn_push_error('Invalid e-mail', 'email', user.email));
      }

      User.findOne({email: user.email}).done(function (err, doc) {
        if (err) {
          errors.push(fn_push_error('MongoDB error', '', err));
        } else if (!doc) {
          errors.push(fn_push_error('Incorrect e-mail or password', 'email', user.email));
        }

        if (!validator.isLength(user.password, 4)) {
          errors.push(fn_push_error('Incorrect e-mail or password', 'password', user.password));
        }

        !errors.length ? fn_find(user, doc) : fn_error(errors);

      });
    };

    /**
     * Check password
     * @param user
     * @param doc
     */
    fn_find = function (user, doc) {
      bcrypt.compare(user.password, doc.password, function (err, result) {
        if (err) {
          return res.json({
            success: false, errors: [
              fn_push_error('bcrypt error', '', err)
            ]});
        }

        if (!result) {
          return res.json({success: false, errors: [
            fn_push_error('Incorrect e-mail or password', 'password', '')
          ]});
        }

        req.session.user = doc;
        return res.json({success: true, user: {name: doc.name, email: doc.email}});
      });
    };

    /**
     * Return errors objects
     * @param errors
     */
    fn_error = function (errors) {
      return res.json({success: false, errors: errors});
    };

    user = fn_assembly(req.param('user'));
    fn_validate(user, fn_find, fn_error);
  },

  exit: function (req, res) {
    req.session.user = null;
    res.redirect('/enter');
  }

};
