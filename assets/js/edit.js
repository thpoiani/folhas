(function (win, doc) {
  'use strict';

  var Edit = (function () {

    var exports = {};

    exports.form = function () {
      submit = function (event) {
        event.preventDefault();

        var form = event.srcElement,
          action = form.action,
          method = form.querySelector('[name=_method]').value,
          email = form.querySelector('[name=email]').value,
          user = {};

        var inputs = form.querySelectorAll('input[name^=user]');

        for (var i = inputs.length - 1; i >= 0; i--) {
          var name, attr;

          name = inputs[i].name;
          attr = name.substring(name.lastIndexOf('[') + 1, name.lastIndexOf(']'));

          user[attr] = inputs[i].value;
        }

        switch (method) {
          case 'put':
            socket.put(action + '/' + email, {user: user, form: form.id}, function (response) {
              // TODO validação
              console.log(response);
            });
            break;

          case 'delete':
            // TODO, abrir modal

            socket.delete(action + '/' + email, {user: user}, function (response) {
              // TODO validação
              console.log(response);

              if (response.success) {
                location.href = '/';
              }
            });
            break;
        }
      };

      var forms, submit;

      forms = doc.querySelectorAll('form');

      for (var i = forms.length - 1; i >= 0; i--) {
        forms[i].addEventListener('submit', submit);
      }
    };

    return exports;
  })();

  Edit.form();

})(window, document);
