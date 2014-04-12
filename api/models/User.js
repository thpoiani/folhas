module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    apiKey: {
      type: 'string',
      defaultsTo: null
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  beforeCreate: function (values, next) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }

        values.password = hash;
        next();
      });
    });
  }

};
