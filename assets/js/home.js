(function (win, doc) {
  'use strict';

  var Home   = (function () {

    var exports = {};

    exports.createDocument = function() {
      var button = doc.querySelector('[data-create="document"]');

      button.addEventListener('click', function() {
        socket.post('/document', function(response) {
          console.log(response);
          if (response.success) {
            location.href = '/' + response.document.hash;
          }
        });
      });

    };

    return exports;
  })();

  Home.createDocument();

})(window, document);
