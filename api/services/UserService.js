var bcrypt = require('bcrypt'),
    Hashids = require("hashids"),
    _ = require('underscore');

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
    if (err) return cb({name: '', message: 'We lost connection'});

    if (!user) return cb({name: 'email', message: 'Incorrect email'});

    cb(null, user);
  });
};

exports.create = function(user, cb) {
  var errors = [];

  errors.push(
    UserValidation.name(user.name)
  );

  errors.push(
    UserValidation.email(user.email)
  );

  errors.push(
    UserValidation.password(user.password)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  UserValidation.emailExists(user.email, function(err) {
    if (err) return cb(err);

    User.create(user).done(function (err, user) {
        if (err) return cb({name: '', message: 'We lost connection'});

        cb(null, user);
      });
  });
};

exports.updateProfile = function (user, session, cb) {
  var errors = [];

  var validate = function(user, session) {
    UserValidation.emailIsUnique(user.email, session, function(err, model) {
      if (err) return cb(err);

      update(session.id, user, function(err, model) {
        if (err) return cb(err);

        return cb(null, model);
      });
    });
  };

  errors.push(
    UserValidation.name(user.name)
  );

  errors.push(
    UserValidation.email(user.email)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  if (typeof session === 'string') {
    User.findOne({id: session}, function (err, model) {
      if (err) return cb(err);

      validate(user, model);
    });
  } else {
    validate(user, session);
  }
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

  UserService.findUserByEmail(session.email, function(errors, model) {

    if (errors) return cb(errors);

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

  var validate = function(user, session) {
    errors.push(
      UserValidation.emailEquals(user.email, session.email)
    );

    errors.push(
      UserValidation.password(user.password)
    );

    errors = _.compact(errors);

    if (errors.length) return cb(errors);

    UserService.findUserByEmail(session.email, function(errors, model) {

      if (errors) return cb(errors);

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

  if (typeof session === 'string') {
    User.findOne({id: session}, function (err, model) {
      if (err) return cb(err);

      validate(user, model);
    });
  } else {
    validate(user, session);
  }
};

exports.hasRecovery = function (user, cb) {
  var errors = [];

  errors.push(
    UserValidation.email(user.email)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  UserService.findUserByEmail(user.email, function(errors, model) {
    if (errors) return cb(errors);

    return cb(null, UserValidation.hasRecovery(model), model);
  });
};

exports.createRecovery = function (user, cb) {
  var date, hashids, unique_id;

  date = new Date();
  hashids = new Hashids(date.getTime().toString());
  unique_id = hashids.encryptHex(user.id);

  user.recovery.push(
    {
      _id: unique_id,
      date: date,
      hasChanged: false
    }
  );

  cb(user, unique_id);
};

exports.findUserByRecovery = function (unique_id, cb) {
  var unwind, match;

  unwind = { $unwind: "$recovery" };
  match = {
    $match: {
      'recovery._id': unique_id,
      'recovery.hasChanged': false
    }
  };

  User.native(function (err, collection) {
    if (err) return cb({name: '', message: 'We lost connection'});

    collection.aggregate(unwind, match, function (err, results) {
      if (err) return cb({name: '', message: 'We lost connection'});

      if (results.length != 1) return cb({name: '', message: 'Invalid recovery link'});

      cb(null, results[0]);
    });
  });
};

exports.recoveryPassword = function(user, model, cb) {
  var errors = [],
      recovery;

  errors.push(
    UserValidation.password(user.password)
  );

  errors = _.compact(errors);

  if (errors.length) return cb(errors);

  recovery = UserValidation.hasRecovery(model);

  model.password = user.password;
  recovery.hasChanged = true;

  model.save(function (err) {
    if (err) return cb(err);

    cb(null, model);
  });
};

exports.authentication = function(user, cb) {
  User.findOne({email: user.email.trim(), isActive: true}, function(err, model) {
    if (err) return cb(null, {name: '', message: 'We lost connection'});
    if (!model) return cb(null, {name: '', message: 'Incorrect email or password'});

    bcrypt.compare(user.password, model.password, function (err, result) {
      if (err || !result) return cb(null, {name: '', message: 'Incorrect email or password'});

      cb(model);
    });
  });
};
