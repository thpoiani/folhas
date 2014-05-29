var Hashids = require('hashids');

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
    if (err) cb(new Error(err), null);

    if (!document) cb(new Error('Invalid HASH'), null);

    cb(null, document);
  });
}

exports.findDocumentsByAuthor = function (author, cb) {
  Document.find({author: author, isActive: true}).sort({title:1}).done(function(err, documents) {
    if (err) cb(new Error(err), null);

    cb(null, documents);
  });
}

exports.createDocument = function (user, hash, cb) {
  var validate = function (user) {
    var data = {
      author: user.email,
      hash: hash
    };

    Document.create(data).done(function (err, document) {
      if (err) return cb(err);

      cb(null, document);
    });
  }

  if (typeof user === 'string') {
    User.findOne({id: user}, function (err, model) {
      if (err) return cb(err);

      validate(model);
    });
  } else {
    validate(user);
  }
};

exports.destroyDocumentByHash = function (user, hash, cb) {
  var validate = function (user) {
    Document.findOne({hash: hash, author: user.email, isActive: true}, function (err, document) {
      if (err || !document) return cb('Invalid HASH');

      document.isActive = false;

      document.save(function(err) {
        if (err) return cb(err);

        document.author = user;
        cb(null, document);
      });
    });
  }

  if (typeof user === 'string') {
    User.findOne({id: user}, function (err, model) {
      if (err) return cb(err);

      validate(model);
    });
  } else {
    validate(user);
  }

};

exports.getHomeDocument = function(document, cb) {
  Document.findOne(document, function(err, model) {
    if (err) return cb(err);

    if (!model) {
      Document.create(document, function(err, model) {
        if (err) return cb(err);

        cb(null, model);
      });
    } else {
      cb(null, model);
    }
  });
};