var encrypt = function(values, next) {
  var bcrypt = require('bcrypt');

  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(values.password, salt, function (err, hash) {
      if (err) return next(err);

      values.password = hash;
      next();
    });
  });
};

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true,
      index: true
    },

    password: {
      type: 'string',
      defaultsTo: null
    },

    recovery: {
      type: 'array',
      defaultsTo: []
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  beforeCreate: function (values, next) {
    if (!values.password) next();

    encrypt(values, next);
  },

  beforeUpdate: function (values, next) {
    User.findOne({email: values.email, isActive: true}, function(err, user) {
      if (err) return next(err);

      // if password changes
      if (user && values.password && user.password != values.password) {
        encrypt(values, next)
      } else {
        next();
      }
    });
  }

};
