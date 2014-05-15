module.exports = {

  index: function (req, res) {
    req.logout();
    req.session = null;

    res.redirect('/enter');
  }

};
