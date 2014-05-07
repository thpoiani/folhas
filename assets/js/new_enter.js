(function (win, doc, socket) {
  'use strict';

  var Enter = (function () {

    var exports = {},
      form = doc.querySelector('form.auth-form'),
      inputs = form.querySelectorAll('input[name^=user]');

    var getUser = function (target) {
      var user = {};

      function assembly(input, user) {
          var name, attr;

          name = input.name;
          attr = name.substring(name.lastIndexOf('[') + 1, name.lastIndexOf(']'));

          user[attr] = input.value;
      };

      if (target) {
          assembly(target, user);
      } else {
        for (var i = inputs.length - 1; i >= 0; i--) {
          assembly(inputs[i], user);
        }
      }

      return user;
    };

    var isEmpty = function (obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    var removeError = function (target) {
      var input = form.querySelector('#' + target.id),
          label = form.querySelector('label[for="' + target.id + '"]'),
          span = label.querySelector('span');

      input.classList.remove('error');
      label.classList.remove('error');

      if (span) span.remove();
    };

    var addError = function (response) {
      var input = form.querySelector('#' + response.name),
          label = form.querySelector('label[for="' + response.name + '"]'),
          message = ' <span>' + response.message + '</span>';

      input.classList.add('error');
      label.classList.add('error');
      label.innerHTML += message;
    }

    var requestValidation = function (event) {
      event.preventDefault();

      socket.post('/user/validate', { "user" : getUser(event.target) }, function (response) {
        removeError(event.target);

        if (!isEmpty(response)) addError(response);
      });
    };

    exports.validateOnBlur = function () {
      for (var i = inputs.length - 1; i >= 0; i--) {
        inputs[i].addEventListener('blur', requestValidation);
      }
    };

    exports.requestOnSubmit = function() {
      form.onsubmit = function(event) {
        event.preventDefault();

        socket.post('/user', { "user" : getUser() }, function(response) {
          console.log(response);
        });
      };
    };

    return exports;
  })();

  Enter.validateOnBlur();
  Enter.requestOnSubmit();

})(window, document, socket);
