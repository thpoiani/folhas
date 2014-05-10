module.exports = function(req, res, next) {
  return (req.session.user) ? next() : res.redirect('/enter');
};