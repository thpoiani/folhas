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
      }

      if (target) {
          assembly(target, user);
      } else {
        for (var i = inputs.length - 1; i >= 0; i--) {
          assembly(inputs[i], user);
        }
      }

      return user;
    };

    var removeError = function (target) {
      var message, label, span;

      message = form.querySelector('p.error');
      if (message) message.remove();

      if (target) {
        var input = form.querySelector('#' + target.id);

        label = form.querySelector('label[for="' + target.id + '"]');
        span = label.querySelector('span');

        input.classList.remove('error');
        label.classList.remove('error');
        if (span) span.remove();
      } else {
        var labels = form.querySelectorAll('label'),
            i = 0;

        for (i = labels.length - 1; i >= 0; i--) {
          label = labels[i];
          span = label.querySelector('span');

          label.classList.remove('error');
          if (span) span.remove();
        }

        for (i = inputs.length - 1; i >= 0; i--) {
          inputs[i].classList.remove('error');
        }
      }
    };

    var addError = function (response) {
      if (!response) return;

      for (var i = response.length - 1; i >= 0; i--) {
        var field, element;

        field = response[i];

        if (field.name) {
          var input = form.querySelector('#' + field.name),
              label = form.querySelector('label[for="' + field.name + '"]');

          element = doc.createElement("span");
          element.innerText = field.message;

          input.classList.add('error');
          label.classList.add('error');
          label.appendChild(element);
        } else {
          element = doc.createElement("p");
          element.classList.add('error');
          element.innerText = field.message;

          form.insertBefore(element, form.firstChild);
        }
      }
    };

    var requestValidation = function (event) {
      event.preventDefault();

      socket.post('/user/validate', { "user" : getUser(event.target) }, function (response) {
        removeError(event.target);

        if (response.length) addError(response);
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

        socket.post(event.target.action, { "user" : getUser() }, function(response) {
          if (!response) location.href = '/me';

          removeError();
          addError(response);
        });
      };
    };

    return exports;
  })();

  Enter.validateOnBlur();
  Enter.requestOnSubmit();

})(window, document, socket);
