var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {
    User.findOne({email: profile._json.email}, function (err, user) {
      if (user) return done(null, user);

      var data = {
        name: profile._json.name,
        email: profile._json.email
      };

      User.create(data, function (err, model) {
        return done(null, model);
      });
    });
  });
};

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findByEmail(email, function(err, user) {
    done(err, user);
  });
});

module.exports = {
  express: {
    customMiddleware: function (app) {
      passport.use(new FacebookStrategy({
        clientID: "275028299334780",
        clientSecret: "b172217c09fe1ff109d4d35c8c6ef975",
        callbackURL: "http://localhost:1337/enter/facebook/callback"
      }, verifyHandler));

      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
