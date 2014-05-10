module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas | Enter",
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('enter/index', data);
  }

};
