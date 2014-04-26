var Hashids = require('hashids');

exports.generateHash = function() {
  var options, hashids;

  options = {
    salt: 'https://github.com/thpoiani/folhas',
    length: 10,
    date: new Date().getTime()
  };

  hashids = new Hashids(options.salt, options.length);

  return hashids.encrypt(options.date);
};
