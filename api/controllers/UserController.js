var q = require('q');

module.exports = {

  validate: function (req, res) {
    var user = req.param('user');

    q
      .all([
        UserValidation.email(user.email),
        UserValidation.password(user.password)
      ])

      .then(function(){
        res.json({});
      })

      .fail(function(response){
        res.json(response);
      });
  }

};
