(function (win, doc, User) {

  var Join = (function () {

    var exports = {};

    var input = {
      name: doc.querySelector('input[name=name]'),
      email: doc.querySelector('input[name=email]'),
      password: doc.querySelector('input[name=password]')
    };

    var assemblyUser = function () {
      var name, email, password;

      name = input.name.value.trim();
      email = input.email.value.trim();
      password = input.password.value;

      return new User(name, email, password);
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

        if (user.isValid()) {
          socket.post(location.href, {user: user}, function (response) {
            console.log(response);

            if (response.success) {
              location.href = '/me';
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

  Join.form();

})(window, document, User);
