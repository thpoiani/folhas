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

    return exports;
  })();

  Dashboard.createDocument();

})(window, document);
