module.exports = {

  index: function (req, res) {
    var unique_id = req.param('unique_id');

    UserService.findUserByRecovery(unique_id, function(errors, model) {
        if (errors) return res.json(errors);

        var data = {
          pageTitle: "folhas | Recovery",
          isPhone: MobileDetect.isPhone(req),
          user: model
        };

        res.render('recovery/index', data);
    });
  }

}