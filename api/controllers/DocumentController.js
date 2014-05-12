module.exports = {

  index: function (req, res) {
    var hash = req.param('hash');

    DocumentService.findDocumentByHash(hash, function(err, document) {
      if (err || !document) return res.notFound();

      var author = document.author;

      var data = {
        isPhone: MobileDetect.isPhone(req),
        document: document,
        user: null,
        pageTitle: 'folhas'
      };

      if (!author) return res.render('document/index', data);

      UserService.findUserByEmail(author, function(user) {
        data.user = user;
        data.pageTitle = "folhas | " + user.name + "'s Document: " + document.title;

        res.render('document/index', data);
      });
    });
  },

  create: function (req, res) {
    DocumentService.createDocumentBySocket(req, function(document) {
      res.json({success: true, document: document});
    });
  },

  destroy: function (req, res) {
    var hash = req.param('hash');

    DocumentService.destroyDocumentByHash(hash, function() {
      // TODO SOCKET EMIT
      res.json({success: true});
    });
  },

  connect: function(req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var hash = req.param('hash');
    req.socket.join(hash);
  },

  change: function(req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var data = {
      hash: req.param('hash'),
      text: req.param('text'),
      title: req.param('title'),
      cursor: req.param('cursor')
    };

    DocumentService.findDocumentByHash(data.hash, function(document) {
      document.text = data.text;
      document.title = data.title;

      document.save(function(err){
        if (err) throw new Error(err);
        sails.io.sockets.in(data.hash).emit('change', data);
      });
    });
  }

};
