module.exports = function(req, res, next) {
  req.user = req.user ? req.user[0] : null;
  var user = req.session.user || req.user;
  return (!user) ? next() : res.redirect('/dashboard');
};