(function (win, doc) {
  'use strict';

  var Dashboard = (function () {

    var exports = {};

    exports.createDocument = function() {
      var button = doc.querySelector('[data-create="document"]');

      button.addEventListener('click', function() {
        socket.post('/document', function(response) {
          if (response.success) {
            location.href = '/' + response.document.hash;
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
        this.open();
        this.close();
      },

      open: function() {
        var remove, modal;

        remove = document.querySelectorAll('.document-remove a');
        modal = document.querySelector('.modal');

        var onClick = function(event) {
          event.preventDefault();
          event.stopPropagation();

          var row, title, text, data;

          row = this.parentNode.parentNode;
          title = modal.querySelector('.modal-title');
          text = modal.querySelector('.modal-text');
          data = {
            title: row.title,
            url: row.getAttribute('data-url')
          };

          title.innerText = 'Remove "' + data.title + '"';
          text.innerHTML = 'You really want to remove the document <a class="remove" href="' + data.url + '" target="_blank" title="' + data.title + '"><strong>' + data.title + '</strong></a>?';

          modal.style.visibility = 'visible';
          modal.style.opacity = 1;
        };

        for (var i = 0, length = remove.length; i < length; i++) {
            remove[i].addEventListener('click', onClick);
        }
      },

      close: function() {
        var modal, close, cancel;

        modal = document.querySelector('.modal');
        close = modal.querySelector('.modal-close');
        cancel = modal.querySelector('.cancel-button');

        var closeModal = function(event) {
          event.preventDefault();
          event.stopPropagation();

          modal.style.visibility = 'hidden';
          modal.style.opacity = 0;
        };

        close.addEventListener('click', closeModal);
        cancel.addEventListener('click', closeModal);
      }
    };

    return exports;
  })();

  Dashboard.createDocument();
  Dashboard.rowClickable();
  Dashboard.modal.init();

})(window, document);
