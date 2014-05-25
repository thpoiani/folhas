module.exports = {

  index: function (req, res) {
    var unique_id = req.param('unique_id');

    UserService.findUserByRecovery(unique_id, function(errors, model) {
        if (errors) return res.json(errors);

        var data = {
          seo: {
            title: 'folhas | Recovery',
            description: 'Text editor for reactive writing and documents sharing on social networks',
            keywords: 'folhas, text, editor, reactive, write, collaborative, document, share, social network, poiani, recovery, password',
            url: 'http://folhas-thpoiani.rhcloud.com/recovery',
            image: 'http://folhas-thpoiani.rhcloud.com/images/folhas.png',
            canonical: 'http://folhas-thpoiani.rhcloud.com'
          },
          isPhone: MobileDetect.isPhone(req),
          user: model
        };

        res.render('recovery/index', data);
    });
  }

}