
module.exports = {

  join: function(req, res) {
    if (req.isAjax) {
      var user = req.body;

      var findUser = function(err, doc) {
        if (err || doc) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        // TODO validação

        User.create(user).done(createUser);
      };

      var createUser = function(err, doc) {
        if (err || !doc) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        // TODO abrir sessão
        return res.json({success: true});
      };

      User.findOne({email: user.email}).done(findUser);
    } else {
      res.redirect('/', 301);
    }
  },

  enter: function(req, res) {
    if (req.isAjax) {
      var user = req.body;

      var findUser = function(err, doc) {
        if (err || !doc) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        var bcrypt = require('bcrypt');
        bcrypt.compare(user.password, doc.password, compareResult);
      };

      var compareResult = function(err, result) {
        if (err || !result) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        // TODO abrir sessão
        return res.json({success: true});
      };

      User.findOne({email: user.email}).done(findUser);
    } else {
      res.redirect('/', 301);
    }
  },

  remember: function (req, res) {
    if (req.isAjax) {
      var user = req.body;

      var findUser = function(err, doc) {
        if (err || !doc) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        var bcrypt = require('bcrypt');
        bcrypt.compare(user.password, doc.password, compareResult);
      };

      var compareResult = function(err, result) {
        if (err || !result) {
          // TODO registar log de erro
          return res.json({success: false});
        }

        // TODO ENVIAR EMAIL com senha
        return res.json({success: true});
      };

      User.findOne({email: user.email}).done(findUser);
    } else {
      res.redirect('/', 301);
    }
  },

  logout: function (req, res) {
    // TODO fechar sessao
  },

  _config: {}

};
