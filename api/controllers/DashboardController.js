/**
 * MeController
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

  // show
  index: function (req, res) {
    res.render('dashboard/index', {user: req.session.user});
  },

  edit: function(req, res) {
    res.render('dashboard/edit', {user: req.session.user});
  },

  update: function(req, res) {
    console.log(req.param('user'));

    process.exit(1);
    // update database
    // update session

    // edit profile
  },

  change_password: function(req, res) {
    // update database

    // change password
  },

  destroy: function(req, res) {
    // update database isActive
    // clear session
    // send home
  }

};
