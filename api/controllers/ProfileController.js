module.exports = {

  index: function (req, res) {
    var user = req.session.user || req.user[0];

    var data = {
        pageTitle: "folhas | " + user.name + "'s Profile",
        isPhone: MobileDetect.isPhone(req),
        user: user
      };

    res.render('profile/index', data);
  }

};
