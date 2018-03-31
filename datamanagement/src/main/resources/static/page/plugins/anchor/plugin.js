(function () {
var anchor = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var isValidId = function (id) {
    return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
  };
  var getId = function (editor) {
    var selectedNode = editor.selection.getNode();
    var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
    return isAnchor ? selectedNode.id || selectedNode.name : '';
  };
  var insert = function (editor, id) {
    var selectedNode = editor.selection.getNode();
    var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
    if (isAnchor) {
      selectedNode.removeAttribute('name');
      selectedNode.id = id;
    } else {
      editor.focus();
      editor.selection.collapse(true);
      editor.execCommand('mceInsertContent', false, editor.dom.createHTML('a', { id: id }));
    }
  };
  var $_5hdh0k7zjfeu9hoe = {
    isValidId: isValidId,
    getId: getId,
    insert: insert
  };

  var insertAnchor = function (editor, newId) {
    if (!$_5hdh0k7zjfeu9hoe.isValidId(newId)) {
      editor.windowManager.alert('Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
      return true;
    } else {
      $_5hdh0k7zjfeu9hoe.insert(editor, newId);
      return false;
    }
  };
  var open = function (editor) {
    var currentId = $_5hdh0k7zjfeu9hoe.getId(editor);
    editor.windowManager.open({
      title: 'Anchor',
      body: {
        type: 'textbox',
        name: 'id',
        size: 40,
        label: 'Id',
        value: currentId
      },
      onsubmit: function (e) {
        var newId = e.data.id;
        if (insertAnchor(editor, newId)) {
          e.preventDefault();
        }
      }
    });
  };
  var $_crtia37yjfeu9hoc = { open: open };

  var register = function (editor) {
    editor.addCommand('mceAnchor', function () {
      $_crtia37yjfeu9hoc.open(editor);
    });
  };
  var $_er6rf37xjfeu9ho9 = { register: register };

  var isAnchorNode = function (node) {
    return !node.attr('href') && (node.attr('id') || node.attr('name')) && !node.firstChild;
  };
  var setContentEditable = function (state) {
    return function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        if (isAnchorNode(nodes[i])) {
          nodes[i].attr('contenteditable', state);
        }
      }
    };
  };
  var setup = function (editor) {
    editor.on('PreInit', function () {
      editor.parser.addNodeFilter('a', setContentEditable('false'));
      editor.serializer.addNodeFilter('a', setContentEditable(null));
    });
  };
  var $_6fl5ou80jfeu9hog = { setup: setup };

  var register$1 = function (editor) {
    editor.addButton('anchor', {
      icon: 'anchor',
      tooltip: 'Anchor',
      cmd: 'mceAnchor',
      stateSelector: 'a:not([href])'
    });
    editor.addMenuItem('anchor', {
      icon: 'anchor',
      text: 'Anchor',
      context: 'insert',
      cmd: 'mceAnchor'
    });
  };
  var $_2y776m81jfeu9hoi = { register: register$1 };

  global.add('anchor', function (editor) {
    $_6fl5ou80jfeu9hog.setup(editor);
    $_er6rf37xjfeu9ho9.register(editor);
    $_2y776m81jfeu9hoi.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
