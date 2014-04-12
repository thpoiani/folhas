(function (win, doc, User) {
  'use strict';

  var Enter = (function () {

    var exports = {};

    var input = {
      email: doc.querySelector('input[name=email]'),
      password: doc.querySelector('input[name=password]'),
      persist: doc.querySelector('input[name=persist]')
    };

    var assemblyUser = function () {
      var email, password, persist;

      email = input.email.value.trim();
      password = input.password.value;
      persist = input.persist.checked;

      return new User(null, email, password, persist);
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

        if (user.isValid('email') && user.isValid('password')) {
          socket.post(location.href, {user: user}, function (response) {
            console.log(response);
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
