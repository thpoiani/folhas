var validator = require('validator'),
  nodemailer = require("nodemailer"),
  Hashids = require("hashids");

module.exports = {

  index: function (req, res) {

    res.view('remember/index');
  },

  remember: function (req, res) {
    var user, fn_assembly, fn_push_error, fn_validate, fn_send, fn_recovery, fn_error;

    /**
     * Receive socket POST params
     *
     * @param model
     */
    fn_assembly = function (model) {
      return {
        email: model.email.trim()
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
     * @param fn_recovery
     * @param fn_error
     */
    fn_validate = function (user, fn_recovery, fn_error) {
      var errors = [];

      if (!validator.isEmail(user.email)) {
        errors.push(fn_push_error('Invalid e-mail', 'email', user.email));
      }

      User.findOne({email: user.email}).done(function (err, doc) {
        if (err) {
          errors.push(fn_push_error('MongoDB error', '', err));
        } else if (!doc) {
          errors.push(fn_push_error('E-mail don\'t exists', 'email', user.email));
        }

        !errors.length ? fn_recovery(doc) : fn_error(errors);
      });
    };

    /**
     * Recovery password
     * @param user
     */
    fn_recovery = function (user) {
      var hashids,
        unique_id,
        date = new Date();

      hashids = new Hashids(date.getTime().toString());
      unique_id = hashids.encryptHex(user.id);

      user.recovery.push(
        {
          _id: unique_id,
          date: date
        }
      );

      user.save(function (err) {
        if (err) {
          return res.json({success: false, errors: [
            fn_push_error('Failure to build recovery system', 'recovery', err)
          ]});
        }

        fn_send(user, unique_id);
      });
    };

    fn_send = function (user, unique_id) {
      var text, html, smtpTransport, mailOptions;

      // TODO TEMPLATE EMAIL
      text = 'Set new Password in http://localhost:1337/recovery/' + unique_id;
      html = '<p>Set new Password in <a href="http://localhost:1337/recovery/' + unique_id + '" target="_blank">http://localhost:1337/recovery/' + unique_id + '</a></p>';

      smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
          user: "thpoiani@gmail.com", // TODO
          pass: "tgopoiani01" // TODO
        }
      });

      mailOptions = {
        from: "folhas",
        to: user.email,
        subject: 'folhas - Password recovery',
        text: text,
        html: html
      };

      smtpTransport.sendMail(mailOptions, function (error, response) {
        smtpTransport.close();

        if (error) {
          return res.json({success: false, errors: [
            fn_push_error('Sending error', 'email', error)
          ]});
        } else {
          return res.json({success: true, message: response.message});
        }
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
    fn_validate(user, fn_recovery, fn_error);
  },

  recovery: function (req, res) {
    var unique_id, fn_push_error, fn_aggregate;

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
     * Search user with this recovery unique_id
     * @param unique_id
     */
    fn_aggregate = function (unique_id) {
      var unwind, match;

      unwind = { $unwind: "$recovery" };
      match = {
        $match: {
          'recovery._id': unique_id
        }
      };

      User.native(function (err, collection) {
        collection.aggregate(unwind, match, function (err, results) {
          var response;

          if (err) {
            response = {
              success: false, errors: [
                fn_push_error('MongoDB error', '', err)
              ]};
          }

          if (results.length != 1) {
            response = {
              success: false, errors: [
                fn_push_error('Invalid recovery link', '', err)
              ]};
          } else {
            response = { success: true, user: results[0] };
          }

          res.render('remember/recovery', response);
        });
      });
    };

    unique_id = req.param('unique_id');
    fn_aggregate(unique_id);
  },

  update: function (req, res) {
    var unique_id, fn_push_error, fn_aggregate;

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
     * Search user with this recovery unique_id
     * @param unique_id
     */
    fn_aggregate = function (unique_id, callback) {
      var unwind, match;

      unwind = { $unwind: "$recovery" };
      match = {
        $match: {
          'recovery._id': unique_id
        }
      };

      User.native(function (err, collection) {
        collection.aggregate(unwind, match, function (err, results) {
          if (err) {
            res.json({
              success: false, errors: [
                fn_push_error('MongoDB error', '', err)
              ]});
          }

          if (results.length != 1) {
            res.json({
              success: false, errors: [
                fn_push_error('Invalid recovery link', '', err)
              ]});
          } else {
            callback(results[0]);
          }
        });
      });
    };

    fn_find = function (result, callback) {
      User.findOne({email: result.email}).done(function (err, user) {
        if (err) {
          return res.json({
            success: false, errors: [
              fn_push_error('MongoDB error', '', err)
            ]});
        } else if (!user) {
          return res.json({
            success: false, errors: [
              fn_push_error('E-mail don\'t exists', 'email', err)
            ]});
        }

        callback(user);
      });
    };

    fn_update = function (user, doc) {
      doc.password = user.password;

      doc.save(function (err) {
        if (err) {
          return res.json({success: false, errors: [
            fn_push_error('Failure to build recovery system', 'recovery', err)
          ]});
        }

//        req.session.user = doc;
        res.json({success: true, user: {name: doc.name, email: doc.email}});
      });
    };

    /**
     * Receive socket POST params
     *
     * @param model
     */
    fn_assembly = function (model) {
      return {
        password: model.password.trim()
      }
    };

    unique_id = req.param('unique_id');
    var user = fn_assembly(req.param('user'));

    fn_aggregate(unique_id, function(result) {
      fn_find(result, function(doc) {
        if (!validator.isLength(user.password, 4)) {
          return res.json({success: false, errors: [
            fn_push_error('Invalid password', 'password', user.password)
          ]});
        }

        fn_update(user, doc);
      });
    });
  }

};
