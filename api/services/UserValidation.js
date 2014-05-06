var q = require('q'),
    validator = require('validator');

exports.name = function(name) {
  var deferred = q.defer();

  if (validator.isNull(name)) {
    deferred.reject({name: 'name', message: 'Write your name'});
  } else if (!validator.isLength(name, 1, 80)) {
    deferred.reject({name: 'name', message: 'Your name is too large, abbreviate it. Use no more than 80 characters'});
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
    if (err) deferred.reject({name: 'mongodb', message: 'We lost the database connection'});

    if (users.length) deferred.reject({name: 'email', message: 'This email already exists in our database'});

    deferred.resolve();

    return deferred.promise;
  });
};

exports.emailNotExists = function (email) {
  var deferred = q.defer();

  User.findByEmail(email, function(err, users) {
    if (err) deferred.reject({name: 'mongodb', message: 'We lost the database connection'});

    if (!users.length) deferred.reject({name: 'email', message: 'This email don\'t exists in our database'});

    deferred.resolve();

    return deferred.promise;
  });
};

exports.password = function(password) {
  var deferred = q.defer();

  if (!validator.isLength(password, 4)) {
    deferred.reject({name: 'password', message: 'Your password is too short. Use at least 4 characters'});
  }

  deferred.resolve();

  return deferred.promise;
};
