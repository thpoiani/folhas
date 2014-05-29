module.exports = {

  index: function (req, res) {
    var user = req.session.user || req.user[0];

    var data = {
      seo: {
        title: "folhas | " + user.name + "'s Profile",
        description: 'Text editor for reactive writing and documents sharing on social networks',
        keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani',
        url: 'http://folhas-thpoiani.rhcloud.com/profile',
        image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
        canonical: 'http://folhas-thpoiani.rhcloud.com'
      },
      isPhone: MobileDetect.isPhone(req),
      user: user
    };

    res.render('profile/index', data);
  }

};
