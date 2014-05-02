(function (win, doc, Ace) {
  'use strict';

  var Home   = (function () {

    var exports = {},
      instance = null,
      element = doc.getElementById('editor'),
      theme = 'ace/theme/chrome';

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
        element.style.fontSize = '16px';

        editor.getSession().setUseWrapMode(true);
        editor.getSession().setUseSoftTabs(true);
        editor.focus();

        disableKeyBindings(editor);
        instance = editor;
      }
    };

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

//  Home.createDocument();
  Home.ace.initialize();

})(window, document, ace);
