(function (win, doc, Ace) {
  'use strict';

  var Documento = (function () {

    var exports = {},
        instance = null,
        element = doc.getElementById('editor'),
        theme = 'ace/theme/solarized_light',
        hash = location.pathname.split('/').pop(),
        text;

    var disableKeyBindings = function(editor) {
      editor.commands.removeCommands([
        'showSettingsMenu', 'goToNextError', 'goToPreviousError',
        'centerselection', 'gotoline', 'fold', 'unfold', 'toggleFoldWidget',
        'toggleParentFoldWidget', 'foldall', 'foldOther', 'unfoldall',
        'findnext', 'findprevious', 'selectOrFindNext', 'selectOrFindPrevious',
        'find', 'togglerecording', 'replaymacro', 'jumptomatching',
        'selecttomatching', 'removeline', 'duplicateSelection', 'sortlines',
        'togglecomment', 'toggleBlockComment', 'modifyNumberUp',
        'modifyNumberDown', 'replace', 'copylinesup', 'movelinesup',
        'copylinesdown', 'movelinesdown', 'blockoutdent', 'blockindent',
        'splitline', 'transposeletters', 'touppercase', 'tolowercase'
      ]);
    };

    exports.ace = {
      initialize: function() {
        var editor = Ace.edit(element);

        editor.setTheme(theme);

        editor.getSession().setUseWrapMode(true);
        editor.getSession().setUseSoftTabs(true);
        editor.focus();

        disableKeyBindings(editor);
        instance = editor;
      },

      onChange: function() {
        text = instance.getValue();

        instance.getSession().on('change', function(e) {
          setTimeout(function(){
            if (instance.getValue() !== text) {
              socket.get('/document/change', {
                hash: hash, 
                cursor: instance.getCursorPosition(),
                text: instance.getValue()
              });
            }
          }, 0);
        });
      }
    }

    exports.socket = {
      connect: function() {
        socket.on('connect', function() {
          socket.get('/document/connect', {hash: hash});
        });
      },

      change: function() {
        socket.on('change', function(response) {
          text = response.text;
          instance.setValue(response.text, 1);
          instance.navigateTo(response.cursor.row, response.cursor.column);
        });
      }
    };

    return exports;
  })();

  Documento.socket.connect();
  Documento.ace.initialize();
  Documento.ace.onChange();
  Documento.socket.change();

})(window, document, ace);