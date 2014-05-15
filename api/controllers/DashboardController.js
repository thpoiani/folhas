module.exports = {

  index: function (req, res) {
    var user = req.session.user || req.user[0];

    DocumentService.findDocumentsByAuthor(user.email, function(err, documents) {
      if (err) return res.notFound(err);

      var data = {
        pageTitle: "folhas | " + user.name + "'s Dashboard",
        isPhone: MobileDetect.isPhone(req),
        user: user,
        documents: documents
      };

      res.render('dashboard/index', data);
    });
  }

};
