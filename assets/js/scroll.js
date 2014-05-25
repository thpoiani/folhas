(function(w, d) {
  var position, Scroll;

  position = {
    25: false,
    50: false,
    75: false,
    100: false
  };

  Scroll = (function() {
    var exports = {};

    var getDocumentHeight = function() {
      return Math.max(
        d.body.scrollHeight, d.documentElement.scrollHeight,
        d.body.offsetHeight, d.documentElement.offsetHeight,
        d.body.clientHeight, d.documentElement.clientHeight
      );
    };

    var getClientHeight = function() {
      return w.scrollY + d.documentElement.clientHeight;
    };

    exports.getPercentageOfScreenViewByClient = function() {
      var view = (getDocumentHeight() - getClientHeight()) / getDocumentHeight();
      return 100 - (100 * view);
    }

    return exports;
  })();

  w.addEventListener('scroll', function() {
    for (property in position) {
      var percent = parseInt(property);

      if (!position[property] && Scroll.getPercentageOfScreenViewByClient() >= percent) {
        position[property] = true;
        ga('send', 'event', 'view', 'scroll', 'percentage', percent);
      }
    }
  });

})(window, document);