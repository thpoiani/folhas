module.exports = function(req, res, next) {
  var user = req.session.user || req.user ? req.user[0] : null;
  return (user) ? next() : res.redirect('/enter');
};