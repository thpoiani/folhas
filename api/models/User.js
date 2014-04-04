/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

//    id: 'integer',

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      minLength: 6,
      required: true
    },

    apiKey : 'string',

    isActive: 'boolean'

  	/* e.g.
  	nickname: 'string'
  	*/

  },

  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      });
    });
  }

};
