/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Action blueprints:
   *    `/auth/login`
   */
  login: function (req, res) {
    var data = {
      name: 'Thiago Henrique Poiani',
      email: 'thpoiani@gmail.com',
      password: '123456',
      apiKey: null,
      isActive: true
    };

    User.create(data).done(function(err, user) {

      // Error handling
      if (err) {
        return console.log(err);

        // The User was created successfully!
      }else {
        console.log("User created:", user);
      }
    });

    // Send a JSON response
    return res.json({
      user: 'login'
    });
  },

  /**
   * Action blueprints:
   *    `/auth/logout`
   */
  logout: function (req, res) {
    var bcrypt = require('bcrypt');

    User.findOne({email: 'thpoiani@gmail.com'}).done(function(err, user) {

      bcrypt.compare('123456', user.password, function(err, res) {
        if (res){
          console.log('LOGOU');
        }else{
          console.log('SENHA ERRADA');
        }
      });

      console.log(user);
    });

    // Send a JSON response
    return res.json({
      user: 'logout'
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};
