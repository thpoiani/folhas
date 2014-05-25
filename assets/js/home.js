(function (win, doc, Ace, io) {
  'use strict';

  var socket = io.connect();

  var Home = (function () {

    var exports = {},
        instance = null,
        element = doc.getElementById('editor'),
        theme = 'ace/theme/chrome',
        hash = "POIANI",
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

    exports.animation = {
      header: function () {
        var header = doc.querySelector('header'),
            headerMenu = doc.querySelector('.header-menu'),
            menu = doc.querySelector('.menu'),
            technologies = doc.querySelector('.technologies');

        win.onscroll = function() {
          var headerMenuHeight = headerMenu.offsetHeight + headerMenu.offsetTop;
          var height = headerMenuHeight + win.scrollY - technologies.offsetTop;

          (height > 0)
            ? menu.style.height = height + 'px'
            : menu.style.height = 0;

          (win.scrollY >= technologies.offsetTop)
            ? header.style.backgroundColor = "white"
            : header.style.backgroundColor = "";
        };
      },

      menu: function() {
        var menu = doc.querySelector('.header-navigation-menu');

        menu.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();

          var isClosed = this.parentElement.className.indexOf('close') > 0;

          this.parentElement.className = (isClosed)
          ? this.parentElement.className.replace('close', 'open')
          : this.parentElement.className.replace('open', 'close');
        });
      }

    };

    exports.ace = {
      initialize: function() {
        var editor = Ace.edit(element);

        editor.setTheme(theme);
        element.style.fontSize = '16px';

        editor.getSession().setUseWrapMode(true);
        editor.getSession().setUseSoftTabs(true);

        disableKeyBindings(editor);
        instance = editor;
      },

      onChange: function() {
        var changeEvent = function(event) {
          setTimeout(function() {
            if (instance.getValue() !== text) {
              var data = {
                hash: hash,
                cursor: instance.getCursorPosition(),
                text: instance.getValue()
              };

              socket.put('/document/' + hash, data);
            }
          }, 0);
        };

        text = instance.getValue();
        instance.getSession().on('change', changeEvent);
      },

      resize: function() {
        var html= doc.getElementsByTagName('html')[0],
            documentEditor = doc.getElementsByClassName('document-editor')[0];

        if (html.className === 'phone') {
          element.style.width = documentEditor.style.width = '300px';
        } else {
          win.onresize = function() {
            (win.innerWidth <= 600)
              ? element.style.width = documentEditor.style.width = '300px'
              : element.style.width = documentEditor.style.width = '';
          }
        }

      }
    };

    exports.socket = {
      connect: function() {
        socket.on('connect', function() {
          socket.get('/document/connect/' + hash);
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

      // access
      doc.querySelector('.authentication-enter a').addEventListener('click', function() {
        ga('send', 'event', 'access', 'click', 'enter');
      });

      doc.querySelector('.authentication-join a').addEventListener('click', function() {
        ga('send', 'event', 'access', 'click', 'join');
      });

      // github
      doc.querySelector('.information-author a').addEventListener('click', function() {
        ga('send', 'event', 'github', 'click', 'poiani');
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

  Home.analytics();
  Home.animation.header();
  Home.animation.menu();
  Home.socket.connect();
  Home.ace.initialize();
  Home.ace.resize();
  Home.ace.onChange();
  Home.socket.change();

})(window, document, ace, window.io);
