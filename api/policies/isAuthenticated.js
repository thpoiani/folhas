module.exports = function(req, res, next) {
  var user = req.user ? req.user[0] : req.session.user;
  return user ? next() : res.redirect('/enter');
};