module.exports = {

  index: function (req, res) {
    var document = {
      author: "thpoiani@gmail.com",
      hash: "POIANI"
    };

    var data = {
      seo: {
        title: 'folhas',
        description: 'Text editor for reactive writing and documents sharing on social networks',
        keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, node.js, socket.io, ifsp, instituto federal de são paulo, poiani',
        url: 'http://folhas-thpoiani.rhcloud.com',
        image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
        canonical: 'http://folhas-thpoiani.rhcloud.com'
      },
      isPhone: MobileDetect.isPhone(req),
      footer: true
    };

    DocumentService.getHomeDocument(document, function(err, model) {
      if (err) return res.serverError(err);

      data.document = model;
      res.render('home/index', data);
    });
  }

};
