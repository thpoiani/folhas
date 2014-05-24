var errorObject = function(id, message, url) {
  return {
    id: id,
    message: message,
    url: url || 'http://docs.folhas.apiary.io/'
  };
}

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
        pageTitle: 'folhas',
        session: req.user ? req.user[0] : req.session.user
      };

      if (!author) return res.render('document/index', data);

      UserService.findUserByEmail(author, function(err, user) {
        if (err) return res.notFound();

        data.user = user;
        data.pageTitle = "folhas | " + user.name + "'s Document: " + document.title;

        res.render('document/index', data);
      });
    });
  },

  show: function (req, res) {
    var hash = req.param('hash');

    DocumentService.findDocumentByHash(hash, function(err, document) {
      if (err || !document) return res.json(404, errorObject('document_show', err, 'http://docs.folhas.apiary.io/#get-%2Fdocument%2F%7Bhash%7D'));

      UserService.findUserByEmail(document.author, function(err, user) {
        if (err) return res.json(404, errorObject('document_show', err, 'http://docs.folhas.apiary.io/#get-%2Fdocument%2F%7Bhash%7D'));

        document.author = user;

        res.json(200, document);
      });
    });
  },

  create: function (req, res) {
    var user = req.session.user || req.param('client_id'),
        hash = DocumentService.generateHash();

    if (!user) return res.json(401, errorObject('user_client_id', 'Missing authentication or client_id', 'http://docs.folhas.apiary.io/#post-%2Fdocument%2F%7B%3Fclient_id%7D'));

    DocumentService.createDocument(user, hash, function(err, document) {
      if (err) return res.json(400, errorObject('document_create', err, 'http://docs.folhas.apiary.io/#post-%2Fdocument%2F%7B%3Fclient_id%7D'));

      res.json(201, document);
    });
  },

  destroy: function (req, res) {
    var user = req.session.user || req.param('client_id'),
        hash = req.param('hash');

    if (!user) return res.json(401, errorObject('user_client_id', 'Missing authentication or client_id', 'http://docs.folhas.apiary.io/#delete-%2Fdocument%2F%7Bhash%7D%2F%7B%3Fclient_id%7D'));

    DocumentService.destroyDocumentByHash(user, hash, function(err, document) {
      if (err) return res.json(400, errorObject('document_destroy', err, 'http://docs.folhas.apiary.io/#delete-%2Fdocument%2F%7Bhash%7D%2F%7B%3Fclient_id%7D'));

      res.json(200, document);
    });
  },

  connect: function(req, res) {
    if (!req.isSocket) throw new Error('This request must be sent by socket');

    var hash = req.param('hash');
    req.socket.join(hash);
  },

  change: function(req, res) {
    var data = {
      hash: req.param('hash'),
      text: req.param('text'),
      title: req.param('title'),
      cursor: req.param('cursor')
    };

    DocumentService.findDocumentByHash(data.hash, function(err, document) {
      if (err) return res.json(400, errorObject('document_update', err, 'http://docs.folhas.apiary.io/#put-%2Fdocument%2F%7Bhash%7D'));

      document.text = data.text;
      document.title = data.title;

      document.save(function(err){
        if (err) return res.json(500, errorObject('document_update', err, 'http://docs.folhas.apiary.io/#put-%2Fdocument%2F%7Bhash%7D'));

        if (!req.isSocket) return res.json(200, document);

        sails.io.sockets.in(data.hash).emit('change', data);
      });
    });
  }

};
