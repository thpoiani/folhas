module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas",
      isPhone: MobileDetect.isPhone(req)
    };

    res.render('home/index', data);
  }

};
