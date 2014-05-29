(function (win, doc, io) {
  'use strict';

  var socket = io.connect();

  var Profile = (function () {

    var exports = {};

    var getUser = function (form) {
      var user = {},
          inputs = form.querySelectorAll('input[name^=user]');

      for (var i = inputs.length - 1; i >= 0; i--) {
        var name, attr;

        name = inputs[i].name;
        attr = name.substring(name.lastIndexOf('[') + 1, name.lastIndexOf(']'));

        user[attr] = inputs[i].value;
      }

      return user;
    };

    exports.form = function () {
      var submit = function (event) {
        event.preventDefault();

        var form = event.srcElement,
            action = form.action,
            email = form.querySelector('[name=email]').value;

        socket.put(action + '/' + email, {user: getUser(form), form: form.id}, function (response) {
          // TODO validação
          console.log(response);
        });
      }

      var puts = doc.querySelectorAll('form [value=put]');

      for (var i = puts.length - 1; i >= 0; i--) {
        var form = puts[i].parentElement;
        form.addEventListener('submit', submit);
      }
    };

    exports.modal = {
      init: function() {
        this.assembly();
        this.open();
        this.close();
        this.esc();
        this.onSubmit();
        document.querySelector('.modal-inner').addEventListener('click', function(e){e.stopPropagation()});
      },

      onSubmit: function() {
        var submit = doc.querySelector('.submit-button');

        submit.addEventListener('click', function(event) {
          event.preventDefault();

          var form = doc.querySelector('#delete'),
              email = this.getAttribute('data-email');

          socket.delete('/user/' + email , {user: getUser(form)}, function (response) {
            if (response.success) {
              doc.querySelector('.modal-close').click();

              // TODO
              setTimeout(function(){
                location.href = '/';

              }, 700);
            } else {
              // TODO
            }
          });
        });
      },

      assembly: function() {
        var submit = document.querySelector('.submit-button');

        submit.title = "Remove";
        submit.innerText = "REMOVE";
      },

      open: function() {
        var remove, modal;

        remove = document.querySelector('.delete');
        modal = document.querySelector('.modal');

        var onClick = function(event) {
          event.preventDefault();
          event.stopPropagation();

          var name, title, text, submit, data;

          name = doc.querySelector('.profile-dashboard strong').innerText;
          title = modal.querySelector('.modal-title');
          text = modal.querySelector('.modal-text');
          submit = modal.querySelector('.submit-button');

          data = {
            title: name,
            email: doc.querySelector('#delete [name=email]').value
          };

          title.innerText = 'Remove "' + data.title + '"';
          text.innerHTML = 'You really want to remove your account??';
          submit.setAttribute('data-email', data.email);

          modal.style.visibility = 'visible';
          modal.style.opacity = 1;
        };

        remove.addEventListener('click', onClick);
      },

      close: function() {
        var modal, close, cancel, layer;

        modal = doc.querySelector('.modal');
        close = modal.querySelector('.modal-close');
        cancel = modal.querySelector('.cancel-button');
        layer = modal.querySelector('.modal-window');

        var closeModal = function(event) {
          event.preventDefault();
          event.stopPropagation();

          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
        };

        close.addEventListener('click', closeModal);
        cancel.addEventListener('click', closeModal);
        layer.addEventListener('click', closeModal);
      },

      esc: function() {
        doc.onkeydown = function(event) {
            event = event || window.event;
            if (event.keyCode == 27) {
              doc.querySelector('.modal-close').click();
            }
        };
      }
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

  Profile.form();
  Profile.modal.init();
  Profile.analytics();

})(window, document, window.io);
