var bcrypt = require('bcrypt'),
    validator = require('validator');

exports.name = function(name) {
  if (validator.isNull(name)) {
    return {name: 'name', message: 'Write your name'};
  } else if (!validator.isLength(name, 1, 80)) {
    return {name: 'name', message: 'Use no more than 80 characters'};
  }
};

exports.email = function(email) {
  if (validator.isNull(email)) {
    return {name: 'email', message: 'Write your email'};
  } else if (!validator.isEmail(email)) {
    return {name: 'email', message: 'Your email is not valid'};
  }
};

exports.emailExists = function (email, cb) {
  User.findOne({email: email, isActive: true}, function(err, model) {
    if (err) return {name: '', message: 'We lost connection'};
    if (model) return {name: 'email', message: 'This email already exists'};

    cb();
  });
};

exports.emailNotExists = function (email) {
  User.findOne({email: email, isActive: true}, function(err, model) {
    if (err) return {name: '', message: 'We lost connection'};
    if (!model) return {name: 'email', message: 'This email don\'t exists'};
  });
};

exports.emailIsUnique = function (email, session, cb) {
  User.findOne({email: email, isActive: true}, function (err, model) {
    if (err) cb({name: '', message: 'We lost connection'});
    if (model && model.id !== session.id) cb({name: 'email', message: 'This email already exists'});

    cb(null, model);
  });
}

exports.password = function(password) {
  if (!validator.isLength(password, 4)) {
    return {name: 'password', message: 'Use at least 4 characters'};
  }
};

exports.passwordEquals = function (new_password, confirm_new_password) {
  if (validator.isNull(new_password)) {
    return {name: 'new_password', message: 'Write your new password'};
  }

  if (validator.isNull(confirm_new_password)) {
    return {name: 'confirm_new_password', message: 'Confirm your new password'};
  }

  if (!validator.equals(new_password, confirm_new_password)) {
    return {name: 'new_password', message: 'Confirmation password must be equals'};
  }
};

exports.emailEquals = function (user, session) {
  if (validator.isNull(user)) {
    return {name: 'email', message: 'Write your email'};
  }

  if (!validator.equals(user, session)) {
    return {name: 'email', message: 'Incorrect email'};
  }
};

exports.authentication = function(user, cb) {
  User.findOne({email: user.email.trim(), isActive: true}, function(err, model) {
    if (err) return cb(null, {name: '', message: 'We lost connection'});
    if (!model) return cb(null, {name: '', message: 'Incorrect email or password'});

    bcrypt.compare(user.password, model.password, function (err, result) {
      if (err) return cb(null, {name: '', message: 'We lost connection'});
      if (!result) return cb(null, {name: '', message: 'Incorrect email or password'});

      cb(model);
    });
  });
};

exports.comparePasswords = function(new_password, old_password, cb) {
  bcrypt.compare(new_password, old_password, function (err, result) {
    if (err) return cb({name: '', message: 'We lost connection'});
    if (!result) return cb({name: '', message: 'Incorrect email or password'});

    cb();
  });
};