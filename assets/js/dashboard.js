(function (win, doc, socket) {
  'use strict';

  var Dashboard = (function () {

    var exports = {};

    exports.createDocument = function() {
      var button = doc.querySelector('[data-create="document"]');

      button.addEventListener('click', function() {
        socket.post('/document', function(response) {
          if (!response.message) {
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
        this.close();
        this.esc();
        this.onSubmit();
        document.querySelector('.modal-inner').addEventListener('click', function(e){e.stopPropagation()});
      },

      onSubmit: function() {
        var submit = doc.querySelector('.submit-button');

        submit.addEventListener('click', function(event) {
          event.preventDefault();

          var hash = this.getAttribute('data-hash');

          socket.delete('/document/' + hash, function(response) {
            if (!response.message) {
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
        var submit = document.querySelector('.submit-button');

        submit.title = "Remove";
        submit.innerText = "REMOVE";
      },

      open: function() {
        var remove, modal;

        remove = document.querySelectorAll('.document-remove a');
        modal = document.querySelector('.modal');

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

        for (var i = 0, length = remove.length; i < length; i++) {
            remove[i].addEventListener('click', onClick);
        }
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

    return exports;
  })();

  Dashboard.createDocument();
  Dashboard.rowClickable();
  Dashboard.modal.init();

})(window, document, socket);
