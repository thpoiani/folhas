var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {

  index: function (req, res) {
    var data = {
      seo: {
        title: 'folhas | Enter',
        description: 'Text editor for reactive writing and documents sharing on social networks',
        keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani, enter, join, login, signup',
        url: 'http://folhas-thpoiani.rhcloud.com/enter',
        image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
        canonical: 'http://folhas-thpoiani.rhcloud.com'
      },
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
