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
  default: next();
  }
};