var Hashids = require('hashids');

var create = function(data, cb) {
  Document.create(data).done(function (err, document) {
    if (err) throw new Error(err);

    cb(document);
  });
}

exports.generateHash = function () {
  var options, hashids;

  options = {
    salt: 'https://github.com/thpoiani/folhas',
    length: 10,
    date: new Date().getTime()
  };

  hashids = new Hashids(options.salt, options.length);

  return hashids.encrypt(options.date);
};

exports.findDocumentByHash = function (hash, cb) {
  Document.findOne({hash: hash, isActive: true}, function (err, document) {
    if (err) throw new Error(err);

    if (!document) throw new Error('Invalid HASH');

    cb(document);
  });
}

exports.createDocumentBySocket = function (req, cb) {
  if (!req.isSocket) throw new Error('This request must be sent by socket');

  var author = req.session.user ? req.session.user.email : null,
      hash = DocumentService.generateHash();

  create({author: author, hash: hash}, cb);
};

exports.destroyDocumentByHash = function (hash, cb) {
  Document.findOne({hash: hash, isActive: true}, function (err, document) {
    if (err) throw new Error(err);

    if (!document) throw new Error('Invalid HASH');

    document.isActive = false;

    document.save(function(err) {
      if (err) throw new Error(err);

      cb();
    });
  });

};