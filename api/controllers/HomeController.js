module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas",
      isPhone: MobileDetect.isPhone(req),
      footer: true
    };

    res.render('home/index', data);
  }

};
