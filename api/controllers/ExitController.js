module.exports = {

  index: function (req, res) {
    req.session.user = null;
    res.redirect('/enter');
  }

};
