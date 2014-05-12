var update = function (id, user, cb) {
  User.findOne({id: id}, function (err, model) {
    if (err) return cb({name: '', message: 'We lost connection'});

    model.email = user.email;
    model.name = user.name;

    model.save(function (err) {
      if (err) return cb({name: '', message: 'We lost connection'});

      cb(null, model);
    });
  });
};

exports.findUserByEmail = function (email, cb) {
  User.findOne({email: email, isActive: true}, function(err, user) {
    if (err) throw new Error(err);

    if (!user) throw new Error('Incorrect email');

    cb(user);
  });
};

exports.updateProfile = function (user, session, cb) {
  var errors = [];

  errors.push(
    UserValidation.name(user.name)
  );

  errors.push(
    UserValidation.email(user.email)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  UserValidation.emailIsUnique(user.email, session, function(err, model) {
    if (err) return cb(err);

    update(session.id, user, function(err, model) {
      if (err) return cb(err);

      return cb(null, model);
    });
  });
};

exports.updatePassword = function (user, session, cb) {
  var errors = [];

  errors.push(
    UserValidation.password(user.password)
  );

  errors.push(
    UserValidation.passwordEquals(user.new_password, user.confirm_new_password)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  UserService.findUserByEmail(session.email, function(model) {

    UserValidation.comparePasswords(user.password, model.password, function(errors) {
      if (errors) return cb(errors);

      model.password = user.new_password;

      model.save(function (err) {
        if (err) return cb({name: '', message: 'We lost connection'});

        cb(null, model);
      });
    });
  });
};

exports.destroy = function (user, session, cb) {
  var errors = [];

  errors.push(
    UserValidation.emailEquals(user.email, session.email)
  );

  errors.push(
    UserValidation.password(user.password)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  UserService.findUserByEmail(session.email, function(model) {

    UserValidation.comparePasswords(user.password, model.password, function(errors) {
      if (errors) return cb(errors);

      model.isActive = false;

      model.save(function (err) {
        if (err) return cb({name: '', message: 'We lost connection'});

        cb(null, model);
      });
    });
  });
};