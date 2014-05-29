(function (win, doc, io) {
  'use strict';

  var socket = io.connect();

  var Dashboard = (function () {

    var exports = {};

    exports.createDocument = function() {
      var button = doc.querySelector('[data-create="document"]');

      button.addEventListener('click', function() {
        socket.post('/document', function(response) {
          if (!response.message) {
            ga('send', 'event', 'document', 'create', response.hash);
            location.href = '/' + response.hash;
          }
        });
      });

    };

    exports.rowClickable = function() {
      var rows = doc.querySelectorAll('tr[data-url]');

      var onClick = function() {
        location.href = this.getAttribute('data-url');
      };

      for (var i = 0, length = rows.length; i < length; i++) {
        rows[i].addEventListener('click', onClick);
      }
    };

    exports.modal = {
      init: function() {
        this.assembly();
        this.open();
        this.innerClick();

        this.close(doc.querySelector('#modal'));
        this.close(doc.querySelector('#social'));

        this.esc();
        this.onSubmit();
      },

      innerClick: function() {
        var inner = doc.querySelectorAll('.modal-inner')

        for (var i = 0, length = inner.length; i < length; i++) {
          inner[i].addEventListener('click', function(e){e.stopPropagation()});
        }
      },

      onSubmit: function() {
        var submit = doc.querySelector('.submit-button');

        submit.addEventListener('click', function(event) {
          event.preventDefault();

          var hash = this.getAttribute('data-hash');

          socket.delete('/document/' + hash, function(response) {
            if (!response.message) {
              ga('send', 'event', 'document', 'destroy', hash);
              doc.querySelector('.modal-close').click();

              // TODO
              setTimeout(function(){
                location.reload();
              }, 700);
            }
          });
        });
      },

      assembly: function() {
        var submit = doc.querySelector('.submit-button');

        submit.title = "Remove";
        submit.innerText = "REMOVE";
      },

      open: function() {
        var remove, modal, share, social;

        remove = doc.querySelectorAll('.document-remove a');
        modal = doc.querySelector('#modal');
        share = doc.querySelectorAll('.document-share a');
        social = doc.querySelector('#social');

        var onClick = function(event) {
          event.preventDefault();
          event.stopPropagation();

          var row, title, text, submit, data;

          row = this.parentNode.parentNode;
          title = modal.querySelector('.modal-title');
          text = modal.querySelector('.modal-text');
          submit = modal.querySelector('.submit-button');

          data = {
            title: row.title,
            url: row.getAttribute('data-url'),
            hash: row.getAttribute('data-hash')
          };

          title.innerText = 'Remove "' + data.title + '"';
          text.innerHTML = 'You really want to remove the document <a class="remove" href="' + data.url + '" target="_blank" title="' + data.title + '"><strong>' + data.title + '</strong></a>?';
          submit.setAttribute('data-hash', data.hash);

          modal.style.visibility = 'visible';
          modal.style.opacity = 1;
        };

        var onClickSocial = function(event) {
          event.preventDefault();
          event.stopPropagation();

          var row, text, input, url, facebook, googleplus, twitter, data;

          row = this.parentNode.parentNode;
          text = social.querySelector('.modal-text');
          input = social.querySelector('input');
          facebook = social.querySelector('.modal-social-facebook a');
          googleplus = social.querySelector('.modal-social-googleplus a');
          twitter = social.querySelector('.modal-social-twitter a');

          data = {
            title: row.title,
            url: row.getAttribute('data-url'),
            hash: row.getAttribute('data-hash')
          };

          url = location.origin + data.url;
          text.innerHTML = data.title;
          input.value = url + "?utm_source=share&utm_medium=social&utm_content=" + data.hash + "&utm_campaign=folhas";

          facebook.href = facebook.getAttribute('data-href') + encodeURIComponent(url + "?utm_source=facebook&utm_medium=social&utm_content=" + data.hash + "&utm_campaign=folhas") ;
          googleplus.href = googleplus.getAttribute('data-href') + encodeURIComponent(url + "?utm_source=googleplus&utm_medium=social&utm_content=" + data.hash + "&utm_campaign=folhas") ;
          twitter.href = twitter.getAttribute('data-href') + encodeURIComponent(url + "?utm_source=twitter&utm_medium=social&utm_content=" + data.hash + "&utm_campaign=folhas") ;

          facebook.setAttribute('data-hash', data.hash);
          googleplus.setAttribute('data-hash', data.hash);
          twitter.setAttribute('data-hash', data.hash);

          social.style.visibility = 'visible';
          social.style.opacity = 1;
        }

        for (var i = 0, length = remove.length; i < length; i++) {
            remove[i].addEventListener('click', onClick);
        }

        for (var i = 0, length = share.length; i < length; i++) {
            share[i].addEventListener('click', onClickSocial);
        }
      },

      close: function(modal) {
        var modal, close, cancel, layer;

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
              var close = doc.querySelectorAll('.modal-close');

              for (var i = 0, length = close.length; i < length; i++) {
                close[i].click();
              }
            }
        };
      }
    };

    exports.analytics = function () {
      doc.querySelector('.header-social-facebook a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'facebook');
      });

      doc.querySelector('.header-social-googleplus a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'googleplus');
      });

      doc.querySelector('.header-social-twitter a').addEventListener('click', function() {
        ga('send', 'event', 'social', 'click', 'twitter');
      });

      // social
      doc.querySelector('.modal-social-facebook a').addEventListener('click', function() {
        ga('send', 'event', 'share', 'facebook', this.getAttribute('data-hash'));
      });

      doc.querySelector('.modal-social-googleplus a').addEventListener('click', function() {
        ga('send', 'event', 'share', 'googleplus', this.getAttribute('data-hash'));
      });

      doc.querySelector('.modal-social-twitter a').addEventListener('click', function() {
        ga('send', 'event', 'share', 'twitter', this.getAttribute('data-hash'));
      });

      doc.querySelector('.information-project a[itemprop]').addEventListener('click', function() {
        ga('send', 'event', 'github', 'click', 'folhas');
      });

      doc.querySelector('.information-project a:not([itemprop])').addEventListener('click', function() {
        ga('send', 'event', 'github', 'click', 'license');
      });
    };

    return exports;
  })();

  Dashboard.createDocument();
  Dashboard.rowClickable();
  Dashboard.modal.init();
  Dashboard.analytics();

})(window, document, window.io);
