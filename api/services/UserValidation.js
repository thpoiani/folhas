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
    if (err) return {name: 'mongodb', message: 'We lost connection'};
    if (model) return {name: 'email', message: 'This email already exists'};

    cb();
  });
};

exports.emailNotExists = function (email) {
  User.findOne({email: email, isActive: true}, function(err, model) {
    if (err) return {name: 'mongodb', message: 'We lost connection'};
    if (!model) return {name: 'email', message: 'This email don\'t exists'};
  });
};

exports.password = function(password) {
  if (!validator.isLength(password, 4)) {
    return {name: 'password', message: 'Use at least 4 characters'};
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
}