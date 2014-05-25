module.exports = {

  index: function (req, res) {
    var data = {
      seo: {
        title: 'folhas | Remember',
        description: 'Text editor for reactive writing and documents sharing on social networks',
        keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani, remember, password',
        url: 'http://folhas-thpoiani.rhcloud.com/remember',
        image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
        canonical: 'http://folhas-thpoiani.rhcloud.com'
      },
      isPhone: MobileDetect.isPhone(req)
    };

    res.view('remember/index', data);
  }

};
