module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas | Remember",
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('remember/index', data);
  }

};
