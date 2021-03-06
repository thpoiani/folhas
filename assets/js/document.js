(function (win, doc, Ace, io) {
  'use strict';

  var socket = io.connect();

  var Documento = (function () {

    var exports = {},
        instance = null,
        element = doc.getElementById('editor'),
        theme = 'ace/theme/chrome',
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
        element.style.fontSize = '16px';

        editor.getSession().setUseWrapMode(true);
        editor.getSession().setUseSoftTabs(true);
        editor.focus();

        disableKeyBindings(editor);
        instance = editor;
      },

      onChange: function() {
        var title = doc.querySelector('.document-title');

        var changeEvent = function(event) {
          setTimeout(function() {
            if (instance.getValue() !== text || event.target) {
              var data = {
                hash: hash,
                cursor: instance.getCursorPosition(),
                text: instance.getValue(),
                title: title.innerText
              };

              socket.put('/document/' + hash, data);
            }
          }, 0);
        };

        text = instance.getValue();
        title = doc.querySelector('.document-title');

        title.addEventListener('input', changeEvent);
        instance.getSession().on('change', changeEvent);
      }
    }

    exports.socket = {
      connect: function() {
        socket.on('connect', function() {
          socket.get('/document/connect/' + hash);
        });
      },

      change: function() {
        var title = doc.querySelector('.document-title');

        socket.on('change', function(response) {
          text = response.text;
          title.innerText = response.title;
          instance.setValue(response.text, 1);
          instance.navigateTo(response.cursor.row, response.cursor.column);
        });
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

  Documento.socket.connect();
  Documento.ace.initialize();
  Documento.ace.onChange();
  Documento.socket.change();
  Documento.analytics();

})(window, document, ace, window.io);
