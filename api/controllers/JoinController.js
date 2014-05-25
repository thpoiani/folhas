var validator = require('validator');

module.exports = {

  index: function (req, res) {
    var data = {
      seo: {
        title: 'folhas | Join',
        description: 'Text editor for reactive writing and documents sharing on social networks',
        keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani, enter, join, login, signup',
        url: 'http://folhas-thpoiani.rhcloud.com/join',
        image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
        canonical: 'http://folhas-thpoiani.rhcloud.com'
      },
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('join/index', data);
  }

};
