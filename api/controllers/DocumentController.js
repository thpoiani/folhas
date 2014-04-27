module.exports = {

  index: function (req, res) {
    var hash = req.param('hash');

    Document.findOne({hash: hash}, function (err, document) {
      if (err) throw new Error(err);

      if (!document) return res.serverError('Invalid HASH');

      res.render('document/index', {document: document});
    });
  },

  create: function (req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var author = req.session.user ? req.session.user.email : null,
      hash = DocumentService.generateHash();

    Document.create({author: author, hash: hash}).done(function (err, document) {
      if (err) throw new Error(err);

      res.json({success: true, document: document});
    });
  },

  connect: function(req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var hash = req.param('hash');
    req.socket.join(hash);
  },


  change: function(req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var hash = req.param('hash');
    var text = req.param('text');
    var cursor = req.param('cursor');

    Document.findOne({hash: hash}, function(err, document){
      if (err) throw new Error(err);

      document.text = text;

      document.save(function(err){
        if (err) throw new Error(err);
        sails.io.sockets.in(hash).emit('change', {hash: hash, text: text, cursor: cursor});
      });
    });
  }

};
