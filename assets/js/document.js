(function (win, doc, Ace) {
  'use strict';

  var Documento = (function () {

    var exports = {},
        instance = null,
        element = doc.getElementById('editor'),
        theme = 'ace/theme/solarized_light';

    exports.instanceAce = function() {
      var editor = Ace.edit(element);

      editor.setTheme(theme);

      editor.getSession().setUseWrapMode(true);
      editor.getSession().setUseSoftTabs(true);

      instance = editor;
    };

    return exports;
  })();

  Documento.instanceAce();

})(window, document, ace);
