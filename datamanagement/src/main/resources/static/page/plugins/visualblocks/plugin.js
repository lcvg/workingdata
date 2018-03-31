(function () {
var visualblocks = (function () {
  'use strict';

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var fireVisualBlocks = function (editor, state) {
    editor.fire('VisualBlocks', { state: state });
  };
  var $_3ny3tlr8jfeu9ltn = { fireVisualBlocks: fireVisualBlocks };

  var isEnabledByDefault = function (editor) {
    return editor.getParam('visualblocks_default_state', false);
  };
  var getContentCss = function (editor) {
    return editor.settings.visualblocks_content_css;
  };
  var $_cgl33rr9jfeu9lto = {
    isEnabledByDefault: isEnabledByDefault,
    getContentCss: getContentCss
  };

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var cssId = global$1.DOM.uniqueId();
  var load = function (doc, url) {
    var linkElements = global$2.toArray(doc.getElementsByTagName('link'));
    var matchingLinkElms = global$2.grep(linkElements, function (head) {
      return head.id === cssId;
    });
    if (matchingLinkElms.length === 0) {
      var linkElm = global$1.DOM.create('link', {
        id: cssId,
        rel: 'stylesheet',
        href: url
      });
      doc.getElementsByTagName('head')[0].appendChild(linkElm);
    }
  };
  var $_2h3mf1rajfeu9ltq = { load: load };

  var toggleVisualBlocks = function (editor, pluginUrl, enabledState) {
    var dom = editor.dom;
    var contentCss = $_cgl33rr9jfeu9lto.getContentCss(editor);
    $_2h3mf1rajfeu9ltq.load(editor.getDoc(), contentCss ? contentCss : pluginUrl + '/css/visualblocks.css');
    dom.toggleClass(editor.getBody(), 'mce-visualblocks');
    enabledState.set(!enabledState.get());
    $_3ny3tlr8jfeu9ltn.fireVisualBlocks(editor, enabledState.get());
  };
  var $_8oytcpr7jfeu9ltk = { toggleVisualBlocks: toggleVisualBlocks };

  var register = function (editor, pluginUrl, enabledState) {
    editor.addCommand('mceVisualBlocks', function () {
      $_8oytcpr7jfeu9ltk.toggleVisualBlocks(editor, pluginUrl, enabledState);
    });
  };
  var $_8iecuer6jfeu9ltj = { register: register };

  var setup = function (editor, pluginUrl, enabledState) {
    editor.on('PreviewFormats AfterPreviewFormats', function (e) {
      if (enabledState.get()) {
        editor.dom.toggleClass(editor.getBody(), 'mce-visualblocks', e.type === 'afterpreviewformats');
      }
    });
    editor.on('init', function () {
      if ($_cgl33rr9jfeu9lto.isEnabledByDefault(editor)) {
        $_8oytcpr7jfeu9ltk.toggleVisualBlocks(editor, pluginUrl, enabledState);
      }
    });
    editor.on('remove', function () {
      editor.dom.removeClass(editor.getBody(), 'mce-visualblocks');
    });
  };
  var $_7g9c0crdjfeu9ltt = { setup: setup };

  var toggleActiveState = function (editor, enabledState) {
    return function (e) {
      var ctrl = e.control;
      ctrl.active(enabledState.get());
      editor.on('VisualBlocks', function (e) {
        ctrl.active(e.state);
      });
    };
  };
  var register$1 = function (editor, enabledState) {
    editor.addButton('visualblocks', {
      active: false,
      title: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState)
    });
    editor.addMenuItem('visualblocks', {
      text: 'Show blocks',
      cmd: 'mceVisualBlocks',
      onPostRender: toggleActiveState(editor, enabledState),
      selectable: true,
      context: 'view',
      prependToContext: true
    });
  };
  var $_7dinerejfeu9ltv = { register: register$1 };

  global.add('visualblocks', function (editor, pluginUrl) {
    var enabledState = Cell(false);
    $_8iecuer6jfeu9ltj.register(editor, pluginUrl, enabledState);
    $_7dinerejfeu9ltv.register(editor, enabledState);
    $_7g9c0crdjfeu9ltt.setup(editor, pluginUrl, enabledState);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
