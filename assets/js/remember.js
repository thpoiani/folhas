(function (win, doc, io) {
  'use strict';

  var socket = io.connect();

  var Remember = (function () {

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

      socket.post('/user/validate', { user: getUser(event.target) }, function (response) {
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

        var data = {
          user: getUser()
        };

        socket.post(event.target.action + '/' + data.user.email, data, function(response) {
          console.log(response);

          // if (!response) location.href = '/dashboard';

          // removeError();
          // addError(response);
        });
      };
    };

    exports.analytics = function() {
      // social
      doc.querySelector('.header-social-facebook a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'facebook');
      });

      doc.querySelector('.header-social-googleplus a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'googleplus');
      });

      doc.querySelector('.header-social-twitter a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'twitter');
      });

      doc.querySelector('.information-project a[itemprop]').addEventListener('click', function() {
        ga('send', 'event', 'github', 'click', 'folhas');
      });

      doc.querySelector('.information-project a:not([itemprop])').addEventListener('click', function() {
        ga('send', 'event', 'github', 'click', 'license');
      });
    }

    return exports;
  })();

  Remember.validateOnBlur();
  Remember.requestOnSubmit();
  Remember.analytics();

})(window, document, window.io);
