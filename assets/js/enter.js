(function (win, doc, $) {
  'use strict';

  function User(email, password, persist) {
    this.email = email;
    this.password = password;
    this.persist = persist;
    this._isValid = true;
    this._errors = [];
  }

  User.prototype.isValid = function (field) {
    this._validate(field);

    return this._isValid;
  };

  User.prototype.getErrors = function () {
    return this._errors;
  };

  User.prototype._validate = function (field) {
    var email = this.email,
        password = this.password;

    switch (field) {
      case 'email' :
        this._validateEmail(email);
        break;

      case 'password':
        this._validatePassword(password);
        break;

      default:
        this._validateEmail(email);
        this._validatePassword(password);
    }

    return this._isValid;
  };

  User.prototype._validateEmail = function (value) {
    value = value || '';

    /**
     * badsyntax / email_validation.js
     * https://gist.github.com/badsyntax/719800
     */
    function isEmail(email) {
      return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
    }

    if (!value.length || value.length > 254 || !isEmail(value)) {
      this._isValid = false;
      this._errors.push('email');
    }
  };

  User.prototype._validatePassword = function (value) {
    value = value || '';

    if (!value.length || value.length < 4) {
      this._isValid = false;
      this._errors.push('password');
    }
  };


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

      return new User(email, password, persist);
    };

    var validateUser = function (user) {
      $.each(user.getErrors(), function (index, error) {
        input[error].className = 'error';
      });
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

          if (user.persist) {
            // TODO PERSIST
          }

          $.post(form.action, user, function(response) {
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

})(window, document, jQuery);
