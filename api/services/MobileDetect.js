var MobileDetect = require('mobile-detect');

exports.isPhone = function (req) {
  var mobileDetect = new MobileDetect(req.headers['user-agent']);

  return mobileDetect.phone();
};

exports.isMobile = function (req) {
  var mobileDetect = new MobileDetect(req.headers['user-agent']);

  return mobileDetect.mobile();
};

exports.isTablet = function (req) {
  var mobileDetect = new MobileDetect(req.headers['user-agent']);

  return mobileDetect.tablet();
};
