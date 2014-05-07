var bcrypt = require('bcrypt'),
    q = require('q'),
    validator = require('validator');

exports.name = function(name) {
  var deferred = q.defer();

  if (validator.isNull(name)) {
    deferred.reject({name: 'name', message: 'Write your name'});
  } else if (!validator.isLength(name, 1, 80)) {
    deferred.reject({name: 'name', message: 'Use no more than 80 characters'});
  }

  deferred.resolve();

  return deferred.promise;
};

exports.email = function(email) {
  var deferred = q.defer();

  if (validator.isNull(email)) {
    deferred.reject({name: 'email', message: 'Write your email'});
  } else if (!validator.isEmail(email)) {
    deferred.reject({name: 'email', message: 'Your email is not valid'});
  }

  deferred.resolve();

  return deferred.promise;
};

exports.emailExists = function (email) {
  var deferred = q.defer();

  User.findByEmail(email, function(err, users) {
    if (err) deferred.reject({name: 'mongodb', message: 'We lost connection'});

    if (users.length) deferred.reject({name: 'email', message: 'This email already exists'});

    deferred.resolve();

    return deferred.promise;
  });
};

exports.emailNotExists = function (email) {
  var deferred = q.defer();

  User.findByEmail(email, function(err, users) {
    if (err) deferred.reject({name: 'mongodb', message: 'We lost connection'});

    if (!users.length) deferred.reject({name: 'email', message: 'This email don\'t exists'});

    deferred.resolve();

    return deferred.promise;
  });
};

exports.password = function(password) {
  var deferred = q.defer();

  if (!validator.isLength(password, 4)) {
    deferred.reject({name: 'password', message: 'Use at least 4 characters'});
  }

  deferred.resolve();

  return deferred.promise;
};

exports.authentication = function(email, password) {
  var deferred = q.defer();

  User.findByEmail(email, function(err, users) {
    if (err) deferred.reject({name: 'mongodb', message: 'We lost connection'});

    if (!users.length) {
      deferred.reject({name: 'email', message: 'This email don\'t exists'});
      return deferred.promise;
    } else {
      bcrypt.compare(password, users[0].password, function (err, result) {
        if (err) deferred.reject({name: 'bcrypt', message: 'We lost connection'});

        if (!result) deferred.reject({name: 'password', message: 'Incorrect email or password'});

        deferred.resolve();

        return deferred.promise;
      });
    }
  });
};
