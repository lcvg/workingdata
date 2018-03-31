(function () {
var print = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('mcePrint', function () {
      editor.getWin().print();
    });
  };
  var $_adzc1viejfeu9jdt = { register: register };

  var register$1 = function (editor) {
    editor.addButton('print', {
      title: 'Print',
      cmd: 'mcePrint'
    });
    editor.addMenuItem('print', {
      text: 'Print',
      cmd: 'mcePrint',
      icon: 'print'
    });
  };
  var $_1vp89fifjfeu9jdw = { register: register$1 };

  global.add('print', function (editor) {
    $_adzc1viejfeu9jdt.register(editor);
    $_1vp89fifjfeu9jdw.register(editor);
    editor.addShortcut('Meta+P', '', 'mcePrint');
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
