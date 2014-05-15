var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas | Enter",
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('enter/index', data);
  },

  facebook: function (req, res) {
    var options = {
      failureRedirect: '/enter',
      scope: ['email', 'public_profile']
    };

    passport.authenticate('facebook', options, function (err, user) {
      req.logIn(user, function (err) {
        if (err) return console.log(err);

        res.redirect('/dashboard');
      });
    })(req, res);
  }
};
