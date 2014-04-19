(function (win, doc, User) {
  'use strict';

  var Enter = (function () {

    var exports = {};

    var input = {
      email: doc.querySelector('input[name=email]')
    };

    var assemblyUser = function () {
      var email = input.email.value.trim();

      return new User(null, email);
    };

    var validateUser = function (user) {
      var errors = user.getErrors();

      for (var i = 0, length = errors.length; i < length; i++) {
        input[errors[i]].className = 'error';
      }
    };

    var clearInput = function (name) {
      input[name].className = '';
    };

    exports.form = function () {
      var blur, submit, form, inputs;

      blur = function (event) {
        var user = assemblyUser(),
          field = event.srcElement.name;

        if (user.isValid(field)) {
          clearInput(field);
        } else {
          validateUser(user);
        }
      };

      submit = function (event) {
        var user = assemblyUser(),
            form = event.srcElement;

        event.preventDefault();

        if (user.isValid('email')) {
          // TODO LOADER

          socket.post(location.href, {user: user}, function (response) {
            if (response.success) {
              // TODO
              console.log(response);
            } else {
              var container = doc.getElementById('errors'),
                length = response.errors.length;

              if (!container) {
                container = doc.createElement('div');
                container.setAttribute('id', 'errors');

                form.appendChild(container);
              }

              container.innerHTML = null;

              for (var i = 0; i < length; i++) {
                var error = doc.createElement('p');
                error.innerHTML = response.errors[i].message;

                container.innerHTML += error.outerHTML;
              }
            }
          });
        } else {
          validateUser(user);
        }
      };

      form = doc.querySelector('form');
      inputs = form.querySelectorAll('input[name]');

      form.addEventListener('submit', submit);

      for (var i = inputs.length - 1; i >= 0; i--) {
        inputs[i].addEventListener('blur', blur);
      }
    };

    return exports;
  })();

  Enter.form();

})(window, document, User);
