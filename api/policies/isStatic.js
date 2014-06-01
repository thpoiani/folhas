var fs = require('fs');

module.exports = function(req, res, next) {
  var asset = {
    robots: {
      url: '/robots.txt',
      dir: '/../../assets/robots.txt',
      type: 'text/plain'
    },
    humans: {
      url: '/humans.txt',
      dir: '/../../assets/humans.txt',
      type: 'text/plain'
    },
    sitemap: {
      url: '/sitemap.xml',
      dir: '/../../assets/sitemap.xml',
      type: 'application/xml'
    },
    webmasters: {
      url: '/google43b94c073e2f6d15.html',
      dir: '/../../assets/google43b94c073e2f6d15.html',
      type: 'text/html'
    }
  };

  var openFile = function (asset, cb) {
    fs.readFile(__dirname + asset.dir, 'utf8', function (err, data) {
      if (err) return res.notFound();

      res.type(asset.type);
      res.send(data);
    });
  }

  switch (req.url) {
  case asset.robots.url : openFile(asset.robots); break;
  case asset.humans.url : openFile(asset.humans); break;
  case asset.sitemap.url : openFile(asset.sitemap); break;
  case asset.webmasters.url : openFile(asset.webmasters); break;
  default: next();
  }
};