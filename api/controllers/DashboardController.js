module.exports = {

  index: function (req, res) {
    var user = req.user ? req.user[0] : req.session.user;
    req.session.user = user;

    DocumentService.findDocumentsByAuthor(user.email, function(err, documents) {
      if (err) return res.notFound(err);

      var data = {
        seo: {
          title: "folhas | " + user.name + "'s Dashboard",
          description: 'Text editor for reactive writing and documents sharing on social networks',
          keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani',
          url: 'http://folhas-thpoiani.rhcloud.com/dashboard',
          image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
          canonical: 'http://folhas-thpoiani.rhcloud.com'
        },
        isPhone: MobileDetect.isPhone(req),
        user: user,
        documents: documents
      };

      res.render('dashboard/index', data);
    });
  }

};
