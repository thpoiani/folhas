module.exports = {

  index: function (req, res) {
    var hash = req.param('hash');

    DocumentService.findDocumentByHash(hash, function(document) {
      var data = {
        isPhone: MobileDetect.isPhone(req),
        document: document,
        user: req.session.user,
      };

      // TODO NAO PEGAR USUARIO DA SESSÃO, MAS BUSCA PELO AUTHOR DO DOCUMENTO
      data.pageTitle = req.session.user
        ? "folhas | " + req.session.user.name + "'s Document: " + document.title
        : "folhas";

      res.render('document/index', data);
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

    var hash, text, cursor, title;

    hash = req.param('hash');
    text = req.param('text');
    cursor = req.param('cursor');
    title = req.param('title');

    Document.findOne({hash: hash, isActive: true}, function(err, document){
      if (err) throw new Error(err);

      document.text = text;
      document.title = title;

      document.save(function(err){
        if (err) throw new Error(err);
        sails.io.sockets.in(hash).emit('change', {hash: hash, text: text, cursor: cursor, title: title});
      });
    });
  }

};
