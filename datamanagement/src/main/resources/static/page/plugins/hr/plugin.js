(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_bau991bujfeu9iak = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_82a7xcbvjfeu9iam = { register: register$1 };

  global.add('hr', function (editor) {
    $_bau991bujfeu9iak.register(editor);
    $_82a7xcbvjfeu9iam.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
