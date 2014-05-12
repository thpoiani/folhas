var validator = require('validator');

module.exports = {

  index: function (req, res) {
    var data = {
      pageTitle: "folhas | Join",
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('join/index', data);
  }

};
