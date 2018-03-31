(function () {
var code = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(global$1.DOM.getViewPort().h - 200, 500));
  };
  var $_f6c5s79cjfeu9hwq = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_4cz8229ejfeu9hwt = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_f6c5s79cjfeu9hwq.getMinWidth(editor);
    var minHeight = $_f6c5s79cjfeu9hwq.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_4cz8229ejfeu9hwt.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_4cz8229ejfeu9hwt.getContent(editor));
  };
  var $_fahnw29bjfeu9hwo = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_fahnw29bjfeu9hwo.open(editor);
    });
  };
  var $_5me4we9ajfeu9hwn = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_fahnw29bjfeu9hwo.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_fahnw29bjfeu9hwo.open(editor);
      }
    });
  };
  var $_3kq59f9fjfeu9hwv = { register: register$1 };

  global.add('code', function (editor) {
    $_5me4we9ajfeu9hwn.register(editor);
    $_3kq59f9fjfeu9hwv.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
