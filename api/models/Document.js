var addTitleSuffixIfDuplicate = function (values, next) {
  var count = 0;

  var findRecursiveDocumentByTitle = function (titulo, cb) {
    Document.findOne({author:values.author, title: titulo, isActive: true}, function(err, document) {
      if (err) return next(err);

      if (!document) return cb(titulo);

      count++;
      findRecursiveDocumentByTitle(values.title + ' (' + count + ')', cb);
    });
  }

  findRecursiveDocumentByTitle(values.title, function(title) {
    values.title = title;
    next();
  });
};

module.exports = {

  attributes: {
    title: {
      type: 'string',
      defaultsTo: 'Untitled document'
    },

    hash: {
      type: 'string',
      required: true,
      unique: true,
      index: true
    },

    author: {
      type: 'email',
      defaultsTo: null
    },

    text: {
      type: 'text',
      defaultsTo: ''
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  beforeCreate: function (values, next) {
    addTitleSuffixIfDuplicate(values, next);
  },

  beforeUpdate: function (values, next) {
    Document.findOne({hash: values.hash, isActive: true}, function(err, document) {
      if (err) return next(err);

      // if title changes
      if (document && values.title && document.title != values.title) {
        addTitleSuffixIfDuplicate(values, next);
      } else {
        next();
      }
    });
  }

};
