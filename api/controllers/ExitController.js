module.exports = {

  index: function (req, res) {
    req.session.user = null;
    req.logout();

    res.redirect('/enter');
  }

};
