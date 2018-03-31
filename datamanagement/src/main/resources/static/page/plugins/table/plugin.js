(function () {
var table = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      x[_i] = arguments[_i];
    }
  };
  var noarg = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
  var $_8b8jopjujfeu9jnn = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

  var never$1 = $_8b8jopjujfeu9jnn.never;
  var always$1 = $_8b8jopjujfeu9jnn.always;
  var none = function () {
    return NONE;
  };
  var NONE = function () {
    var eq = function (o) {
      return o.isNone();
    };
    var call = function (thunk) {
      return thunk();
    };
    var id = function (n) {
      return n;
    };
    var noop = function () {
    };
    var me = {
      fold: function (n, s) {
        return n();
      },
      is: never$1,
      isSome: never$1,
      isNone: always$1,
      getOr: id,
      getOrThunk: call,
      getOrDie: function (msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      or: id,
      orThunk: call,
      map: none,
      ap: none,
      each: noop,
      bind: none,
      flatten: none,
      exists: never$1,
      forall: always$1,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray: function () {
        return [];
      },
      toString: $_8b8jopjujfeu9jnn.constant('none()')
    };
    if (Object.freeze)
      Object.freeze(me);
    return me;
  }();
  var some = function (a) {
    var constant_a = function () {
      return a;
    };
    var self = function () {
      return me;
    };
    var map = function (f) {
      return some(f(a));
    };
    var bind = function (f) {
      return f(a);
    };
    var me = {
      fold: function (n, s) {
        return s(a);
      },
      is: function (v) {
        return a === v;
      },
      isSome: always$1,
      isNone: never$1,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      or: self,
      orThunk: self,
      map: map,
      ap: function (optfab) {
        return optfab.fold(none, function (fab) {
          return some(fab(a));
        });
      },
      each: function (f) {
        f(a);
      },
      bind: bind,
      flatten: constant_a,
      exists: bind,
      forall: bind,
      filter: function (f) {
        return f(a) ? me : NONE;
      },
      equals: function (o) {
        return o.is(a);
      },
      equals_: function (o, elementEq) {
        return o.fold(never$1, function (b) {
          return elementEq(a, b);
        });
      },
      toArray: function () {
        return [a];
      },
      toString: function () {
        return 'some(' + a + ')';
      }
    };
    return me;
  };
  var from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  var Option = {
    some: some,
    none: none,
    from: from
  };

  var rawIndexOf = function () {
    var pIndexOf = Array.prototype.indexOf;
    var fastIndex = function (xs, x) {
      return pIndexOf.call(xs, x);
    };
    var slowIndex = function (xs, x) {
      return slowIndexOf(xs, x);
    };
    return pIndexOf === undefined ? slowIndex : fastIndex;
  }();
  var indexOf = function (xs, x) {
    var r = rawIndexOf(xs, x);
    return r === -1 ? Option.none() : Option.some(r);
  };
  var contains = function (xs, x) {
    return rawIndexOf(xs, x) > -1;
  };
  var exists = function (xs, pred) {
    return findIndex(xs, pred).isSome();
  };
  var range = function (num, f) {
    var r = [];
    for (var i = 0; i < num; i++) {
      r.push(f(i));
    }
    return r;
  };
  var chunk = function (array, size) {
    var r = [];
    for (var i = 0; i < array.length; i += size) {
      var s = array.slice(i, i + size);
      r.push(s);
    }
    return r;
  };
  var map = function (xs, f) {
    var len = xs.length;
    var r = new Array(len);
    for (var i = 0; i < len; i++) {
      var x = xs[i];
      r[i] = f(x, i, xs);
    }
    return r;
  };
  var each = function (xs, f) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var eachr = function (xs, f) {
    for (var i = xs.length - 1; i >= 0; i--) {
      var x = xs[i];
      f(x, i, xs);
    }
  };
  var partition = function (xs, pred) {
    var pass = [];
    var fail = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      var arr = pred(x, i, xs) ? pass : fail;
      arr.push(x);
    }
    return {
      pass: pass,
      fail: fail
    };
  };
  var filter = function (xs, pred) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        r.push(x);
      }
    }
    return r;
  };
  var groupBy = function (xs, f) {
    if (xs.length === 0) {
      return [];
    } else {
      var wasType = f(xs[0]);
      var r = [];
      var group = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        var type = f(x);
        if (type !== wasType) {
          r.push(group);
          group = [];
        }
        wasType = type;
        group.push(x);
      }
      if (group.length !== 0) {
        r.push(group);
      }
      return r;
    }
  };
  var foldr = function (xs, f, acc) {
    eachr(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var foldl = function (xs, f, acc) {
    each(xs, function (x) {
      acc = f(acc, x);
    });
    return acc;
  };
  var find = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var findIndex = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      if (pred(x, i, xs)) {
        return Option.some(i);
      }
    }
    return Option.none();
  };
  var slowIndexOf = function (xs, x) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (xs[i] === x) {
        return i;
      }
    }
    return -1;
  };
  var push = Array.prototype.push;
  var flatten = function (xs) {
    var r = [];
    for (var i = 0, len = xs.length; i < len; ++i) {
      if (!Array.prototype.isPrototypeOf(xs[i]))
        throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
      push.apply(r, xs[i]);
    }
    return r;
  };
  var bind = function (xs, f) {
    var output = map(xs, f);
    return flatten(output);
  };
  var forall = function (xs, pred) {
    for (var i = 0, len = xs.length; i < len; ++i) {
      var x = xs[i];
      if (pred(x, i, xs) !== true) {
        return false;
      }
    }
    return true;
  };
  var equal = function (a1, a2) {
    return a1.length === a2.length && forall(a1, function (x, i) {
      return x === a2[i];
    });
  };
  var slice = Array.prototype.slice;
  var reverse = function (xs) {
    var r = slice.call(xs, 0);
    r.reverse();
    return r;
  };
  var difference = function (a1, a2) {
    return filter(a1, function (x) {
      return !contains(a2, x);
    });
  };
  var mapToObject = function (xs, f) {
    var r = {};
    for (var i = 0, len = xs.length; i < len; i++) {
      var x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  var pure = function (x) {
    return [x];
  };
  var sort = function (xs, comparator) {
    var copy = slice.call(xs, 0);
    copy.sort(comparator);
    return copy;
  };
  var head = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[0]);
  };
  var last = function (xs) {
    return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
  };
  var $_8soyqzjsjfeu9jnc = {
    map: map,
    each: each,
    eachr: eachr,
    partition: partition,
    filter: filter,
    groupBy: groupBy,
    indexOf: indexOf,
    foldr: foldr,
    foldl: foldl,
    find: find,
    findIndex: findIndex,
    flatten: flatten,
    bind: bind,
    forall: forall,
    exists: exists,
    contains: contains,
    equal: equal,
    reverse: reverse,
    chunk: chunk,
    difference: difference,
    mapToObject: mapToObject,
    pure: pure,
    sort: sort,
    range: range,
    head: head,
    last: last
  };

  var keys = function () {
    var fastKeys = Object.keys;
    var slowKeys = function (o) {
      var r = [];
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          r.push(i);
        }
      }
      return r;
    };
    return fastKeys === undefined ? slowKeys : fastKeys;
  }();
  var each$1 = function (obj, f) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      f(x, i, obj);
    }
  };
  var objectMap = function (obj, f) {
    return tupleMap(obj, function (x, i, obj) {
      return {
        k: i,
        v: f(x, i, obj)
      };
    });
  };
  var tupleMap = function (obj, f) {
    var r = {};
    each$1(obj, function (x, i) {
      var tuple = f(x, i, obj);
      r[tuple.k] = tuple.v;
    });
    return r;
  };
  var bifilter = function (obj, pred) {
    var t = {};
    var f = {};
    each$1(obj, function (x, i) {
      var branch = pred(x, i) ? t : f;
      branch[i] = x;
    });
    return {
      t: t,
      f: f
    };
  };
  var mapToArray = function (obj, f) {
    var r = [];
    each$1(obj, function (value, name) {
      r.push(f(value, name));
    });
    return r;
  };
  var find$1 = function (obj, pred) {
    var props = keys(obj);
    for (var k = 0, len = props.length; k < len; k++) {
      var i = props[k];
      var x = obj[i];
      if (pred(x, i, obj)) {
        return Option.some(x);
      }
    }
    return Option.none();
  };
  var values = function (obj) {
    return mapToArray(obj, function (v) {
      return v;
    });
  };
  var size = function (obj) {
    return values(obj).length;
  };
  var $_1iiwlojwjfeu9jou = {
    bifilter: bifilter,
    each: each$1,
    map: objectMap,
    mapToArray: mapToArray,
    tupleMap: tupleMap,
    find: find$1,
    keys: keys,
    values: values,
    size: size
  };

  function Immutable () {
    var fields = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fields[_i] = arguments[_i];
    }
    return function () {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      if (fields.length !== values.length) {
        throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
      }
      var struct = {};
      $_8soyqzjsjfeu9jnc.each(fields, function (name, i) {
        struct[name] = $_8b8jopjujfeu9jnn.constant(values[i]);
      });
      return struct;
    };
  }

  var typeOf = function (x) {
    if (x === null)
      return 'null';
    var t = typeof x;
    if (t === 'object' && Array.prototype.isPrototypeOf(x))
      return 'array';
    if (t === 'object' && String.prototype.isPrototypeOf(x))
      return 'string';
    return t;
  };
  var isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  var $_91jv01k1jfeu9jpc = {
    isString: isType('string'),
    isObject: isType('object'),
    isArray: isType('array'),
    isNull: isType('null'),
    isBoolean: isType('boolean'),
    isUndefined: isType('undefined'),
    isFunction: isType('function'),
    isNumber: isType('number')
  };

  var sort$1 = function (arr) {
    return arr.slice(0).sort();
  };
  var reqMessage = function (required, keys) {
    throw new Error('All required keys (' + sort$1(required).join(', ') + ') were not specified. Specified keys were: ' + sort$1(keys).join(', ') + '.');
  };
  var unsuppMessage = function (unsupported) {
    throw new Error('Unsupported keys for object: ' + sort$1(unsupported).join(', '));
  };
  var validateStrArr = function (label, array) {
    if (!$_91jv01k1jfeu9jpc.isArray(array))
      throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
    $_8soyqzjsjfeu9jnc.each(array, function (a) {
      if (!$_91jv01k1jfeu9jpc.isString(a))
        throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
    });
  };
  var invalidTypeMessage = function (incorrect, type) {
    throw new Error('All values need to be of type: ' + type + '. Keys (' + sort$1(incorrect).join(', ') + ') were not.');
  };
  var checkDupes = function (everything) {
    var sorted = sort$1(everything);
    var dupe = $_8soyqzjsjfeu9jnc.find(sorted, function (s, i) {
      return i < sorted.length - 1 && s === sorted[i + 1];
    });
    dupe.each(function (d) {
      throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
    });
  };
  var $_d8grzfk0jfeu9jp9 = {
    sort: sort$1,
    reqMessage: reqMessage,
    unsuppMessage: unsuppMessage,
    validateStrArr: validateStrArr,
    invalidTypeMessage: invalidTypeMessage,
    checkDupes: checkDupes
  };

  function MixedBag (required, optional) {
    var everything = required.concat(optional);
    if (everything.length === 0)
      throw new Error('You must specify at least one required or optional field.');
    $_d8grzfk0jfeu9jp9.validateStrArr('required', required);
    $_d8grzfk0jfeu9jp9.validateStrArr('optional', optional);
    $_d8grzfk0jfeu9jp9.checkDupes(everything);
    return function (obj) {
      var keys = $_1iiwlojwjfeu9jou.keys(obj);
      var allReqd = $_8soyqzjsjfeu9jnc.forall(required, function (req) {
        return $_8soyqzjsjfeu9jnc.contains(keys, req);
      });
      if (!allReqd)
        $_d8grzfk0jfeu9jp9.reqMessage(required, keys);
      var unsupported = $_8soyqzjsjfeu9jnc.filter(keys, function (key) {
        return !$_8soyqzjsjfeu9jnc.contains(everything, key);
      });
      if (unsupported.length > 0)
        $_d8grzfk0jfeu9jp9.unsuppMessage(unsupported);
      var r = {};
      $_8soyqzjsjfeu9jnc.each(required, function (req) {
        r[req] = $_8b8jopjujfeu9jnn.constant(obj[req]);
      });
      $_8soyqzjsjfeu9jnc.each(optional, function (opt) {
        r[opt] = $_8b8jopjujfeu9jnn.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
      });
      return r;
    };
  }

  var $_6s7wfojxjfeu9joz = {
    immutable: Immutable,
    immutableBag: MixedBag
  };

  var dimensions = $_6s7wfojxjfeu9joz.immutable('width', 'height');
  var grid = $_6s7wfojxjfeu9joz.immutable('rows', 'columns');
  var address = $_6s7wfojxjfeu9joz.immutable('row', 'column');
  var coords = $_6s7wfojxjfeu9joz.immutable('x', 'y');
  var detail = $_6s7wfojxjfeu9joz.immutable('element', 'rowspan', 'colspan');
  var detailnew = $_6s7wfojxjfeu9joz.immutable('element', 'rowspan', 'colspan', 'isNew');
  var extended = $_6s7wfojxjfeu9joz.immutable('element', 'rowspan', 'colspan', 'row', 'column');
  var rowdata = $_6s7wfojxjfeu9joz.immutable('element', 'cells', 'section');
  var elementnew = $_6s7wfojxjfeu9joz.immutable('element', 'isNew');
  var rowdatanew = $_6s7wfojxjfeu9joz.immutable('element', 'cells', 'section', 'isNew');
  var rowcells = $_6s7wfojxjfeu9joz.immutable('cells', 'section');
  var rowdetails = $_6s7wfojxjfeu9joz.immutable('details', 'section');
  var bounds = $_6s7wfojxjfeu9joz.immutable('startRow', 'startCol', 'finishRow', 'finishCol');
  var $_2crbd2k3jfeu9jpu = {
    dimensions: dimensions,
    grid: grid,
    address: address,
    coords: coords,
    extended: extended,
    detail: detail,
    detailnew: detailnew,
    rowdata: rowdata,
    elementnew: elementnew,
    rowdatanew: rowdatanew,
    rowcells: rowcells,
    rowdetails: rowdetails,
    bounds: bounds
  };

  var fromHtml = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    if (!div.hasChildNodes() || div.childNodes.length > 1) {
      console.error('HTML does not have a single root node', html);
      throw 'HTML must have a single root node';
    }
    return fromDom(div.childNodes[0]);
  };
  var fromTag = function (tag, scope) {
    var doc = scope || document;
    var node = doc.createElement(tag);
    return fromDom(node);
  };
  var fromText = function (text, scope) {
    var doc = scope || document;
    var node = doc.createTextNode(text);
    return fromDom(node);
  };
  var fromDom = function (node) {
    if (node === null || node === undefined)
      throw new Error('Node cannot be null or undefined');
    return { dom: $_8b8jopjujfeu9jnn.constant(node) };
  };
  var fromPoint = function (doc, x, y) {
    return Option.from(doc.dom().elementFromPoint(x, y)).map(fromDom);
  };
  var $_5csi13k7jfeu9jrb = {
    fromHtml: fromHtml,
    fromTag: fromTag,
    fromText: fromText,
    fromDom: fromDom,
    fromPoint: fromPoint
  };

  var $_68n6syk8jfeu9jrj = {
    ATTRIBUTE: 2,
    CDATA_SECTION: 4,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    ELEMENT: 1,
    TEXT: 3,
    PROCESSING_INSTRUCTION: 7,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    NOTATION: 12
  };

  var ELEMENT = $_68n6syk8jfeu9jrj.ELEMENT;
  var DOCUMENT = $_68n6syk8jfeu9jrj.DOCUMENT;
  var is = function (element, selector) {
    var elem = element.dom();
    if (elem.nodeType !== ELEMENT)
      return false;
    else if (elem.matches !== undefined)
      return elem.matches(selector);
    else if (elem.msMatchesSelector !== undefined)
      return elem.msMatchesSelector(selector);
    else if (elem.webkitMatchesSelector !== undefined)
      return elem.webkitMatchesSelector(selector);
    else if (elem.mozMatchesSelector !== undefined)
      return elem.mozMatchesSelector(selector);
    else
      throw new Error('Browser lacks native selectors');
  };
  var bypassSelector = function (dom) {
    return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT || dom.childElementCount === 0;
  };
  var all = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? [] : $_8soyqzjsjfeu9jnc.map(base.querySelectorAll(selector), $_5csi13k7jfeu9jrb.fromDom);
  };
  var one = function (selector, scope) {
    var base = scope === undefined ? document : scope.dom();
    return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var $_ddcrggk6jfeu9jr0 = {
    all: all,
    is: is,
    one: one
  };

  var toArray = function (target, f) {
    var r = [];
    var recurse = function (e) {
      r.push(e);
      return f(e);
    };
    var cur = f(target);
    do {
      cur = cur.bind(recurse);
    } while (cur.isSome());
    return r;
  };
  var $_fnsvr4kajfeu9js4 = { toArray: toArray };

  var global$1 = typeof window !== 'undefined' ? window : Function('return this;')();

  var path = function (parts, scope) {
    var o = scope !== undefined && scope !== null ? scope : global$1;
    for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
      o = o[parts[i]];
    return o;
  };
  var resolve = function (p, scope) {
    var parts = p.split('.');
    return path(parts, scope);
  };
  var step = function (o, part) {
    if (o[part] === undefined || o[part] === null)
      o[part] = {};
    return o[part];
  };
  var forge = function (parts, target) {
    var o = target !== undefined ? target : global$1;
    for (var i = 0; i < parts.length; ++i)
      o = step(o, parts[i]);
    return o;
  };
  var namespace = function (name, target) {
    var parts = name.split('.');
    return forge(parts, target);
  };
  var $_cal8kkejfeu9jsr = {
    path: path,
    resolve: resolve,
    forge: forge,
    namespace: namespace
  };

  var unsafe = function (name, scope) {
    return $_cal8kkejfeu9jsr.resolve(name, scope);
  };
  var getOrDie = function (name, scope) {
    var actual = unsafe(name, scope);
    if (actual === undefined || actual === null)
      throw name + ' not available on this browser';
    return actual;
  };
  var $_79tivzkdjfeu9jsk = { getOrDie: getOrDie };

  var node = function () {
    var f = $_79tivzkdjfeu9jsk.getOrDie('Node');
    return f;
  };
  var compareDocumentPosition = function (a, b, match) {
    return (a.compareDocumentPosition(b) & match) !== 0;
  };
  var documentPositionPreceding = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
  };
  var documentPositionContainedBy = function (a, b) {
    return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
  };
  var $_ffsyd5kcjfeu9jsi = {
    documentPositionPreceding: documentPositionPreceding,
    documentPositionContainedBy: documentPositionContainedBy
  };

  var cached = function (f) {
    var called = false;
    var r;
    return function () {
      if (!called) {
        called = true;
        r = f.apply(null, arguments);
      }
      return r;
    };
  };
  var $_a38w16khjfeu9jsy = { cached: cached };

  var firstMatch = function (regexes, s) {
    for (var i = 0; i < regexes.length; i++) {
      var x = regexes[i];
      if (x.test(s))
        return x;
    }
    return undefined;
  };
  var find$2 = function (regexes, agent) {
    var r = firstMatch(regexes, agent);
    if (!r)
      return {
        major: 0,
        minor: 0
      };
    var group = function (i) {
      return Number(agent.replace(r, '$' + i));
    };
    return nu(group(1), group(2));
  };
  var detect = function (versionRegexes, agent) {
    var cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0)
      return unknown();
    return find$2(versionRegexes, cleanedAgent);
  };
  var unknown = function () {
    return nu(0, 0);
  };
  var nu = function (major, minor) {
    return {
      major: major,
      minor: minor
    };
  };
  var $_acathfkkjfeu9jt6 = {
    nu: nu,
    detect: detect,
    unknown: unknown
  };

  var edge = 'Edge';
  var chrome = 'Chrome';
  var ie = 'IE';
  var opera = 'Opera';
  var firefox = 'Firefox';
  var safari = 'Safari';
  var isBrowser = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$1 = function () {
    return nu$1({
      current: undefined,
      version: $_acathfkkjfeu9jt6.unknown()
    });
  };
  var nu$1 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isEdge: isBrowser(edge, current),
      isChrome: isBrowser(chrome, current),
      isIE: isBrowser(ie, current),
      isOpera: isBrowser(opera, current),
      isFirefox: isBrowser(firefox, current),
      isSafari: isBrowser(safari, current)
    };
  };
  var $_d94xd4kjjfeu9jt2 = {
    unknown: unknown$1,
    nu: nu$1,
    edge: $_8b8jopjujfeu9jnn.constant(edge),
    chrome: $_8b8jopjujfeu9jnn.constant(chrome),
    ie: $_8b8jopjujfeu9jnn.constant(ie),
    opera: $_8b8jopjujfeu9jnn.constant(opera),
    firefox: $_8b8jopjujfeu9jnn.constant(firefox),
    safari: $_8b8jopjujfeu9jnn.constant(safari)
  };

  var windows = 'Windows';
  var ios = 'iOS';
  var android = 'Android';
  var linux = 'Linux';
  var osx = 'OSX';
  var solaris = 'Solaris';
  var freebsd = 'FreeBSD';
  var isOS = function (name, current) {
    return function () {
      return current === name;
    };
  };
  var unknown$2 = function () {
    return nu$2({
      current: undefined,
      version: $_acathfkkjfeu9jt6.unknown()
    });
  };
  var nu$2 = function (info) {
    var current = info.current;
    var version = info.version;
    return {
      current: current,
      version: version,
      isWindows: isOS(windows, current),
      isiOS: isOS(ios, current),
      isAndroid: isOS(android, current),
      isOSX: isOS(osx, current),
      isLinux: isOS(linux, current),
      isSolaris: isOS(solaris, current),
      isFreeBSD: isOS(freebsd, current)
    };
  };
  var $_4reg1ykljfeu9jta = {
    unknown: unknown$2,
    nu: nu$2,
    windows: $_8b8jopjujfeu9jnn.constant(windows),
    ios: $_8b8jopjujfeu9jnn.constant(ios),
    android: $_8b8jopjujfeu9jnn.constant(android),
    linux: $_8b8jopjujfeu9jnn.constant(linux),
    osx: $_8b8jopjujfeu9jnn.constant(osx),
    solaris: $_8b8jopjujfeu9jnn.constant(solaris),
    freebsd: $_8b8jopjujfeu9jnn.constant(freebsd)
  };

  function DeviceType (os, browser, userAgent) {
    var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
    var isiPhone = os.isiOS() && !isiPad;
    var isAndroid3 = os.isAndroid() && os.version.major === 3;
    var isAndroid4 = os.isAndroid() && os.version.major === 4;
    var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
    var isTouch = os.isiOS() || os.isAndroid();
    var isPhone = isTouch && !isTablet;
    var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
    return {
      isiPad: $_8b8jopjujfeu9jnn.constant(isiPad),
      isiPhone: $_8b8jopjujfeu9jnn.constant(isiPhone),
      isTablet: $_8b8jopjujfeu9jnn.constant(isTablet),
      isPhone: $_8b8jopjujfeu9jnn.constant(isPhone),
      isTouch: $_8b8jopjujfeu9jnn.constant(isTouch),
      isAndroid: os.isAndroid,
      isiOS: os.isiOS,
      isWebView: $_8b8jopjujfeu9jnn.constant(iOSwebview)
    };
  }

  var detect$1 = function (candidates, userAgent) {
    var agent = String(userAgent).toLowerCase();
    return $_8soyqzjsjfeu9jnc.find(candidates, function (candidate) {
      return candidate.search(agent);
    });
  };
  var detectBrowser = function (browsers, userAgent) {
    return detect$1(browsers, userAgent).map(function (browser) {
      var version = $_acathfkkjfeu9jt6.detect(browser.versionRegexes, userAgent);
      return {
        current: browser.name,
        version: version
      };
    });
  };
  var detectOs = function (oses, userAgent) {
    return detect$1(oses, userAgent).map(function (os) {
      var version = $_acathfkkjfeu9jt6.detect(os.versionRegexes, userAgent);
      return {
        current: os.name,
        version: version
      };
    });
  };
  var $_45xlpoknjfeu9jtl = {
    detectBrowser: detectBrowser,
    detectOs: detectOs
  };

  var addToStart = function (str, prefix) {
    return prefix + str;
  };
  var addToEnd = function (str, suffix) {
    return str + suffix;
  };
  var removeFromStart = function (str, numChars) {
    return str.substring(numChars);
  };
  var removeFromEnd = function (str, numChars) {
    return str.substring(0, str.length - numChars);
  };
  var $_3a1f52kqjfeu9ju4 = {
    addToStart: addToStart,
    addToEnd: addToEnd,
    removeFromStart: removeFromStart,
    removeFromEnd: removeFromEnd
  };

  var first = function (str, count) {
    return str.substr(0, count);
  };
  var last$1 = function (str, count) {
    return str.substr(str.length - count, str.length);
  };
  var head$1 = function (str) {
    return str === '' ? Option.none() : Option.some(str.substr(0, 1));
  };
  var tail = function (str) {
    return str === '' ? Option.none() : Option.some(str.substring(1));
  };
  var $_408td7krjfeu9ju6 = {
    first: first,
    last: last$1,
    head: head$1,
    tail: tail
  };

  var checkRange = function (str, substr, start) {
    if (substr === '')
      return true;
    if (str.length < substr.length)
      return false;
    var x = str.substr(start, start + substr.length);
    return x === substr;
  };
  var supplant = function (str, obj) {
    var isStringOrNumber = function (a) {
      var t = typeof a;
      return t === 'string' || t === 'number';
    };
    return str.replace(/\${([^{}]*)}/g, function (a, b) {
      var value = obj[b];
      return isStringOrNumber(value) ? value : a;
    });
  };
  var removeLeading = function (str, prefix) {
    return startsWith(str, prefix) ? $_3a1f52kqjfeu9ju4.removeFromStart(str, prefix.length) : str;
  };
  var removeTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? $_3a1f52kqjfeu9ju4.removeFromEnd(str, prefix.length) : str;
  };
  var ensureLeading = function (str, prefix) {
    return startsWith(str, prefix) ? str : $_3a1f52kqjfeu9ju4.addToStart(str, prefix);
  };
  var ensureTrailing = function (str, prefix) {
    return endsWith(str, prefix) ? str : $_3a1f52kqjfeu9ju4.addToEnd(str, prefix);
  };
  var contains$1 = function (str, substr) {
    return str.indexOf(substr) !== -1;
  };
  var capitalize = function (str) {
    return $_408td7krjfeu9ju6.head(str).bind(function (head) {
      return $_408td7krjfeu9ju6.tail(str).map(function (tail) {
        return head.toUpperCase() + tail;
      });
    }).getOr(str);
  };
  var startsWith = function (str, prefix) {
    return checkRange(str, prefix, 0);
  };
  var endsWith = function (str, suffix) {
    return checkRange(str, suffix, str.length - suffix.length);
  };
  var trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var lTrim = function (str) {
    return str.replace(/^\s+/g, '');
  };
  var rTrim = function (str) {
    return str.replace(/\s+$/g, '');
  };
  var $_9n1rztkpjfeu9ju0 = {
    supplant: supplant,
    startsWith: startsWith,
    removeLeading: removeLeading,
    removeTrailing: removeTrailing,
    ensureLeading: ensureLeading,
    ensureTrailing: ensureTrailing,
    endsWith: endsWith,
    contains: contains$1,
    trim: trim,
    lTrim: lTrim,
    rTrim: rTrim,
    capitalize: capitalize
  };

  var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
  var checkContains = function (target) {
    return function (uastring) {
      return $_9n1rztkpjfeu9ju0.contains(uastring, target);
    };
  };
  var browsers = [
    {
      name: 'Edge',
      versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
      search: function (uastring) {
        var monstrosity = $_9n1rztkpjfeu9ju0.contains(uastring, 'edge/') && $_9n1rztkpjfeu9ju0.contains(uastring, 'chrome') && $_9n1rztkpjfeu9ju0.contains(uastring, 'safari') && $_9n1rztkpjfeu9ju0.contains(uastring, 'applewebkit');
        return monstrosity;
      }
    },
    {
      name: 'Chrome',
      versionRegexes: [
        /.*?chrome\/([0-9]+)\.([0-9]+).*/,
        normalVersionRegex
      ],
      search: function (uastring) {
        return $_9n1rztkpjfeu9ju0.contains(uastring, 'chrome') && !$_9n1rztkpjfeu9ju0.contains(uastring, 'chromeframe');
      }
    },
    {
      name: 'IE',
      versionRegexes: [
        /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
        /.*?rv:([0-9]+)\.([0-9]+).*/
      ],
      search: function (uastring) {
        return $_9n1rztkpjfeu9ju0.contains(uastring, 'msie') || $_9n1rztkpjfeu9ju0.contains(uastring, 'trident');
      }
    },
    {
      name: 'Opera',
      versionRegexes: [
        normalVersionRegex,
        /.*?opera\/([0-9]+)\.([0-9]+).*/
      ],
      search: checkContains('opera')
    },
    {
      name: 'Firefox',
      versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
      search: checkContains('firefox')
    },
    {
      name: 'Safari',
      versionRegexes: [
        normalVersionRegex,
        /.*?cpu os ([0-9]+)_([0-9]+).*/
      ],
      search: function (uastring) {
        return ($_9n1rztkpjfeu9ju0.contains(uastring, 'safari') || $_9n1rztkpjfeu9ju0.contains(uastring, 'mobile/')) && $_9n1rztkpjfeu9ju0.contains(uastring, 'applewebkit');
      }
    }
  ];
  var oses = [
    {
      name: 'Windows',
      search: checkContains('win'),
      versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'iOS',
      search: function (uastring) {
        return $_9n1rztkpjfeu9ju0.contains(uastring, 'iphone') || $_9n1rztkpjfeu9ju0.contains(uastring, 'ipad');
      },
      versionRegexes: [
        /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
        /.*cpu os ([0-9]+)_([0-9]+).*/,
        /.*cpu iphone os ([0-9]+)_([0-9]+).*/
      ]
    },
    {
      name: 'Android',
      search: checkContains('android'),
      versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    },
    {
      name: 'OSX',
      search: checkContains('os x'),
      versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    },
    {
      name: 'Linux',
      search: checkContains('linux'),
      versionRegexes: []
    },
    {
      name: 'Solaris',
      search: checkContains('sunos'),
      versionRegexes: []
    },
    {
      name: 'FreeBSD',
      search: checkContains('freebsd'),
      versionRegexes: []
    }
  ];
  var $_axr24dkojfeu9jtq = {
    browsers: $_8b8jopjujfeu9jnn.constant(browsers),
    oses: $_8b8jopjujfeu9jnn.constant(oses)
  };

  var detect$2 = function (userAgent) {
    var browsers = $_axr24dkojfeu9jtq.browsers();
    var oses = $_axr24dkojfeu9jtq.oses();
    var browser = $_45xlpoknjfeu9jtl.detectBrowser(browsers, userAgent).fold($_d94xd4kjjfeu9jt2.unknown, $_d94xd4kjjfeu9jt2.nu);
    var os = $_45xlpoknjfeu9jtl.detectOs(oses, userAgent).fold($_4reg1ykljfeu9jta.unknown, $_4reg1ykljfeu9jta.nu);
    var deviceType = DeviceType(os, browser, userAgent);
    return {
      browser: browser,
      os: os,
      deviceType: deviceType
    };
  };
  var $_6q0n6rkijfeu9jt0 = { detect: detect$2 };

  var detect$3 = $_a38w16khjfeu9jsy.cached(function () {
    var userAgent = navigator.userAgent;
    return $_6q0n6rkijfeu9jt0.detect(userAgent);
  });
  var $_d2ygmokgjfeu9jsv = { detect: detect$3 };

  var eq = function (e1, e2) {
    return e1.dom() === e2.dom();
  };
  var isEqualNode = function (e1, e2) {
    return e1.dom().isEqualNode(e2.dom());
  };
  var member = function (element, elements) {
    return $_8soyqzjsjfeu9jnc.exists(elements, $_8b8jopjujfeu9jnn.curry(eq, element));
  };
  var regularContains = function (e1, e2) {
    var d1 = e1.dom(), d2 = e2.dom();
    return d1 === d2 ? false : d1.contains(d2);
  };
  var ieContains = function (e1, e2) {
    return $_ffsyd5kcjfeu9jsi.documentPositionContainedBy(e1.dom(), e2.dom());
  };
  var browser = $_d2ygmokgjfeu9jsv.detect().browser;
  var contains$2 = browser.isIE() ? ieContains : regularContains;
  var $_adlyqikbjfeu9js6 = {
    eq: eq,
    isEqualNode: isEqualNode,
    member: member,
    contains: contains$2,
    is: $_ddcrggk6jfeu9jr0.is
  };

  var owner = function (element) {
    return $_5csi13k7jfeu9jrb.fromDom(element.dom().ownerDocument);
  };
  var documentElement = function (element) {
    var doc = owner(element);
    return $_5csi13k7jfeu9jrb.fromDom(doc.dom().documentElement);
  };
  var defaultView = function (element) {
    var el = element.dom();
    var defaultView = el.ownerDocument.defaultView;
    return $_5csi13k7jfeu9jrb.fromDom(defaultView);
  };
  var parent = function (element) {
    var dom = element.dom();
    return Option.from(dom.parentNode).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var findIndex$1 = function (element) {
    return parent(element).bind(function (p) {
      var kin = children(p);
      return $_8soyqzjsjfeu9jnc.findIndex(kin, function (elem) {
        return $_adlyqikbjfeu9js6.eq(element, elem);
      });
    });
  };
  var parents = function (element, isRoot) {
    var stop = $_91jv01k1jfeu9jpc.isFunction(isRoot) ? isRoot : $_8b8jopjujfeu9jnn.constant(false);
    var dom = element.dom();
    var ret = [];
    while (dom.parentNode !== null && dom.parentNode !== undefined) {
      var rawParent = dom.parentNode;
      var parent = $_5csi13k7jfeu9jrb.fromDom(rawParent);
      ret.push(parent);
      if (stop(parent) === true)
        break;
      else
        dom = rawParent;
    }
    return ret;
  };
  var siblings = function (element) {
    var filterSelf = function (elements) {
      return $_8soyqzjsjfeu9jnc.filter(elements, function (x) {
        return !$_adlyqikbjfeu9js6.eq(element, x);
      });
    };
    return parent(element).map(children).map(filterSelf).getOr([]);
  };
  var offsetParent = function (element) {
    var dom = element.dom();
    return Option.from(dom.offsetParent).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var prevSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.previousSibling).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var nextSibling = function (element) {
    var dom = element.dom();
    return Option.from(dom.nextSibling).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var prevSiblings = function (element) {
    return $_8soyqzjsjfeu9jnc.reverse($_fnsvr4kajfeu9js4.toArray(element, prevSibling));
  };
  var nextSiblings = function (element) {
    return $_fnsvr4kajfeu9js4.toArray(element, nextSibling);
  };
  var children = function (element) {
    var dom = element.dom();
    return $_8soyqzjsjfeu9jnc.map(dom.childNodes, $_5csi13k7jfeu9jrb.fromDom);
  };
  var child = function (element, index) {
    var children = element.dom().childNodes;
    return Option.from(children[index]).map($_5csi13k7jfeu9jrb.fromDom);
  };
  var firstChild = function (element) {
    return child(element, 0);
  };
  var lastChild = function (element) {
    return child(element, element.dom().childNodes.length - 1);
  };
  var childNodesCount = function (element) {
    return element.dom().childNodes.length;
  };
  var hasChildNodes = function (element) {
    return element.dom().hasChildNodes();
  };
  var spot = $_6s7wfojxjfeu9joz.immutable('element', 'offset');
  var leaf = function (element, offset) {
    var cs = children(element);
    return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
  };
  var $_dzvm7xk9jfeu9jrm = {
    owner: owner,
    defaultView: defaultView,
    documentElement: documentElement,
    parent: parent,
    findIndex: findIndex$1,
    parents: parents,
    siblings: siblings,
    prevSibling: prevSibling,
    offsetParent: offsetParent,
    prevSiblings: prevSiblings,
    nextSibling: nextSibling,
    nextSiblings: nextSiblings,
    children: children,
    child: child,
    firstChild: firstChild,
    lastChild: lastChild,
    childNodesCount: childNodesCount,
    hasChildNodes: hasChildNodes,
    leaf: leaf
  };

  var firstLayer = function (scope, selector) {
    return filterFirstLayer(scope, selector, $_8b8jopjujfeu9jnn.constant(true));
  };
  var filterFirstLayer = function (scope, selector, predicate) {
    return $_8soyqzjsjfeu9jnc.bind($_dzvm7xk9jfeu9jrm.children(scope), function (x) {
      return $_ddcrggk6jfeu9jr0.is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
    });
  };
  var $_1gu05yk5jfeu9jqm = {
    firstLayer: firstLayer,
    filterFirstLayer: filterFirstLayer
  };

  var name = function (element) {
    var r = element.dom().nodeName;
    return r.toLowerCase();
  };
  var type = function (element) {
    return element.dom().nodeType;
  };
  var value = function (element) {
    return element.dom().nodeValue;
  };
  var isType$1 = function (t) {
    return function (element) {
      return type(element) === t;
    };
  };
  var isComment = function (element) {
    return type(element) === $_68n6syk8jfeu9jrj.COMMENT || name(element) === '#comment';
  };
  var isElement = isType$1($_68n6syk8jfeu9jrj.ELEMENT);
  var isText = isType$1($_68n6syk8jfeu9jrj.TEXT);
  var isDocument = isType$1($_68n6syk8jfeu9jrj.DOCUMENT);
  var $_prkbektjfeu9juk = {
    name: name,
    type: type,
    value: value,
    isElement: isElement,
    isText: isText,
    isDocument: isDocument,
    isComment: isComment
  };

  var rawSet = function (dom, key, value) {
    if ($_91jv01k1jfeu9jpc.isString(value) || $_91jv01k1jfeu9jpc.isBoolean(value) || $_91jv01k1jfeu9jpc.isNumber(value)) {
      dom.setAttribute(key, value + '');
    } else {
      console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
      throw new Error('Attribute value was not simple');
    }
  };
  var set = function (element, key, value) {
    rawSet(element.dom(), key, value);
  };
  var setAll = function (element, attrs) {
    var dom = element.dom();
    $_1iiwlojwjfeu9jou.each(attrs, function (v, k) {
      rawSet(dom, k, v);
    });
  };
  var get = function (element, key) {
    var v = element.dom().getAttribute(key);
    return v === null ? undefined : v;
  };
  var has = function (element, key) {
    var dom = element.dom();
    return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
  };
  var remove = function (element, key) {
    element.dom().removeAttribute(key);
  };
  var hasNone = function (element) {
    var attrs = element.dom().attributes;
    return attrs === undefined || attrs === null || attrs.length === 0;
  };
  var clone = function (element) {
    return $_8soyqzjsjfeu9jnc.foldl(element.dom().attributes, function (acc, attr) {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  };
  var transferOne = function (source, destination, attr) {
    if (has(source, attr) && !has(destination, attr))
      set(destination, attr, get(source, attr));
  };
  var transfer = function (source, destination, attrs) {
    if (!$_prkbektjfeu9juk.isElement(source) || !$_prkbektjfeu9juk.isElement(destination))
      return;
    $_8soyqzjsjfeu9jnc.each(attrs, function (attr) {
      transferOne(source, destination, attr);
    });
  };
  var $_gd427vksjfeu9ju9 = {
    clone: clone,
    set: set,
    setAll: setAll,
    get: get,
    has: has,
    remove: remove,
    hasNone: hasNone,
    transfer: transfer
  };

  var inBody = function (element) {
    var dom = $_prkbektjfeu9juk.isText(element) ? element.dom().parentNode : element.dom();
    return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
  };
  var body = $_a38w16khjfeu9jsy.cached(function () {
    return getBody($_5csi13k7jfeu9jrb.fromDom(document));
  });
  var getBody = function (doc) {
    var body = doc.dom().body;
    if (body === null || body === undefined)
      throw 'Body is not available yet';
    return $_5csi13k7jfeu9jrb.fromDom(body);
  };
  var $_6mhhmqkwjfeu9juu = {
    body: body,
    getBody: getBody,
    inBody: inBody
  };

  var all$1 = function (predicate) {
    return descendants($_6mhhmqkwjfeu9juu.body(), predicate);
  };
  var ancestors = function (scope, predicate, isRoot) {
    return $_8soyqzjsjfeu9jnc.filter($_dzvm7xk9jfeu9jrm.parents(scope, isRoot), predicate);
  };
  var siblings$1 = function (scope, predicate) {
    return $_8soyqzjsjfeu9jnc.filter($_dzvm7xk9jfeu9jrm.siblings(scope), predicate);
  };
  var children$1 = function (scope, predicate) {
    return $_8soyqzjsjfeu9jnc.filter($_dzvm7xk9jfeu9jrm.children(scope), predicate);
  };
  var descendants = function (scope, predicate) {
    var result = [];
    $_8soyqzjsjfeu9jnc.each($_dzvm7xk9jfeu9jrm.children(scope), function (x) {
      if (predicate(x)) {
        result = result.concat([x]);
      }
      result = result.concat(descendants(x, predicate));
    });
    return result;
  };
  var $_5m9htckvjfeu9juq = {
    all: all$1,
    ancestors: ancestors,
    siblings: siblings$1,
    children: children$1,
    descendants: descendants
  };

  var all$2 = function (selector) {
    return $_ddcrggk6jfeu9jr0.all(selector);
  };
  var ancestors$1 = function (scope, selector, isRoot) {
    return $_5m9htckvjfeu9juq.ancestors(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    }, isRoot);
  };
  var siblings$2 = function (scope, selector) {
    return $_5m9htckvjfeu9juq.siblings(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    });
  };
  var children$2 = function (scope, selector) {
    return $_5m9htckvjfeu9juq.children(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    });
  };
  var descendants$1 = function (scope, selector) {
    return $_ddcrggk6jfeu9jr0.all(selector, scope);
  };
  var $_dva6q3kujfeu9juo = {
    all: all$2,
    ancestors: ancestors$1,
    siblings: siblings$2,
    children: children$2,
    descendants: descendants$1
  };

  function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
    return is(scope, a) ? Option.some(scope) : $_91jv01k1jfeu9jpc.isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
  }

  var first$1 = function (predicate) {
    return descendant($_6mhhmqkwjfeu9juu.body(), predicate);
  };
  var ancestor = function (scope, predicate, isRoot) {
    var element = scope.dom();
    var stop = $_91jv01k1jfeu9jpc.isFunction(isRoot) ? isRoot : $_8b8jopjujfeu9jnn.constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      var el = $_5csi13k7jfeu9jrb.fromDom(element);
      if (predicate(el))
        return Option.some(el);
      else if (stop(el))
        break;
    }
    return Option.none();
  };
  var closest = function (scope, predicate, isRoot) {
    var is = function (scope) {
      return predicate(scope);
    };
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
  };
  var sibling = function (scope, predicate) {
    var element = scope.dom();
    if (!element.parentNode)
      return Option.none();
    return child$1($_5csi13k7jfeu9jrb.fromDom(element.parentNode), function (x) {
      return !$_adlyqikbjfeu9js6.eq(scope, x) && predicate(x);
    });
  };
  var child$1 = function (scope, predicate) {
    var result = $_8soyqzjsjfeu9jnc.find(scope.dom().childNodes, $_8b8jopjujfeu9jnn.compose(predicate, $_5csi13k7jfeu9jrb.fromDom));
    return result.map($_5csi13k7jfeu9jrb.fromDom);
  };
  var descendant = function (scope, predicate) {
    var descend = function (element) {
      for (var i = 0; i < element.childNodes.length; i++) {
        if (predicate($_5csi13k7jfeu9jrb.fromDom(element.childNodes[i])))
          return Option.some($_5csi13k7jfeu9jrb.fromDom(element.childNodes[i]));
        var res = descend(element.childNodes[i]);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope.dom());
  };
  var $_causnjkyjfeu9jv6 = {
    first: first$1,
    ancestor: ancestor,
    closest: closest,
    sibling: sibling,
    child: child$1,
    descendant: descendant
  };

  var first$2 = function (selector) {
    return $_ddcrggk6jfeu9jr0.one(selector);
  };
  var ancestor$1 = function (scope, selector, isRoot) {
    return $_causnjkyjfeu9jv6.ancestor(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    }, isRoot);
  };
  var sibling$1 = function (scope, selector) {
    return $_causnjkyjfeu9jv6.sibling(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    });
  };
  var child$2 = function (scope, selector) {
    return $_causnjkyjfeu9jv6.child(scope, function (e) {
      return $_ddcrggk6jfeu9jr0.is(e, selector);
    });
  };
  var descendant$1 = function (scope, selector) {
    return $_ddcrggk6jfeu9jr0.one(selector, scope);
  };
  var closest$1 = function (scope, selector, isRoot) {
    return ClosestOrAncestor($_ddcrggk6jfeu9jr0.is, ancestor$1, scope, selector, isRoot);
  };
  var $_e4f1b4kxjfeu9jv4 = {
    first: first$2,
    ancestor: ancestor$1,
    sibling: sibling$1,
    child: child$2,
    descendant: descendant$1,
    closest: closest$1
  };

  var lookup = function (tags, element, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_8b8jopjujfeu9jnn.constant(false);
    if (isRoot(element))
      return Option.none();
    if ($_8soyqzjsjfeu9jnc.contains(tags, $_prkbektjfeu9juk.name(element)))
      return Option.some(element);
    var isRootOrUpperTable = function (element) {
      return $_ddcrggk6jfeu9jr0.is(element, 'table') || isRoot(element);
    };
    return $_e4f1b4kxjfeu9jv4.ancestor(element, tags.join(','), isRootOrUpperTable);
  };
  var cell = function (element, isRoot) {
    return lookup([
      'td',
      'th'
    ], element, isRoot);
  };
  var cells = function (ancestor) {
    return $_1gu05yk5jfeu9jqm.firstLayer(ancestor, 'th,td');
  };
  var notCell = function (element, isRoot) {
    return lookup([
      'caption',
      'tr',
      'tbody',
      'tfoot',
      'thead'
    ], element, isRoot);
  };
  var neighbours = function (selector, element) {
    return $_dzvm7xk9jfeu9jrm.parent(element).map(function (parent) {
      return $_dva6q3kujfeu9juo.children(parent, selector);
    });
  };
  var neighbourCells = $_8b8jopjujfeu9jnn.curry(neighbours, 'th,td');
  var neighbourRows = $_8b8jopjujfeu9jnn.curry(neighbours, 'tr');
  var firstCell = function (ancestor) {
    return $_e4f1b4kxjfeu9jv4.descendant(ancestor, 'th,td');
  };
  var table = function (element, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(element, 'table', isRoot);
  };
  var row = function (element, isRoot) {
    return lookup(['tr'], element, isRoot);
  };
  var rows = function (ancestor) {
    return $_1gu05yk5jfeu9jqm.firstLayer(ancestor, 'tr');
  };
  var attr = function (element, property) {
    return parseInt($_gd427vksjfeu9ju9.get(element, property), 10);
  };
  var grid$1 = function (element, rowProp, colProp) {
    var rows = attr(element, rowProp);
    var cols = attr(element, colProp);
    return $_2crbd2k3jfeu9jpu.grid(rows, cols);
  };
  var $_811muwk4jfeu9jq0 = {
    cell: cell,
    firstCell: firstCell,
    cells: cells,
    neighbourCells: neighbourCells,
    table: table,
    row: row,
    rows: rows,
    notCell: notCell,
    neighbourRows: neighbourRows,
    attr: attr,
    grid: grid$1
  };

  var fromTable = function (table) {
    var rows = $_811muwk4jfeu9jq0.rows(table);
    return $_8soyqzjsjfeu9jnc.map(rows, function (row) {
      var element = row;
      var parent = $_dzvm7xk9jfeu9jrm.parent(element);
      var parentSection = parent.bind(function (parent) {
        var parentName = $_prkbektjfeu9juk.name(parent);
        return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
      });
      var cells = $_8soyqzjsjfeu9jnc.map($_811muwk4jfeu9jq0.cells(row), function (cell) {
        var rowspan = $_gd427vksjfeu9ju9.has(cell, 'rowspan') ? parseInt($_gd427vksjfeu9ju9.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_gd427vksjfeu9ju9.has(cell, 'colspan') ? parseInt($_gd427vksjfeu9ju9.get(cell, 'colspan'), 10) : 1;
        return $_2crbd2k3jfeu9jpu.detail(cell, rowspan, colspan);
      });
      return $_2crbd2k3jfeu9jpu.rowdata(element, cells, parentSection);
    });
  };
  var fromPastedRows = function (rows, example) {
    return $_8soyqzjsjfeu9jnc.map(rows, function (row) {
      var cells = $_8soyqzjsjfeu9jnc.map($_811muwk4jfeu9jq0.cells(row), function (cell) {
        var rowspan = $_gd427vksjfeu9ju9.has(cell, 'rowspan') ? parseInt($_gd427vksjfeu9ju9.get(cell, 'rowspan'), 10) : 1;
        var colspan = $_gd427vksjfeu9ju9.has(cell, 'colspan') ? parseInt($_gd427vksjfeu9ju9.get(cell, 'colspan'), 10) : 1;
        return $_2crbd2k3jfeu9jpu.detail(cell, rowspan, colspan);
      });
      return $_2crbd2k3jfeu9jpu.rowdata(row, cells, example.section());
    });
  };
  var $_csfqqxk2jfeu9jph = {
    fromTable: fromTable,
    fromPastedRows: fromPastedRows
  };

  var key = function (row, column) {
    return row + ',' + column;
  };
  var getAt = function (warehouse, row, column) {
    var raw = warehouse.access()[key(row, column)];
    return raw !== undefined ? Option.some(raw) : Option.none();
  };
  var findItem = function (warehouse, item, comparator) {
    var filtered = filterItems(warehouse, function (detail) {
      return comparator(item, detail.element());
    });
    return filtered.length > 0 ? Option.some(filtered[0]) : Option.none();
  };
  var filterItems = function (warehouse, predicate) {
    var all = $_8soyqzjsjfeu9jnc.bind(warehouse.all(), function (r) {
      return r.cells();
    });
    return $_8soyqzjsjfeu9jnc.filter(all, predicate);
  };
  var generate = function (list) {
    var access = {};
    var cells = [];
    var maxRows = list.length;
    var maxColumns = 0;
    $_8soyqzjsjfeu9jnc.each(list, function (details, r) {
      var currentRow = [];
      $_8soyqzjsjfeu9jnc.each(details.cells(), function (detail, c) {
        var start = 0;
        while (access[key(r, start)] !== undefined) {
          start++;
        }
        var current = $_2crbd2k3jfeu9jpu.extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
        for (var i = 0; i < detail.colspan(); i++) {
          for (var j = 0; j < detail.rowspan(); j++) {
            var cr = r + j;
            var cc = start + i;
            var newpos = key(cr, cc);
            access[newpos] = current;
            maxColumns = Math.max(maxColumns, cc + 1);
          }
        }
        currentRow.push(current);
      });
      cells.push($_2crbd2k3jfeu9jpu.rowdata(details.element(), currentRow, details.section()));
    });
    var grid = $_2crbd2k3jfeu9jpu.grid(maxRows, maxColumns);
    return {
      grid: $_8b8jopjujfeu9jnn.constant(grid),
      access: $_8b8jopjujfeu9jnn.constant(access),
      all: $_8b8jopjujfeu9jnn.constant(cells)
    };
  };
  var justCells = function (warehouse) {
    var rows = $_8soyqzjsjfeu9jnc.map(warehouse.all(), function (w) {
      return w.cells();
    });
    return $_8soyqzjsjfeu9jnc.flatten(rows);
  };
  var $_8o21o3l0jfeu9jvn = {
    generate: generate,
    getAt: getAt,
    findItem: findItem,
    filterItems: filterItems,
    justCells: justCells
  };

  var isSupported = function (dom) {
    return dom.style !== undefined;
  };
  var $_ff751fl2jfeu9jw7 = { isSupported: isSupported };

  var internalSet = function (dom, property, value) {
    if (!$_91jv01k1jfeu9jpc.isString(value)) {
      console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
      throw new Error('CSS value must be a string: ' + value);
    }
    if ($_ff751fl2jfeu9jw7.isSupported(dom))
      dom.style.setProperty(property, value);
  };
  var internalRemove = function (dom, property) {
    if ($_ff751fl2jfeu9jw7.isSupported(dom))
      dom.style.removeProperty(property);
  };
  var set$1 = function (element, property, value) {
    var dom = element.dom();
    internalSet(dom, property, value);
  };
  var setAll$1 = function (element, css) {
    var dom = element.dom();
    $_1iiwlojwjfeu9jou.each(css, function (v, k) {
      internalSet(dom, k, v);
    });
  };
  var setOptions = function (element, css) {
    var dom = element.dom();
    $_1iiwlojwjfeu9jou.each(css, function (v, k) {
      v.fold(function () {
        internalRemove(dom, k);
      }, function (value) {
        internalSet(dom, k, value);
      });
    });
  };
  var get$1 = function (element, property) {
    var dom = element.dom();
    var styles = window.getComputedStyle(dom);
    var r = styles.getPropertyValue(property);
    var v = r === '' && !$_6mhhmqkwjfeu9juu.inBody(element) ? getUnsafeProperty(dom, property) : r;
    return v === null ? undefined : v;
  };
  var getUnsafeProperty = function (dom, property) {
    return $_ff751fl2jfeu9jw7.isSupported(dom) ? dom.style.getPropertyValue(property) : '';
  };
  var getRaw = function (element, property) {
    var dom = element.dom();
    var raw = getUnsafeProperty(dom, property);
    return Option.from(raw).filter(function (r) {
      return r.length > 0;
    });
  };
  var getAllRaw = function (element) {
    var css = {};
    var dom = element.dom();
    if ($_ff751fl2jfeu9jw7.isSupported(dom)) {
      for (var i = 0; i < dom.style.length; i++) {
        var ruleName = dom.style.item(i);
        css[ruleName] = dom.style[ruleName];
      }
    }
    return css;
  };
  var isValidValue = function (tag, property, value) {
    var element = $_5csi13k7jfeu9jrb.fromTag(tag);
    set$1(element, property, value);
    var style = getRaw(element, property);
    return style.isSome();
  };
  var remove$1 = function (element, property) {
    var dom = element.dom();
    internalRemove(dom, property);
    if ($_gd427vksjfeu9ju9.has(element, 'style') && $_9n1rztkpjfeu9ju0.trim($_gd427vksjfeu9ju9.get(element, 'style')) === '') {
      $_gd427vksjfeu9ju9.remove(element, 'style');
    }
  };
  var preserve = function (element, f) {
    var oldStyles = $_gd427vksjfeu9ju9.get(element, 'style');
    var result = f(element);
    var restore = oldStyles === undefined ? $_gd427vksjfeu9ju9.remove : $_gd427vksjfeu9ju9.set;
    restore(element, 'style', oldStyles);
    return result;
  };
  var copy = function (source, target) {
    var sourceDom = source.dom();
    var targetDom = target.dom();
    if ($_ff751fl2jfeu9jw7.isSupported(sourceDom) && $_ff751fl2jfeu9jw7.isSupported(targetDom)) {
      targetDom.style.cssText = sourceDom.style.cssText;
    }
  };
  var reflow = function (e) {
    return e.dom().offsetWidth;
  };
  var transferOne$1 = function (source, destination, style) {
    getRaw(source, style).each(function (value) {
      if (getRaw(destination, style).isNone())
        set$1(destination, style, value);
    });
  };
  var transfer$1 = function (source, destination, styles) {
    if (!$_prkbektjfeu9juk.isElement(source) || !$_prkbektjfeu9juk.isElement(destination))
      return;
    $_8soyqzjsjfeu9jnc.each(styles, function (style) {
      transferOne$1(source, destination, style);
    });
  };
  var $_esap7zl1jfeu9jvv = {
    copy: copy,
    set: set$1,
    preserve: preserve,
    setAll: setAll$1,
    setOptions: setOptions,
    remove: remove$1,
    get: get$1,
    getRaw: getRaw,
    getAllRaw: getAllRaw,
    isValidValue: isValidValue,
    reflow: reflow,
    transfer: transfer$1
  };

  var before = function (marker, element) {
    var parent = $_dzvm7xk9jfeu9jrm.parent(marker);
    parent.each(function (v) {
      v.dom().insertBefore(element.dom(), marker.dom());
    });
  };
  var after = function (marker, element) {
    var sibling = $_dzvm7xk9jfeu9jrm.nextSibling(marker);
    sibling.fold(function () {
      var parent = $_dzvm7xk9jfeu9jrm.parent(marker);
      parent.each(function (v) {
        append(v, element);
      });
    }, function (v) {
      before(v, element);
    });
  };
  var prepend = function (parent, element) {
    var firstChild = $_dzvm7xk9jfeu9jrm.firstChild(parent);
    firstChild.fold(function () {
      append(parent, element);
    }, function (v) {
      parent.dom().insertBefore(element.dom(), v.dom());
    });
  };
  var append = function (parent, element) {
    parent.dom().appendChild(element.dom());
  };
  var appendAt = function (parent, element, index) {
    $_dzvm7xk9jfeu9jrm.child(parent, index).fold(function () {
      append(parent, element);
    }, function (v) {
      before(v, element);
    });
  };
  var wrap = function (element, wrapper) {
    before(element, wrapper);
    append(wrapper, element);
  };
  var $_68ujuxl3jfeu9jw9 = {
    before: before,
    after: after,
    prepend: prepend,
    append: append,
    appendAt: appendAt,
    wrap: wrap
  };

  var before$1 = function (marker, elements) {
    $_8soyqzjsjfeu9jnc.each(elements, function (x) {
      $_68ujuxl3jfeu9jw9.before(marker, x);
    });
  };
  var after$1 = function (marker, elements) {
    $_8soyqzjsjfeu9jnc.each(elements, function (x, i) {
      var e = i === 0 ? marker : elements[i - 1];
      $_68ujuxl3jfeu9jw9.after(e, x);
    });
  };
  var prepend$1 = function (parent, elements) {
    $_8soyqzjsjfeu9jnc.each(elements.slice().reverse(), function (x) {
      $_68ujuxl3jfeu9jw9.prepend(parent, x);
    });
  };
  var append$1 = function (parent, elements) {
    $_8soyqzjsjfeu9jnc.each(elements, function (x) {
      $_68ujuxl3jfeu9jw9.append(parent, x);
    });
  };
  var $_fhqznl5jfeu9jwf = {
    before: before$1,
    after: after$1,
    prepend: prepend$1,
    append: append$1
  };

  var empty = function (element) {
    element.dom().textContent = '';
    $_8soyqzjsjfeu9jnc.each($_dzvm7xk9jfeu9jrm.children(element), function (rogue) {
      remove$2(rogue);
    });
  };
  var remove$2 = function (element) {
    var dom = element.dom();
    if (dom.parentNode !== null)
      dom.parentNode.removeChild(dom);
  };
  var unwrap = function (wrapper) {
    var children = $_dzvm7xk9jfeu9jrm.children(wrapper);
    if (children.length > 0)
      $_fhqznl5jfeu9jwf.before(wrapper, children);
    remove$2(wrapper);
  };
  var $_sg34gl4jfeu9jwb = {
    empty: empty,
    remove: remove$2,
    unwrap: unwrap
  };

  var stats = $_6s7wfojxjfeu9joz.immutable('minRow', 'minCol', 'maxRow', 'maxCol');
  var findSelectedStats = function (house, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    var minRow = totalRows;
    var minCol = totalColumns;
    var maxRow = 0;
    var maxCol = 0;
    $_1iiwlojwjfeu9jou.each(house.access(), function (detail) {
      if (isSelected(detail)) {
        var startRow = detail.row();
        var endRow = startRow + detail.rowspan() - 1;
        var startCol = detail.column();
        var endCol = startCol + detail.colspan() - 1;
        if (startRow < minRow)
          minRow = startRow;
        else if (endRow > maxRow)
          maxRow = endRow;
        if (startCol < minCol)
          minCol = startCol;
        else if (endCol > maxCol)
          maxCol = endCol;
      }
    });
    return stats(minRow, minCol, maxRow, maxCol);
  };
  var makeCell = function (list, seenSelected, rowIndex) {
    var row = list[rowIndex].element();
    var td = $_5csi13k7jfeu9jrb.fromTag('td');
    $_68ujuxl3jfeu9jw9.append(td, $_5csi13k7jfeu9jrb.fromTag('br'));
    var f = seenSelected ? $_68ujuxl3jfeu9jw9.append : $_68ujuxl3jfeu9jw9.prepend;
    f(row, td);
  };
  var fillInGaps = function (list, house, stats, isSelected) {
    var totalColumns = house.grid().columns();
    var totalRows = house.grid().rows();
    for (var i = 0; i < totalRows; i++) {
      var seenSelected = false;
      for (var j = 0; j < totalColumns; j++) {
        if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
          var needCell = $_8o21o3l0jfeu9jvn.getAt(house, i, j).filter(isSelected).isNone();
          if (needCell)
            makeCell(list, seenSelected, i);
          else
            seenSelected = true;
        }
      }
    }
  };
  var clean = function (table, stats) {
    var emptyRows = $_8soyqzjsjfeu9jnc.filter($_1gu05yk5jfeu9jqm.firstLayer(table, 'tr'), function (row) {
      return row.dom().childElementCount === 0;
    });
    $_8soyqzjsjfeu9jnc.each(emptyRows, $_sg34gl4jfeu9jwb.remove);
    if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
      $_8soyqzjsjfeu9jnc.each($_1gu05yk5jfeu9jqm.firstLayer(table, 'th,td'), function (cell) {
        $_gd427vksjfeu9ju9.remove(cell, 'rowspan');
        $_gd427vksjfeu9ju9.remove(cell, 'colspan');
      });
    }
    $_gd427vksjfeu9ju9.remove(table, 'width');
    $_gd427vksjfeu9ju9.remove(table, 'height');
    $_esap7zl1jfeu9jvv.remove(table, 'width');
    $_esap7zl1jfeu9jvv.remove(table, 'height');
  };
  var extract = function (table, selectedSelector) {
    var isSelected = function (detail) {
      return $_ddcrggk6jfeu9jr0.is(detail.element(), selectedSelector);
    };
    var list = $_csfqqxk2jfeu9jph.fromTable(table);
    var house = $_8o21o3l0jfeu9jvn.generate(list);
    var stats = findSelectedStats(house, isSelected);
    var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
    var unselectedCells = $_1gu05yk5jfeu9jqm.filterFirstLayer(table, 'th,td', function (cell) {
      return $_ddcrggk6jfeu9jr0.is(cell, selector);
    });
    $_8soyqzjsjfeu9jnc.each(unselectedCells, $_sg34gl4jfeu9jwb.remove);
    fillInGaps(list, house, stats, isSelected);
    clean(table, stats);
    return table;
  };
  var $_gabp30jvjfeu9jns = { extract: extract };

  var clone$1 = function (original, deep) {
    return $_5csi13k7jfeu9jrb.fromDom(original.dom().cloneNode(deep));
  };
  var shallow = function (original) {
    return clone$1(original, false);
  };
  var deep = function (original) {
    return clone$1(original, true);
  };
  var shallowAs = function (original, tag) {
    var nu = $_5csi13k7jfeu9jrb.fromTag(tag);
    var attributes = $_gd427vksjfeu9ju9.clone(original);
    $_gd427vksjfeu9ju9.setAll(nu, attributes);
    return nu;
  };
  var copy$1 = function (original, tag) {
    var nu = shallowAs(original, tag);
    var cloneChildren = $_dzvm7xk9jfeu9jrm.children(deep(original));
    $_fhqznl5jfeu9jwf.append(nu, cloneChildren);
    return nu;
  };
  var mutate = function (original, tag) {
    var nu = shallowAs(original, tag);
    $_68ujuxl3jfeu9jw9.before(original, nu);
    var children = $_dzvm7xk9jfeu9jrm.children(original);
    $_fhqznl5jfeu9jwf.append(nu, children);
    $_sg34gl4jfeu9jwb.remove(original);
    return nu;
  };
  var $_3hnsgql7jfeu9jxb = {
    shallow: shallow,
    shallowAs: shallowAs,
    deep: deep,
    copy: copy$1,
    mutate: mutate
  };

  function NodeValue (is, name) {
    var get = function (element) {
      if (!is(element))
        throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
      return getOption(element).getOr('');
    };
    var getOptionIE10 = function (element) {
      try {
        return getOptionSafe(element);
      } catch (e) {
        return Option.none();
      }
    };
    var getOptionSafe = function (element) {
      return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
    };
    var browser = $_d2ygmokgjfeu9jsv.detect().browser;
    var getOption = browser.isIE() && browser.version.major === 10 ? getOptionIE10 : getOptionSafe;
    var set = function (element, value) {
      if (!is(element))
        throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
      element.dom().nodeValue = value;
    };
    return {
      get: get,
      getOption: getOption,
      set: set
    };
  }

  var api = NodeValue($_prkbektjfeu9juk.isText, 'text');
  var get$2 = function (element) {
    return api.get(element);
  };
  var getOption = function (element) {
    return api.getOption(element);
  };
  var set$2 = function (element, value) {
    api.set(element, value);
  };
  var $_allfqrlajfeu9jxn = {
    get: get$2,
    getOption: getOption,
    set: set$2
  };

  var getEnd = function (element) {
    return $_prkbektjfeu9juk.name(element) === 'img' ? 1 : $_allfqrlajfeu9jxn.getOption(element).fold(function () {
      return $_dzvm7xk9jfeu9jrm.children(element).length;
    }, function (v) {
      return v.length;
    });
  };
  var isEnd = function (element, offset) {
    return getEnd(element) === offset;
  };
  var isStart = function (element, offset) {
    return offset === 0;
  };
  var NBSP = '\xA0';
  var isTextNodeWithCursorPosition = function (el) {
    return $_allfqrlajfeu9jxn.getOption(el).filter(function (text) {
      return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
    }).isSome();
  };
  var elementsWithCursorPosition = [
    'img',
    'br'
  ];
  var isCursorPosition = function (elem) {
    var hasCursorPosition = isTextNodeWithCursorPosition(elem);
    return hasCursorPosition || $_8soyqzjsjfeu9jnc.contains(elementsWithCursorPosition, $_prkbektjfeu9juk.name(elem));
  };
  var $_ci6vdnl9jfeu9jxj = {
    getEnd: getEnd,
    isEnd: isEnd,
    isStart: isStart,
    isCursorPosition: isCursorPosition
  };

  var first$3 = function (element) {
    return $_causnjkyjfeu9jv6.descendant(element, $_ci6vdnl9jfeu9jxj.isCursorPosition);
  };
  var last$2 = function (element) {
    return descendantRtl(element, $_ci6vdnl9jfeu9jxj.isCursorPosition);
  };
  var descendantRtl = function (scope, predicate) {
    var descend = function (element) {
      var children = $_dzvm7xk9jfeu9jrm.children(element);
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (predicate(child))
          return Option.some(child);
        var res = descend(child);
        if (res.isSome())
          return res;
      }
      return Option.none();
    };
    return descend(scope);
  };
  var $_7ig6trl8jfeu9jxe = {
    first: first$3,
    last: last$2
  };

  var cell$1 = function () {
    var td = $_5csi13k7jfeu9jrb.fromTag('td');
    $_68ujuxl3jfeu9jw9.append(td, $_5csi13k7jfeu9jrb.fromTag('br'));
    return td;
  };
  var replace = function (cell, tag, attrs) {
    var replica = $_3hnsgql7jfeu9jxb.copy(cell, tag);
    $_1iiwlojwjfeu9jou.each(attrs, function (v, k) {
      if (v === null)
        $_gd427vksjfeu9ju9.remove(replica, k);
      else
        $_gd427vksjfeu9ju9.set(replica, k, v);
    });
    return replica;
  };
  var pasteReplace = function (cellContent) {
    return cellContent;
  };
  var newRow = function (doc) {
    return function () {
      return $_5csi13k7jfeu9jrb.fromTag('tr', doc.dom());
    };
  };
  var cloneFormats = function (oldCell, newCell, formats) {
    var first = $_7ig6trl8jfeu9jxe.first(oldCell);
    return first.map(function (firstText) {
      var formatSelector = formats.join(',');
      var parents = $_dva6q3kujfeu9juo.ancestors(firstText, formatSelector, function (element) {
        return $_adlyqikbjfeu9js6.eq(element, oldCell);
      });
      return $_8soyqzjsjfeu9jnc.foldr(parents, function (last, parent) {
        var clonedFormat = $_3hnsgql7jfeu9jxb.shallow(parent);
        $_68ujuxl3jfeu9jw9.append(last, clonedFormat);
        return clonedFormat;
      }, newCell);
    }).getOr(newCell);
  };
  var cellOperations = function (mutate, doc, formatsToClone) {
    var newCell = function (prev) {
      var doc = $_dzvm7xk9jfeu9jrm.owner(prev.element());
      var td = $_5csi13k7jfeu9jrb.fromTag($_prkbektjfeu9juk.name(prev.element()), doc.dom());
      var formats = formatsToClone.getOr([
        'strong',
        'em',
        'b',
        'i',
        'span',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'div'
      ]);
      var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
      $_68ujuxl3jfeu9jw9.append(lastNode, $_5csi13k7jfeu9jrb.fromTag('br'));
      $_esap7zl1jfeu9jvv.copy(prev.element(), td);
      $_esap7zl1jfeu9jvv.remove(td, 'height');
      if (prev.colspan() !== 1)
        $_esap7zl1jfeu9jvv.remove(prev.element(), 'width');
      mutate(prev.element(), td);
      return td;
    };
    return {
      row: newRow(doc),
      cell: newCell,
      replace: replace,
      gap: cell$1
    };
  };
  var paste = function (doc) {
    return {
      row: newRow(doc),
      cell: cell$1,
      replace: pasteReplace,
      gap: cell$1
    };
  };
  var $_eqiwv2l6jfeu9jwk = {
    cellOperations: cellOperations,
    paste: paste
  };

  var fromHtml$1 = function (html, scope) {
    var doc = scope || document;
    var div = doc.createElement('div');
    div.innerHTML = html;
    return $_dzvm7xk9jfeu9jrm.children($_5csi13k7jfeu9jrb.fromDom(div));
  };
  var fromTags = function (tags, scope) {
    return $_8soyqzjsjfeu9jnc.map(tags, function (x) {
      return $_5csi13k7jfeu9jrb.fromTag(x, scope);
    });
  };
  var fromText$1 = function (texts, scope) {
    return $_8soyqzjsjfeu9jnc.map(texts, function (x) {
      return $_5csi13k7jfeu9jrb.fromText(x, scope);
    });
  };
  var fromDom$1 = function (nodes) {
    return $_8soyqzjsjfeu9jnc.map(nodes, $_5csi13k7jfeu9jrb.fromDom);
  };
  var $_8mwj6nlcjfeu9jxv = {
    fromHtml: fromHtml$1,
    fromTags: fromTags,
    fromText: fromText$1,
    fromDom: fromDom$1
  };

  var TagBoundaries = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'li',
    'table',
    'thead',
    'tbody',
    'tfoot',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];

  function DomUniverse () {
    var clone = function (element) {
      return $_5csi13k7jfeu9jrb.fromDom(element.dom().cloneNode(false));
    };
    var isBoundary = function (element) {
      if (!$_prkbektjfeu9juk.isElement(element))
        return false;
      if ($_prkbektjfeu9juk.name(element) === 'body')
        return true;
      return $_8soyqzjsjfeu9jnc.contains(TagBoundaries, $_prkbektjfeu9juk.name(element));
    };
    var isEmptyTag = function (element) {
      if (!$_prkbektjfeu9juk.isElement(element))
        return false;
      return $_8soyqzjsjfeu9jnc.contains([
        'br',
        'img',
        'hr',
        'input'
      ], $_prkbektjfeu9juk.name(element));
    };
    var comparePosition = function (element, other) {
      return element.dom().compareDocumentPosition(other.dom());
    };
    var copyAttributesTo = function (source, destination) {
      var as = $_gd427vksjfeu9ju9.clone(source);
      $_gd427vksjfeu9ju9.setAll(destination, as);
    };
    return {
      up: $_8b8jopjujfeu9jnn.constant({
        selector: $_e4f1b4kxjfeu9jv4.ancestor,
        closest: $_e4f1b4kxjfeu9jv4.closest,
        predicate: $_causnjkyjfeu9jv6.ancestor,
        all: $_dzvm7xk9jfeu9jrm.parents
      }),
      down: $_8b8jopjujfeu9jnn.constant({
        selector: $_dva6q3kujfeu9juo.descendants,
        predicate: $_5m9htckvjfeu9juq.descendants
      }),
      styles: $_8b8jopjujfeu9jnn.constant({
        get: $_esap7zl1jfeu9jvv.get,
        getRaw: $_esap7zl1jfeu9jvv.getRaw,
        set: $_esap7zl1jfeu9jvv.set,
        remove: $_esap7zl1jfeu9jvv.remove
      }),
      attrs: $_8b8jopjujfeu9jnn.constant({
        get: $_gd427vksjfeu9ju9.get,
        set: $_gd427vksjfeu9ju9.set,
        remove: $_gd427vksjfeu9ju9.remove,
        copyTo: copyAttributesTo
      }),
      insert: $_8b8jopjujfeu9jnn.constant({
        before: $_68ujuxl3jfeu9jw9.before,
        after: $_68ujuxl3jfeu9jw9.after,
        afterAll: $_fhqznl5jfeu9jwf.after,
        append: $_68ujuxl3jfeu9jw9.append,
        appendAll: $_fhqznl5jfeu9jwf.append,
        prepend: $_68ujuxl3jfeu9jw9.prepend,
        wrap: $_68ujuxl3jfeu9jw9.wrap
      }),
      remove: $_8b8jopjujfeu9jnn.constant({
        unwrap: $_sg34gl4jfeu9jwb.unwrap,
        remove: $_sg34gl4jfeu9jwb.remove
      }),
      create: $_8b8jopjujfeu9jnn.constant({
        nu: $_5csi13k7jfeu9jrb.fromTag,
        clone: clone,
        text: $_5csi13k7jfeu9jrb.fromText
      }),
      query: $_8b8jopjujfeu9jnn.constant({
        comparePosition: comparePosition,
        prevSibling: $_dzvm7xk9jfeu9jrm.prevSibling,
        nextSibling: $_dzvm7xk9jfeu9jrm.nextSibling
      }),
      property: $_8b8jopjujfeu9jnn.constant({
        children: $_dzvm7xk9jfeu9jrm.children,
        name: $_prkbektjfeu9juk.name,
        parent: $_dzvm7xk9jfeu9jrm.parent,
        isText: $_prkbektjfeu9juk.isText,
        isComment: $_prkbektjfeu9juk.isComment,
        isElement: $_prkbektjfeu9juk.isElement,
        getText: $_allfqrlajfeu9jxn.get,
        setText: $_allfqrlajfeu9jxn.set,
        isBoundary: isBoundary,
        isEmptyTag: isEmptyTag
      }),
      eq: $_adlyqikbjfeu9js6.eq,
      is: $_adlyqikbjfeu9js6.is
    };
  }

  var leftRight = $_6s7wfojxjfeu9joz.immutable('left', 'right');
  var bisect = function (universe, parent, child) {
    var children = universe.property().children(parent);
    var index = $_8soyqzjsjfeu9jnc.findIndex(children, $_8b8jopjujfeu9jnn.curry(universe.eq, child));
    return index.map(function (ind) {
      return {
        before: $_8b8jopjujfeu9jnn.constant(children.slice(0, ind)),
        after: $_8b8jopjujfeu9jnn.constant(children.slice(ind + 1))
      };
    });
  };
  var breakToRight = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var second = universe.create().clone(parent);
      universe.insert().appendAll(second, parts.after());
      universe.insert().after(parent, second);
      return leftRight(parent, second);
    });
  };
  var breakToLeft = function (universe, parent, child) {
    return bisect(universe, parent, child).map(function (parts) {
      var prior = universe.create().clone(parent);
      universe.insert().appendAll(prior, parts.before().concat([child]));
      universe.insert().appendAll(parent, parts.after());
      universe.insert().before(parent, prior);
      return leftRight(prior, parent);
    });
  };
  var breakPath = function (universe, item, isTop, breaker) {
    var result = $_6s7wfojxjfeu9joz.immutable('first', 'second', 'splits');
    var next = function (child, group, splits) {
      var fallback = result(child, Option.none(), splits);
      if (isTop(child))
        return result(child, group, splits);
      else {
        return universe.property().parent(child).bind(function (parent) {
          return breaker(universe, parent, child).map(function (breakage) {
            var extra = [{
                first: breakage.left,
                second: breakage.right
              }];
            var nextChild = isTop(parent) ? parent : breakage.left();
            return next(nextChild, Option.some(breakage.right()), splits.concat(extra));
          }).getOr(fallback);
        });
      }
    };
    return next(item, Option.none(), []);
  };
  var $_fof68nlljfeu9k0z = {
    breakToLeft: breakToLeft,
    breakToRight: breakToRight,
    breakPath: breakPath
  };

  var all$3 = function (universe, look, elements, f) {
    var head = elements[0];
    var tail = elements.slice(1);
    return f(universe, look, head, tail);
  };
  var oneAll = function (universe, look, elements) {
    return elements.length > 0 ? all$3(universe, look, elements, unsafeOne) : Option.none();
  };
  var unsafeOne = function (universe, look, head, tail) {
    var start = look(universe, head);
    return $_8soyqzjsjfeu9jnc.foldr(tail, function (b, a) {
      var current = look(universe, a);
      return commonElement(universe, b, current);
    }, start);
  };
  var commonElement = function (universe, start, end) {
    return start.bind(function (s) {
      return end.filter($_8b8jopjujfeu9jnn.curry(universe.eq, s));
    });
  };
  var $_6egwgglmjfeu9k1a = { oneAll: oneAll };

  var eq$1 = function (universe, item) {
    return $_8b8jopjujfeu9jnn.curry(universe.eq, item);
  };
  var unsafeSubset = function (universe, common, ps1, ps2) {
    var children = universe.property().children(common);
    if (universe.eq(common, ps1[0]))
      return Option.some([ps1[0]]);
    if (universe.eq(common, ps2[0]))
      return Option.some([ps2[0]]);
    var finder = function (ps) {
      var topDown = $_8soyqzjsjfeu9jnc.reverse(ps);
      var index = $_8soyqzjsjfeu9jnc.findIndex(topDown, eq$1(universe, common)).getOr(-1);
      var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
      return $_8soyqzjsjfeu9jnc.findIndex(children, eq$1(universe, item));
    };
    var startIndex = finder(ps1);
    var endIndex = finder(ps2);
    return startIndex.bind(function (sIndex) {
      return endIndex.map(function (eIndex) {
        var first = Math.min(sIndex, eIndex);
        var last = Math.max(sIndex, eIndex);
        return children.slice(first, last + 1);
      });
    });
  };
  var ancestors$2 = function (universe, start, end, _isRoot) {
    var isRoot = _isRoot !== undefined ? _isRoot : $_8b8jopjujfeu9jnn.constant(false);
    var ps1 = [start].concat(universe.up().all(start));
    var ps2 = [end].concat(universe.up().all(end));
    var prune = function (path) {
      var index = $_8soyqzjsjfeu9jnc.findIndex(path, isRoot);
      return index.fold(function () {
        return path;
      }, function (ind) {
        return path.slice(0, ind + 1);
      });
    };
    var pruned1 = prune(ps1);
    var pruned2 = prune(ps2);
    var shared = $_8soyqzjsjfeu9jnc.find(pruned1, function (x) {
      return $_8soyqzjsjfeu9jnc.exists(pruned2, eq$1(universe, x));
    });
    return {
      firstpath: $_8b8jopjujfeu9jnn.constant(pruned1),
      secondpath: $_8b8jopjujfeu9jnn.constant(pruned2),
      shared: $_8b8jopjujfeu9jnn.constant(shared)
    };
  };
  var subset = function (universe, start, end) {
    var ancs = ancestors$2(universe, start, end);
    return ancs.shared().bind(function (shared) {
      return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
    });
  };
  var $_4uakdglnjfeu9k1i = {
    subset: subset,
    ancestors: ancestors$2
  };

  var sharedOne = function (universe, look, elements) {
    return $_6egwgglmjfeu9k1a.oneAll(universe, look, elements);
  };
  var subset$1 = function (universe, start, finish) {
    return $_4uakdglnjfeu9k1i.subset(universe, start, finish);
  };
  var ancestors$3 = function (universe, start, finish, _isRoot) {
    return $_4uakdglnjfeu9k1i.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$1 = function (universe, parent, child) {
    return $_fof68nlljfeu9k0z.breakToLeft(universe, parent, child);
  };
  var breakToRight$1 = function (universe, parent, child) {
    return $_fof68nlljfeu9k0z.breakToRight(universe, parent, child);
  };
  var breakPath$1 = function (universe, child, isTop, breaker) {
    return $_fof68nlljfeu9k0z.breakPath(universe, child, isTop, breaker);
  };
  var $_bcyqj8lkjfeu9k0x = {
    sharedOne: sharedOne,
    subset: subset$1,
    ancestors: ancestors$3,
    breakToLeft: breakToLeft$1,
    breakToRight: breakToRight$1,
    breakPath: breakPath$1
  };

  var universe = DomUniverse();
  var sharedOne$1 = function (look, elements) {
    return $_bcyqj8lkjfeu9k0x.sharedOne(universe, function (universe, element) {
      return look(element);
    }, elements);
  };
  var subset$2 = function (start, finish) {
    return $_bcyqj8lkjfeu9k0x.subset(universe, start, finish);
  };
  var ancestors$4 = function (start, finish, _isRoot) {
    return $_bcyqj8lkjfeu9k0x.ancestors(universe, start, finish, _isRoot);
  };
  var breakToLeft$2 = function (parent, child) {
    return $_bcyqj8lkjfeu9k0x.breakToLeft(universe, parent, child);
  };
  var breakToRight$2 = function (parent, child) {
    return $_bcyqj8lkjfeu9k0x.breakToRight(universe, parent, child);
  };
  var breakPath$2 = function (child, isTop, breaker) {
    return $_bcyqj8lkjfeu9k0x.breakPath(universe, child, isTop, function (u, p, c) {
      return breaker(p, c);
    });
  };
  var $_o3fxklhjfeu9jzl = {
    sharedOne: sharedOne$1,
    subset: subset$2,
    ancestors: ancestors$4,
    breakToLeft: breakToLeft$2,
    breakToRight: breakToRight$2,
    breakPath: breakPath$2
  };

  var inSelection = function (bounds, detail) {
    var leftEdge = detail.column();
    var rightEdge = detail.column() + detail.colspan() - 1;
    var topEdge = detail.row();
    var bottomEdge = detail.row() + detail.rowspan() - 1;
    return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
  };
  var isWithin = function (bounds, detail) {
    return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
  };
  var isRectangular = function (warehouse, bounds) {
    var isRect = true;
    var detailIsWithin = $_8b8jopjujfeu9jnn.curry(isWithin, bounds);
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        isRect = isRect && $_8o21o3l0jfeu9jvn.getAt(warehouse, i, j).exists(detailIsWithin);
      }
    }
    return isRect ? Option.some(bounds) : Option.none();
  };
  var $_rrnuqlqjfeu9k23 = {
    inSelection: inSelection,
    isWithin: isWithin,
    isRectangular: isRectangular
  };

  var getBounds = function (detailA, detailB) {
    return $_2crbd2k3jfeu9jpu.bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
  };
  var getAnyBox = function (warehouse, startCell, finishCell) {
    var startCoords = $_8o21o3l0jfeu9jvn.findItem(warehouse, startCell, $_adlyqikbjfeu9js6.eq);
    var finishCoords = $_8o21o3l0jfeu9jvn.findItem(warehouse, finishCell, $_adlyqikbjfeu9js6.eq);
    return startCoords.bind(function (sc) {
      return finishCoords.map(function (fc) {
        return getBounds(sc, fc);
      });
    });
  };
  var getBox = function (warehouse, startCell, finishCell) {
    return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
      return $_rrnuqlqjfeu9k23.isRectangular(warehouse, bounds);
    });
  };
  var $_c7nii8lrjfeu9k29 = {
    getAnyBox: getAnyBox,
    getBox: getBox
  };

  var moveBy = function (warehouse, cell, row, column) {
    return $_8o21o3l0jfeu9jvn.findItem(warehouse, cell, $_adlyqikbjfeu9js6.eq).bind(function (detail) {
      var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
      var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
      var dest = $_8o21o3l0jfeu9jvn.getAt(warehouse, startRow + row, startCol + column);
      return dest.map(function (d) {
        return d.element();
      });
    });
  };
  var intercepts = function (warehouse, start, finish) {
    return $_c7nii8lrjfeu9k29.getAnyBox(warehouse, start, finish).map(function (bounds) {
      var inside = $_8o21o3l0jfeu9jvn.filterItems(warehouse, $_8b8jopjujfeu9jnn.curry($_rrnuqlqjfeu9k23.inSelection, bounds));
      return $_8soyqzjsjfeu9jnc.map(inside, function (detail) {
        return detail.element();
      });
    });
  };
  var parentCell = function (warehouse, innerCell) {
    var isContainedBy = function (c1, c2) {
      return $_adlyqikbjfeu9js6.contains(c2, c1);
    };
    return $_8o21o3l0jfeu9jvn.findItem(warehouse, innerCell, isContainedBy).bind(function (detail) {
      return detail.element();
    });
  };
  var $_8ibdg2lpjfeu9k1v = {
    moveBy: moveBy,
    intercepts: intercepts,
    parentCell: parentCell
  };

  var moveBy$1 = function (cell, deltaRow, deltaColumn) {
    return $_811muwk4jfeu9jq0.table(cell).bind(function (table) {
      var warehouse = getWarehouse(table);
      return $_8ibdg2lpjfeu9k1v.moveBy(warehouse, cell, deltaRow, deltaColumn);
    });
  };
  var intercepts$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_8ibdg2lpjfeu9k1v.intercepts(warehouse, first, last);
  };
  var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
    var warehouse = getWarehouse(table);
    var startCell = $_adlyqikbjfeu9js6.eq(table, firstTable) ? first : $_8ibdg2lpjfeu9k1v.parentCell(warehouse, first);
    var lastCell = $_adlyqikbjfeu9js6.eq(table, lastTable) ? last : $_8ibdg2lpjfeu9k1v.parentCell(warehouse, last);
    return $_8ibdg2lpjfeu9k1v.intercepts(warehouse, startCell, lastCell);
  };
  var getBox$1 = function (table, first, last) {
    var warehouse = getWarehouse(table);
    return $_c7nii8lrjfeu9k29.getBox(warehouse, first, last);
  };
  var getWarehouse = function (table) {
    var list = $_csfqqxk2jfeu9jph.fromTable(table);
    return $_8o21o3l0jfeu9jvn.generate(list);
  };
  var $_djpqqslojfeu9k1q = {
    moveBy: moveBy$1,
    intercepts: intercepts$1,
    nestedIntercepts: nestedIntercepts,
    getBox: getBox$1
  };

  var lookupTable = function (container, isRoot) {
    return $_e4f1b4kxjfeu9jv4.ancestor(container, 'table');
  };
  var identified = $_6s7wfojxjfeu9joz.immutableBag([
    'boxes',
    'start',
    'finish'
  ], []);
  var identify = function (start, finish, isRoot) {
    var getIsRoot = function (rootTable) {
      return function (element) {
        return isRoot(element) || $_adlyqikbjfeu9js6.eq(element, rootTable);
      };
    };
    if ($_adlyqikbjfeu9js6.eq(start, finish)) {
      return Option.some(identified({
        boxes: Option.some([start]),
        start: start,
        finish: finish
      }));
    } else {
      return lookupTable(start, isRoot).bind(function (startTable) {
        return lookupTable(finish, isRoot).bind(function (finishTable) {
          if ($_adlyqikbjfeu9js6.eq(startTable, finishTable)) {
            return Option.some(identified({
              boxes: $_djpqqslojfeu9k1q.intercepts(startTable, start, finish),
              start: start,
              finish: finish
            }));
          } else if ($_adlyqikbjfeu9js6.contains(startTable, finishTable)) {
            var ancestorCells = $_dva6q3kujfeu9juo.ancestors(finish, 'td,th', getIsRoot(startTable));
            var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
            return Option.some(identified({
              boxes: $_djpqqslojfeu9k1q.nestedIntercepts(startTable, start, startTable, finish, finishTable),
              start: start,
              finish: finishCell
            }));
          } else if ($_adlyqikbjfeu9js6.contains(finishTable, startTable)) {
            var ancestorCells = $_dva6q3kujfeu9juo.ancestors(start, 'td,th', getIsRoot(finishTable));
            var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
            return Option.some(identified({
              boxes: $_djpqqslojfeu9k1q.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
              start: start,
              finish: startCell
            }));
          } else {
            return $_o3fxklhjfeu9jzl.ancestors(start, finish).shared().bind(function (lca) {
              return $_e4f1b4kxjfeu9jv4.closest(lca, 'table', isRoot).bind(function (lcaTable) {
                var finishAncestorCells = $_dva6q3kujfeu9juo.ancestors(finish, 'td,th', getIsRoot(lcaTable));
                var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                var startAncestorCells = $_dva6q3kujfeu9juo.ancestors(start, 'td,th', getIsRoot(lcaTable));
                var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                return Option.some(identified({
                  boxes: $_djpqqslojfeu9k1q.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                  start: startCell,
                  finish: finishCell
                }));
              });
            });
          }
        });
      });
    }
  };
  var retrieve = function (container, selector) {
    var sels = $_dva6q3kujfeu9juo.descendants(container, selector);
    return sels.length > 0 ? Option.some(sels) : Option.none();
  };
  var getLast = function (boxes, lastSelectedSelector) {
    return $_8soyqzjsjfeu9jnc.find(boxes, function (box) {
      return $_ddcrggk6jfeu9jr0.is(box, lastSelectedSelector);
    });
  };
  var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_e4f1b4kxjfeu9jv4.descendant(container, firstSelectedSelector).bind(function (first) {
      return $_e4f1b4kxjfeu9jv4.descendant(container, lastSelectedSelector).bind(function (last) {
        return $_o3fxklhjfeu9jzl.sharedOne(lookupTable, [
          first,
          last
        ]).map(function (tbl) {
          return {
            first: $_8b8jopjujfeu9jnn.constant(first),
            last: $_8b8jopjujfeu9jnn.constant(last),
            table: $_8b8jopjujfeu9jnn.constant(tbl)
          };
        });
      });
    });
  };
  var expandTo = function (finish, firstSelectedSelector) {
    return $_e4f1b4kxjfeu9jv4.ancestor(finish, 'table').bind(function (table) {
      return $_e4f1b4kxjfeu9jv4.descendant(table, firstSelectedSelector).bind(function (start) {
        return identify(start, finish).bind(function (identified) {
          return identified.boxes().map(function (boxes) {
            return {
              boxes: $_8b8jopjujfeu9jnn.constant(boxes),
              start: $_8b8jopjujfeu9jnn.constant(identified.start()),
              finish: $_8b8jopjujfeu9jnn.constant(identified.finish())
            };
          });
        });
      });
    });
  };
  var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
    return getLast(boxes, lastSelectedSelector).bind(function (last) {
      return $_djpqqslojfeu9k1q.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
        return expandTo(finish, firstSelectedSelector);
      });
    });
  };
  var $_38fsr3lgjfeu9jyw = {
    identify: identify,
    retrieve: retrieve,
    shiftSelection: shiftSelection,
    getEdges: getEdges
  };

  var retrieve$1 = function (container, selector) {
    return $_38fsr3lgjfeu9jyw.retrieve(container, selector);
  };
  var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
    return $_38fsr3lgjfeu9jyw.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
      var isRoot = function (ancestor) {
        return $_adlyqikbjfeu9js6.eq(container, ancestor);
      };
      var firstAncestor = $_e4f1b4kxjfeu9jv4.ancestor(edges.first(), 'thead,tfoot,tbody,table', isRoot);
      var lastAncestor = $_e4f1b4kxjfeu9jv4.ancestor(edges.last(), 'thead,tfoot,tbody,table', isRoot);
      return firstAncestor.bind(function (fA) {
        return lastAncestor.bind(function (lA) {
          return $_adlyqikbjfeu9js6.eq(fA, lA) ? $_djpqqslojfeu9k1q.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
        });
      });
    });
  };
  var $_1n2uwzlfjfeu9jyj = {
    retrieve: retrieve$1,
    retrieveBox: retrieveBox
  };

  var selected = 'data-mce-selected';
  var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
  var attributeSelector = '[' + selected + ']';
  var firstSelected = 'data-mce-first-selected';
  var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
  var lastSelected = 'data-mce-last-selected';
  var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
  var $_2lc5wjlsjfeu9k2e = {
    selected: $_8b8jopjujfeu9jnn.constant(selected),
    selectedSelector: $_8b8jopjujfeu9jnn.constant(selectedSelector),
    attributeSelector: $_8b8jopjujfeu9jnn.constant(attributeSelector),
    firstSelected: $_8b8jopjujfeu9jnn.constant(firstSelected),
    firstSelectedSelector: $_8b8jopjujfeu9jnn.constant(firstSelectedSelector),
    lastSelected: $_8b8jopjujfeu9jnn.constant(lastSelected),
    lastSelectedSelector: $_8b8jopjujfeu9jnn.constant(lastSelectedSelector)
  };

  var generate$1 = function (cases) {
    if (!$_91jv01k1jfeu9jpc.isArray(cases)) {
      throw new Error('cases must be an array');
    }
    if (cases.length === 0) {
      throw new Error('there must be at least one case');
    }
    var constructors = [];
    var adt = {};
    $_8soyqzjsjfeu9jnc.each(cases, function (acase, count) {
      var keys = $_1iiwlojwjfeu9jou.keys(acase);
      if (keys.length !== 1) {
        throw new Error('one and only one name per case');
      }
      var key = keys[0];
      var value = acase[key];
      if (adt[key] !== undefined) {
        throw new Error('duplicate key detected:' + key);
      } else if (key === 'cata') {
        throw new Error('cannot have a case named cata (sorry)');
      } else if (!$_91jv01k1jfeu9jpc.isArray(value)) {
        throw new Error('case arguments must be an array');
      }
      constructors.push(key);
      adt[key] = function () {
        var argLength = arguments.length;
        if (argLength !== value.length) {
          throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
        }
        var args = new Array(argLength);
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        var match = function (branches) {
          var branchKeys = $_1iiwlojwjfeu9jou.keys(branches);
          if (constructors.length !== branchKeys.length) {
            throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
          }
          var allReqd = $_8soyqzjsjfeu9jnc.forall(constructors, function (reqKey) {
            return $_8soyqzjsjfeu9jnc.contains(branchKeys, reqKey);
          });
          if (!allReqd)
            throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
          return branches[key].apply(null, args);
        };
        return {
          fold: function () {
            if (arguments.length !== cases.length) {
              throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
            }
            var target = arguments[count];
            return target.apply(null, args);
          },
          match: match,
          log: function (label) {
            console.log(label, {
              constructors: constructors,
              constructor: key,
              params: args
            });
          }
        };
      };
    });
    return adt;
  };
  var $_8miy51lujfeu9k2p = { generate: generate$1 };

  var type$1 = $_8miy51lujfeu9k2p.generate([
    { none: [] },
    { multiple: ['elements'] },
    { single: ['selection'] }
  ]);
  var cata = function (subject, onNone, onMultiple, onSingle) {
    return subject.fold(onNone, onMultiple, onSingle);
  };
  var $_he7ygltjfeu9k2k = {
    cata: cata,
    none: type$1.none,
    multiple: type$1.multiple,
    single: type$1.single
  };

  var selection = function (cell, selections) {
    return $_he7ygltjfeu9k2k.cata(selections.get(), $_8b8jopjujfeu9jnn.constant([]), $_8b8jopjujfeu9jnn.identity, $_8b8jopjujfeu9jnn.constant([cell]));
  };
  var unmergable = function (cell, selections) {
    var hasSpan = function (elem) {
      return $_gd427vksjfeu9ju9.has(elem, 'rowspan') && parseInt($_gd427vksjfeu9ju9.get(elem, 'rowspan'), 10) > 1 || $_gd427vksjfeu9ju9.has(elem, 'colspan') && parseInt($_gd427vksjfeu9ju9.get(elem, 'colspan'), 10) > 1;
    };
    var candidates = selection(cell, selections);
    return candidates.length > 0 && $_8soyqzjsjfeu9jnc.forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
  };
  var mergable = function (table, selections) {
    return $_he7ygltjfeu9k2k.cata(selections.get(), Option.none, function (cells, _env) {
      if (cells.length === 0) {
        return Option.none();
      }
      return $_1n2uwzlfjfeu9jyj.retrieveBox(table, $_2lc5wjlsjfeu9k2e.firstSelectedSelector(), $_2lc5wjlsjfeu9k2e.lastSelectedSelector()).bind(function (bounds) {
        return cells.length > 1 ? Option.some({
          bounds: $_8b8jopjujfeu9jnn.constant(bounds),
          cells: $_8b8jopjujfeu9jnn.constant(cells)
        }) : Option.none();
      });
    }, Option.none);
  };
  var $_9sddclejfeu9jy6 = {
    mergable: mergable,
    unmergable: unmergable,
    selection: selection
  };

  var noMenu = function (cell) {
    return {
      element: $_8b8jopjujfeu9jnn.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_8b8jopjujfeu9jnn.constant([cell])
    };
  };
  var forMenu = function (selections, table, cell) {
    return {
      element: $_8b8jopjujfeu9jnn.constant(cell),
      mergable: $_8b8jopjujfeu9jnn.constant($_9sddclejfeu9jy6.mergable(table, selections)),
      unmergable: $_8b8jopjujfeu9jnn.constant($_9sddclejfeu9jy6.unmergable(cell, selections)),
      selection: $_8b8jopjujfeu9jnn.constant($_9sddclejfeu9jy6.selection(cell, selections))
    };
  };
  var notCell$1 = function (element) {
    return noMenu(element);
  };
  var paste$1 = $_6s7wfojxjfeu9joz.immutable('element', 'clipboard', 'generators');
  var pasteRows = function (selections, table, cell, clipboard, generators) {
    return {
      element: $_8b8jopjujfeu9jnn.constant(cell),
      mergable: Option.none,
      unmergable: Option.none,
      selection: $_8b8jopjujfeu9jnn.constant($_9sddclejfeu9jy6.selection(cell, selections)),
      clipboard: $_8b8jopjujfeu9jnn.constant(clipboard),
      generators: $_8b8jopjujfeu9jnn.constant(generators)
    };
  };
  var $_5sslqzldjfeu9jxz = {
    noMenu: noMenu,
    forMenu: forMenu,
    notCell: notCell$1,
    paste: paste$1,
    pasteRows: pasteRows
  };

  var extractSelected = function (cells) {
    return $_811muwk4jfeu9jq0.table(cells[0]).map($_3hnsgql7jfeu9jxb.deep).map(function (replica) {
      return [$_gabp30jvjfeu9jns.extract(replica, $_2lc5wjlsjfeu9k2e.attributeSelector())];
    });
  };
  var serializeElement = function (editor, elm) {
    return editor.selection.serializer.serialize(elm.dom(), {});
  };
  var registerEvents = function (editor, selections, actions, cellSelection) {
    editor.on('BeforeGetContent', function (e) {
      var multiCellContext = function (cells) {
        e.preventDefault();
        extractSelected(cells).each(function (elements) {
          e.content = $_8soyqzjsjfeu9jnc.map(elements, function (elm) {
            return serializeElement(editor, elm);
          }).join('');
        });
      };
      if (e.selection === true) {
        $_he7ygltjfeu9k2k.cata(selections.get(), $_8b8jopjujfeu9jnn.noop, multiCellContext, $_8b8jopjujfeu9jnn.noop);
      }
    });
    editor.on('BeforeSetContent', function (e) {
      if (e.selection === true && e.paste === true) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        cellOpt.each(function (domCell) {
          var cell = $_5csi13k7jfeu9jrb.fromDom(domCell);
          var table = $_811muwk4jfeu9jq0.table(cell);
          table.bind(function (table) {
            var elements = $_8soyqzjsjfeu9jnc.filter($_8mwj6nlcjfeu9jxv.fromHtml(e.content), function (content) {
              return $_prkbektjfeu9juk.name(content) !== 'meta';
            });
            if (elements.length === 1 && $_prkbektjfeu9juk.name(elements[0]) === 'table') {
              e.preventDefault();
              var doc = $_5csi13k7jfeu9jrb.fromDom(editor.getDoc());
              var generators = $_eqiwv2l6jfeu9jwk.paste(doc);
              var targets = $_5sslqzldjfeu9jxz.paste(cell, elements[0], generators);
              actions.pasteCells(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            }
          });
        });
      }
    });
  };
  var $_cbecomjrjfeu9jmg = { registerEvents: registerEvents };

  function Dimension (name, getOffset) {
    var set = function (element, h) {
      if (!$_91jv01k1jfeu9jpc.isNumber(h) && !h.match(/^[0-9]+$/))
        throw name + '.set accepts only positive integer values. Value was ' + h;
      var dom = element.dom();
      if ($_ff751fl2jfeu9jw7.isSupported(dom))
        dom.style[name] = h + 'px';
    };
    var get = function (element) {
      var r = getOffset(element);
      if (r <= 0 || r === null) {
        var css = $_esap7zl1jfeu9jvv.get(element, name);
        return parseFloat(css) || 0;
      }
      return r;
    };
    var getOuter = get;
    var aggregate = function (element, properties) {
      return $_8soyqzjsjfeu9jnc.foldl(properties, function (acc, property) {
        var val = $_esap7zl1jfeu9jvv.get(element, property);
        var value = val === undefined ? 0 : parseInt(val, 10);
        return isNaN(value) ? acc : acc + value;
      }, 0);
    };
    var max = function (element, value, properties) {
      var cumulativeInclusions = aggregate(element, properties);
      var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
      return absoluteMax;
    };
    return {
      set: set,
      get: get,
      getOuter: getOuter,
      aggregate: aggregate,
      max: max
    };
  }

  var api$1 = Dimension('height', function (element) {
    return $_6mhhmqkwjfeu9juu.inBody(element) ? element.dom().getBoundingClientRect().height : element.dom().offsetHeight;
  });
  var set$3 = function (element, h) {
    api$1.set(element, h);
  };
  var get$3 = function (element) {
    return api$1.get(element);
  };
  var getOuter = function (element) {
    return api$1.getOuter(element);
  };
  var setMax = function (element, value) {
    var inclusions = [
      'margin-top',
      'border-top-width',
      'padding-top',
      'padding-bottom',
      'border-bottom-width',
      'margin-bottom'
    ];
    var absMax = api$1.max(element, value, inclusions);
    $_esap7zl1jfeu9jvv.set(element, 'max-height', absMax + 'px');
  };
  var $_ewjs1xlzjfeu9k4c = {
    set: set$3,
    get: get$3,
    getOuter: getOuter,
    setMax: setMax
  };

  var api$2 = Dimension('width', function (element) {
    return element.dom().offsetWidth;
  });
  var set$4 = function (element, h) {
    api$2.set(element, h);
  };
  var get$4 = function (element) {
    return api$2.get(element);
  };
  var getOuter$1 = function (element) {
    return api$2.getOuter(element);
  };
  var setMax$1 = function (element, value) {
    var inclusions = [
      'margin-left',
      'border-left-width',
      'padding-left',
      'padding-right',
      'border-right-width',
      'margin-right'
    ];
    var absMax = api$2.max(element, value, inclusions);
    $_esap7zl1jfeu9jvv.set(element, 'max-width', absMax + 'px');
  };
  var $_5oyednm1jfeu9k4m = {
    set: set$4,
    get: get$4,
    getOuter: getOuter$1,
    setMax: setMax$1
  };

  var platform = $_d2ygmokgjfeu9jsv.detect();
  var needManualCalc = function () {
    return platform.browser.isIE() || platform.browser.isEdge();
  };
  var toNumber = function (px, fallback) {
    var num = parseFloat(px);
    return isNaN(num) ? fallback : num;
  };
  var getProp = function (elm, name, fallback) {
    return toNumber($_esap7zl1jfeu9jvv.get(elm, name), fallback);
  };
  var getCalculatedHeight = function (cell) {
    var paddingTop = getProp(cell, 'padding-top', 0);
    var paddingBottom = getProp(cell, 'padding-bottom', 0);
    var borderTop = getProp(cell, 'border-top-width', 0);
    var borderBottom = getProp(cell, 'border-bottom-width', 0);
    var height = cell.dom().getBoundingClientRect().height;
    var boxSizing = $_esap7zl1jfeu9jvv.get(cell, 'box-sizing');
    var borders = borderTop + borderBottom;
    return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
  };
  var getWidth = function (cell) {
    return getProp(cell, 'width', $_5oyednm1jfeu9k4m.get(cell));
  };
  var getHeight = function (cell) {
    return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', $_ewjs1xlzjfeu9k4c.get(cell));
  };
  var $_dnd84ulyjfeu9k40 = {
    getWidth: getWidth,
    getHeight: getHeight
  };

  var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
  var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
  var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
  var setPixelWidth = function (cell, amount) {
    $_esap7zl1jfeu9jvv.set(cell, 'width', amount + 'px');
  };
  var setPercentageWidth = function (cell, amount) {
    $_esap7zl1jfeu9jvv.set(cell, 'width', amount + '%');
  };
  var setHeight = function (cell, amount) {
    $_esap7zl1jfeu9jvv.set(cell, 'height', amount + 'px');
  };
  var getHeightValue = function (cell) {
    return $_esap7zl1jfeu9jvv.getRaw(cell, 'height').getOrThunk(function () {
      return $_dnd84ulyjfeu9k40.getHeight(cell) + 'px';
    });
  };
  var convert = function (cell, number, getter, setter) {
    var newSize = $_811muwk4jfeu9jq0.table(cell).map(function (table) {
      var total = getter(table);
      return Math.floor(number / 100 * total);
    }).getOr(number);
    setter(cell, newSize);
    return newSize;
  };
  var normalizePixelSize = function (value, cell, getter, setter) {
    var number = parseInt(value, 10);
    return $_9n1rztkpjfeu9ju0.endsWith(value, '%') && $_prkbektjfeu9juk.name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
  };
  var getTotalHeight = function (cell) {
    var value = getHeightValue(cell);
    if (!value)
      return $_ewjs1xlzjfeu9k4c.get(cell);
    return normalizePixelSize(value, cell, $_ewjs1xlzjfeu9k4c.get, setHeight);
  };
  var get$5 = function (cell, type, f) {
    var v = f(cell);
    var span = getSpan(cell, type);
    return v / span;
  };
  var getSpan = function (cell, type) {
    return $_gd427vksjfeu9ju9.has(cell, type) ? parseInt($_gd427vksjfeu9ju9.get(cell, type), 10) : 1;
  };
  var getRawWidth = function (element) {
    var cssWidth = $_esap7zl1jfeu9jvv.getRaw(element, 'width');
    return cssWidth.fold(function () {
      return Option.from($_gd427vksjfeu9ju9.get(element, 'width'));
    }, function (width) {
      return Option.some(width);
    });
  };
  var normalizePercentageWidth = function (cellWidth, tableSize) {
    return cellWidth / tableSize.pixelWidth() * 100;
  };
  var choosePercentageSize = function (element, width, tableSize) {
    if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      return parseFloat(percentMatch[1]);
    } else {
      var fallbackWidth = $_5oyednm1jfeu9k4m.get(element);
      var intWidth = parseInt(fallbackWidth, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }
  };
  var getPercentageWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_5oyednm1jfeu9k4m.get(cell);
      var intWidth = parseInt(width, 10);
      return normalizePercentageWidth(intWidth, tableSize);
    }, function (width) {
      return choosePercentageSize(cell, width, tableSize);
    });
  };
  var normalizePixelWidth = function (cellWidth, tableSize) {
    return cellWidth / 100 * tableSize.pixelWidth();
  };
  var choosePixelSize = function (element, width, tableSize) {
    if (pixelBasedSizeRegex.test(width)) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      return parseInt(pixelMatch[1], 10);
    } else if (percentageBasedSizeRegex.test(width)) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      var floatWidth = parseFloat(percentMatch[1]);
      return normalizePixelWidth(floatWidth, tableSize);
    } else {
      var fallbackWidth = $_5oyednm1jfeu9k4m.get(element);
      return parseInt(fallbackWidth, 10);
    }
  };
  var getPixelWidth = function (cell, tableSize) {
    var width = getRawWidth(cell);
    return width.fold(function () {
      var width = $_5oyednm1jfeu9k4m.get(cell);
      var intWidth = parseInt(width, 10);
      return intWidth;
    }, function (width) {
      return choosePixelSize(cell, width, tableSize);
    });
  };
  var getHeight$1 = function (cell) {
    return get$5(cell, 'rowspan', getTotalHeight);
  };
  var getGenericWidth = function (cell) {
    var width = getRawWidth(cell);
    return width.bind(function (width) {
      if (genericSizeRegex.test(width)) {
        var match = genericSizeRegex.exec(width);
        return Option.some({
          width: $_8b8jopjujfeu9jnn.constant(match[1]),
          unit: $_8b8jopjujfeu9jnn.constant(match[3])
        });
      } else {
        return Option.none();
      }
    });
  };
  var setGenericWidth = function (cell, amount, unit) {
    $_esap7zl1jfeu9jvv.set(cell, 'width', amount + unit);
  };
  var $_2mynphlxjfeu9k3h = {
    percentageBasedSizeRegex: $_8b8jopjujfeu9jnn.constant(percentageBasedSizeRegex),
    pixelBasedSizeRegex: $_8b8jopjujfeu9jnn.constant(pixelBasedSizeRegex),
    setPixelWidth: setPixelWidth,
    setPercentageWidth: setPercentageWidth,
    setHeight: setHeight,
    getPixelWidth: getPixelWidth,
    getPercentageWidth: getPercentageWidth,
    getGenericWidth: getGenericWidth,
    setGenericWidth: setGenericWidth,
    getHeight: getHeight$1,
    getRawWidth: getRawWidth
  };

  var halve = function (main, other) {
    var width = $_2mynphlxjfeu9k3h.getGenericWidth(main);
    width.each(function (width) {
      var newWidth = width.width() / 2;
      $_2mynphlxjfeu9k3h.setGenericWidth(main, newWidth, width.unit());
      $_2mynphlxjfeu9k3h.setGenericWidth(other, newWidth, width.unit());
    });
  };
  var $_f59omrlwjfeu9k3d = { halve: halve };

  var attached = function (element, scope) {
    var doc = scope || $_5csi13k7jfeu9jrb.fromDom(document.documentElement);
    return $_causnjkyjfeu9jv6.ancestor(element, $_8b8jopjujfeu9jnn.curry($_adlyqikbjfeu9js6.eq, doc)).isSome();
  };
  var windowOf = function (element) {
    var dom = element.dom();
    if (dom === dom.window)
      return element;
    return $_prkbektjfeu9juk.isDocument(element) ? dom.defaultView || dom.parentWindow : null;
  };
  var $_eob7zum6jfeu9k5d = {
    attached: attached,
    windowOf: windowOf
  };

  var r = function (left, top) {
    var translate = function (x, y) {
      return r(left + x, top + y);
    };
    return {
      left: $_8b8jopjujfeu9jnn.constant(left),
      top: $_8b8jopjujfeu9jnn.constant(top),
      translate: translate
    };
  };

  var boxPosition = function (dom) {
    var box = dom.getBoundingClientRect();
    return r(box.left, box.top);
  };
  var firstDefinedOrZero = function (a, b) {
    return a !== undefined ? a : b !== undefined ? b : 0;
  };
  var absolute = function (element) {
    var doc = element.dom().ownerDocument;
    var body = doc.body;
    var win = $_eob7zum6jfeu9k5d.windowOf($_5csi13k7jfeu9jrb.fromDom(doc));
    var html = doc.documentElement;
    var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
    var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
    var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
    var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
    return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
  };
  var relative = function (element) {
    var dom = element.dom();
    return r(dom.offsetLeft, dom.offsetTop);
  };
  var viewport = function (element) {
    var dom = element.dom();
    var doc = dom.ownerDocument;
    var body = doc.body;
    var html = $_5csi13k7jfeu9jrb.fromDom(doc.documentElement);
    if (body === dom)
      return r(body.offsetLeft, body.offsetTop);
    if (!$_eob7zum6jfeu9k5d.attached(element, html))
      return r(0, 0);
    return boxPosition(dom);
  };
  var $_7hhj6fm5jfeu9k5b = {
    absolute: absolute,
    relative: relative,
    viewport: viewport
  };

  var rowInfo = $_6s7wfojxjfeu9joz.immutable('row', 'y');
  var colInfo = $_6s7wfojxjfeu9joz.immutable('col', 'x');
  var rtlEdge = function (cell) {
    var pos = $_7hhj6fm5jfeu9k5b.absolute(cell);
    return pos.left() + $_5oyednm1jfeu9k4m.getOuter(cell);
  };
  var ltrEdge = function (cell) {
    return $_7hhj6fm5jfeu9k5b.absolute(cell).left();
  };
  var getLeftEdge = function (index, cell) {
    return colInfo(index, ltrEdge(cell));
  };
  var getRightEdge = function (index, cell) {
    return colInfo(index, rtlEdge(cell));
  };
  var getTop = function (cell) {
    return $_7hhj6fm5jfeu9k5b.absolute(cell).top();
  };
  var getTopEdge = function (index, cell) {
    return rowInfo(index, getTop(cell));
  };
  var getBottomEdge = function (index, cell) {
    return rowInfo(index, getTop(cell) + $_ewjs1xlzjfeu9k4c.getOuter(cell));
  };
  var findPositions = function (getInnerEdge, getOuterEdge, array) {
    if (array.length === 0)
      return [];
    var lines = $_8soyqzjsjfeu9jnc.map(array.slice(1), function (cellOption, index) {
      return cellOption.map(function (cell) {
        return getInnerEdge(index, cell);
      });
    });
    var lastLine = array[array.length - 1].map(function (cell) {
      return getOuterEdge(array.length - 1, cell);
    });
    return lines.concat([lastLine]);
  };
  var negate = function (step, _table) {
    return -step;
  };
  var height = {
    delta: $_8b8jopjujfeu9jnn.identity,
    positions: $_8b8jopjujfeu9jnn.curry(findPositions, getTopEdge, getBottomEdge),
    edge: getTop
  };
  var ltr = {
    delta: $_8b8jopjujfeu9jnn.identity,
    edge: ltrEdge,
    positions: $_8b8jopjujfeu9jnn.curry(findPositions, getLeftEdge, getRightEdge)
  };
  var rtl = {
    delta: negate,
    edge: rtlEdge,
    positions: $_8b8jopjujfeu9jnn.curry(findPositions, getRightEdge, getLeftEdge)
  };
  var $_edppk0m4jfeu9k4t = {
    height: height,
    rtl: rtl,
    ltr: ltr
  };

  var $_4u5ojlm3jfeu9k4r = {
    ltr: $_edppk0m4jfeu9k4t.ltr,
    rtl: $_edppk0m4jfeu9k4t.rtl
  };

  function TableDirection (directionAt) {
    var auto = function (table) {
      return directionAt(table).isRtl() ? $_4u5ojlm3jfeu9k4r.rtl : $_4u5ojlm3jfeu9k4r.ltr;
    };
    var delta = function (amount, table) {
      return auto(table).delta(amount, table);
    };
    var positions = function (cols, table) {
      return auto(table).positions(cols, table);
    };
    var edge = function (cell) {
      return auto(cell).edge(cell);
    };
    return {
      delta: delta,
      edge: edge,
      positions: positions
    };
  }

  var getGridSize = function (table) {
    var input = $_csfqqxk2jfeu9jph.fromTable(table);
    var warehouse = $_8o21o3l0jfeu9jvn.generate(input);
    return warehouse.grid();
  };
  var $_9lz68em8jfeu9k5m = { getGridSize: getGridSize };

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

  var base = function (handleUnsupported, required) {
    return baseWith(handleUnsupported, required, {
      validate: $_91jv01k1jfeu9jpc.isFunction,
      label: 'function'
    });
  };
  var baseWith = function (handleUnsupported, required, pred) {
    if (required.length === 0)
      throw new Error('You must specify at least one required field.');
    $_d8grzfk0jfeu9jp9.validateStrArr('required', required);
    $_d8grzfk0jfeu9jp9.checkDupes(required);
    return function (obj) {
      var keys = $_1iiwlojwjfeu9jou.keys(obj);
      var allReqd = $_8soyqzjsjfeu9jnc.forall(required, function (req) {
        return $_8soyqzjsjfeu9jnc.contains(keys, req);
      });
      if (!allReqd)
        $_d8grzfk0jfeu9jp9.reqMessage(required, keys);
      handleUnsupported(required, keys);
      var invalidKeys = $_8soyqzjsjfeu9jnc.filter(required, function (key) {
        return !pred.validate(obj[key], key);
      });
      if (invalidKeys.length > 0)
        $_d8grzfk0jfeu9jp9.invalidTypeMessage(invalidKeys, pred.label);
      return obj;
    };
  };
  var handleExact = function (required, keys) {
    var unsupported = $_8soyqzjsjfeu9jnc.filter(keys, function (key) {
      return !$_8soyqzjsjfeu9jnc.contains(required, key);
    });
    if (unsupported.length > 0)
      $_d8grzfk0jfeu9jp9.unsuppMessage(unsupported);
  };
  var allowExtra = $_8b8jopjujfeu9jnn.noop;
  var $_1dhdbrmcjfeu9k6l = {
    exactly: $_8b8jopjujfeu9jnn.curry(base, handleExact),
    ensure: $_8b8jopjujfeu9jnn.curry(base, allowExtra),
    ensureWith: $_8b8jopjujfeu9jnn.curry(baseWith, allowExtra)
  };

  var elementToData = function (element) {
    var colspan = $_gd427vksjfeu9ju9.has(element, 'colspan') ? parseInt($_gd427vksjfeu9ju9.get(element, 'colspan'), 10) : 1;
    var rowspan = $_gd427vksjfeu9ju9.has(element, 'rowspan') ? parseInt($_gd427vksjfeu9ju9.get(element, 'rowspan'), 10) : 1;
    return {
      element: $_8b8jopjujfeu9jnn.constant(element),
      colspan: $_8b8jopjujfeu9jnn.constant(colspan),
      rowspan: $_8b8jopjujfeu9jnn.constant(rowspan)
    };
  };
  var modification = function (generators, _toData) {
    contract(generators);
    var position = Cell(Option.none());
    var toData = _toData !== undefined ? _toData : elementToData;
    var nu = function (data) {
      return generators.cell(data);
    };
    var nuFrom = function (element) {
      var data = toData(element);
      return nu(data);
    };
    var add = function (element) {
      var replacement = nuFrom(element);
      if (position.get().isNone())
        position.set(Option.some(replacement));
      recent = Option.some({
        item: element,
        replacement: replacement
      });
      return replacement;
    };
    var recent = Option.none();
    var getOrInit = function (element, comparator) {
      return recent.fold(function () {
        return add(element);
      }, function (p) {
        return comparator(element, p.item) ? p.replacement : add(element);
      });
    };
    return {
      getOrInit: getOrInit,
      cursor: position.get
    };
  };
  var transform = function (scope, tag) {
    return function (generators) {
      var position = Cell(Option.none());
      contract(generators);
      var list = [];
      var find = function (element, comparator) {
        return $_8soyqzjsjfeu9jnc.find(list, function (x) {
          return comparator(x.item, element);
        });
      };
      var makeNew = function (element) {
        var cell = generators.replace(element, tag, { scope: scope });
        list.push({
          item: element,
          sub: cell
        });
        if (position.get().isNone())
          position.set(Option.some(cell));
        return cell;
      };
      var replaceOrInit = function (element, comparator) {
        return find(element, comparator).fold(function () {
          return makeNew(element);
        }, function (p) {
          return comparator(element, p.item) ? p.sub : makeNew(element);
        });
      };
      return {
        replaceOrInit: replaceOrInit,
        cursor: position.get
      };
    };
  };
  var merging = function (generators) {
    contract(generators);
    var position = Cell(Option.none());
    var combine = function (cell) {
      if (position.get().isNone())
        position.set(Option.some(cell));
      return function () {
        var raw = generators.cell({
          element: $_8b8jopjujfeu9jnn.constant(cell),
          colspan: $_8b8jopjujfeu9jnn.constant(1),
          rowspan: $_8b8jopjujfeu9jnn.constant(1)
        });
        $_esap7zl1jfeu9jvv.remove(raw, 'width');
        $_esap7zl1jfeu9jvv.remove(cell, 'width');
        return raw;
      };
    };
    return {
      combine: combine,
      cursor: position.get
    };
  };
  var contract = $_1dhdbrmcjfeu9k6l.exactly([
    'cell',
    'row',
    'replace',
    'gap'
  ]);
  var $_1m4ciqmajfeu9k65 = {
    modification: modification,
    transform: transform,
    merging: merging
  };

  var blockList = [
    'body',
    'p',
    'div',
    'article',
    'aside',
    'figcaption',
    'figure',
    'footer',
    'header',
    'nav',
    'section',
    'ol',
    'ul',
    'table',
    'thead',
    'tfoot',
    'tbody',
    'caption',
    'tr',
    'td',
    'th',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'address'
  ];
  var isList = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_8soyqzjsjfeu9jnc.contains([
      'ol',
      'ul'
    ], tagName);
  };
  var isBlock = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_8soyqzjsjfeu9jnc.contains(blockList, tagName);
  };
  var isFormatting = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_8soyqzjsjfeu9jnc.contains([
      'address',
      'pre',
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isHeading = function (universe, item) {
    var tagName = universe.property().name(item);
    return $_8soyqzjsjfeu9jnc.contains([
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ], tagName);
  };
  var isContainer = function (universe, item) {
    return $_8soyqzjsjfeu9jnc.contains([
      'div',
      'li',
      'td',
      'th',
      'blockquote',
      'body',
      'caption'
    ], universe.property().name(item));
  };
  var isEmptyTag = function (universe, item) {
    return $_8soyqzjsjfeu9jnc.contains([
      'br',
      'img',
      'hr',
      'input'
    ], universe.property().name(item));
  };
  var isFrame = function (universe, item) {
    return universe.property().name(item) === 'iframe';
  };
  var isInline = function (universe, item) {
    return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
  };
  var $_9su3gtmfjfeu9k7l = {
    isBlock: isBlock,
    isList: isList,
    isFormatting: isFormatting,
    isHeading: isHeading,
    isContainer: isContainer,
    isEmptyTag: isEmptyTag,
    isFrame: isFrame,
    isInline: isInline
  };

  var universe$1 = DomUniverse();
  var isBlock$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isBlock(universe$1, element);
  };
  var isList$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isList(universe$1, element);
  };
  var isFormatting$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isFormatting(universe$1, element);
  };
  var isHeading$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isHeading(universe$1, element);
  };
  var isContainer$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isContainer(universe$1, element);
  };
  var isEmptyTag$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isEmptyTag(universe$1, element);
  };
  var isFrame$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isFrame(universe$1, element);
  };
  var isInline$1 = function (element) {
    return $_9su3gtmfjfeu9k7l.isInline(universe$1, element);
  };
  var $_53jifzmejfeu9k7b = {
    isBlock: isBlock$1,
    isList: isList$1,
    isFormatting: isFormatting$1,
    isHeading: isHeading$1,
    isContainer: isContainer$1,
    isEmptyTag: isEmptyTag$1,
    isFrame: isFrame$1,
    isInline: isInline$1
  };

  var merge = function (cells) {
    var isBr = function (el) {
      return $_prkbektjfeu9juk.name(el) === 'br';
    };
    var advancedBr = function (children) {
      return $_8soyqzjsjfeu9jnc.forall(children, function (c) {
        return isBr(c) || $_prkbektjfeu9juk.isText(c) && $_allfqrlajfeu9jxn.get(c).trim().length === 0;
      });
    };
    var isListItem = function (el) {
      return $_prkbektjfeu9juk.name(el) === 'li' || $_causnjkyjfeu9jv6.ancestor(el, $_53jifzmejfeu9k7b.isList).isSome();
    };
    var siblingIsBlock = function (el) {
      return $_dzvm7xk9jfeu9jrm.nextSibling(el).map(function (rightSibling) {
        if ($_53jifzmejfeu9k7b.isBlock(rightSibling))
          return true;
        if ($_53jifzmejfeu9k7b.isEmptyTag(rightSibling)) {
          return $_prkbektjfeu9juk.name(rightSibling) === 'img' ? false : true;
        }
      }).getOr(false);
    };
    var markCell = function (cell) {
      return $_7ig6trl8jfeu9jxe.last(cell).bind(function (rightEdge) {
        var rightSiblingIsBlock = siblingIsBlock(rightEdge);
        return $_dzvm7xk9jfeu9jrm.parent(rightEdge).map(function (parent) {
          return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || $_53jifzmejfeu9k7b.isBlock(parent) && !$_adlyqikbjfeu9js6.eq(cell, parent) ? [] : [$_5csi13k7jfeu9jrb.fromTag('br')];
        });
      }).getOr([]);
    };
    var markContent = function () {
      var content = $_8soyqzjsjfeu9jnc.bind(cells, function (cell) {
        var children = $_dzvm7xk9jfeu9jrm.children(cell);
        return advancedBr(children) ? [] : children.concat(markCell(cell));
      });
      return content.length === 0 ? [$_5csi13k7jfeu9jrb.fromTag('br')] : content;
    };
    var contents = markContent();
    $_sg34gl4jfeu9jwb.empty(cells[0]);
    $_fhqznl5jfeu9jwf.append(cells[0], contents);
  };
  var $_3lm8wumdjfeu9k6p = { merge: merge };

  var shallow$1 = function (old, nu) {
    return nu;
  };
  var deep$1 = function (old, nu) {
    var bothObjects = $_91jv01k1jfeu9jpc.isObject(old) && $_91jv01k1jfeu9jpc.isObject(nu);
    return bothObjects ? deepMerge(old, nu) : nu;
  };
  var baseMerge = function (merger) {
    return function () {
      var objects = new Array(arguments.length);
      for (var i = 0; i < objects.length; i++)
        objects[i] = arguments[i];
      if (objects.length === 0)
        throw new Error('Can\'t merge zero objects');
      var ret = {};
      for (var j = 0; j < objects.length; j++) {
        var curObject = objects[j];
        for (var key in curObject)
          if (curObject.hasOwnProperty(key)) {
            ret[key] = merger(ret[key], curObject[key]);
          }
      }
      return ret;
    };
  };
  var deepMerge = baseMerge(deep$1);
  var merge$1 = baseMerge(shallow$1);
  var $_fkb9qbmhjfeu9k87 = {
    deepMerge: deepMerge,
    merge: merge$1
  };

  var cat = function (arr) {
    var r = [];
    var push = function (x) {
      r.push(x);
    };
    for (var i = 0; i < arr.length; i++) {
      arr[i].each(push);
    }
    return r;
  };
  var findMap = function (arr, f) {
    for (var i = 0; i < arr.length; i++) {
      var r = f(arr[i], i);
      if (r.isSome()) {
        return r;
      }
    }
    return Option.none();
  };
  var liftN = function (arr, f) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (x.isSome()) {
        r.push(x.getOrDie());
      } else {
        return Option.none();
      }
    }
    return Option.some(f.apply(null, r));
  };
  var $_dxo57pmijfeu9k8a = {
    cat: cat,
    findMap: findMap,
    liftN: liftN
  };

  var addCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    var before = cells.slice(0, index);
    var after = cells.slice(index);
    var newCells = before.concat([cell]).concat(after);
    return setCells(gridRow, newCells);
  };
  var mutateCell = function (gridRow, index, cell) {
    var cells = gridRow.cells();
    cells[index] = cell;
  };
  var setCells = function (gridRow, cells) {
    return $_2crbd2k3jfeu9jpu.rowcells(cells, gridRow.section());
  };
  var mapCells = function (gridRow, f) {
    var cells = gridRow.cells();
    var r = $_8soyqzjsjfeu9jnc.map(cells, f);
    return $_2crbd2k3jfeu9jpu.rowcells(r, gridRow.section());
  };
  var getCell = function (gridRow, index) {
    return gridRow.cells()[index];
  };
  var getCellElement = function (gridRow, index) {
    return getCell(gridRow, index).element();
  };
  var cellLength = function (gridRow) {
    return gridRow.cells().length;
  };
  var $_4eqo10mljfeu9k8n = {
    addCell: addCell,
    setCells: setCells,
    mutateCell: mutateCell,
    getCell: getCell,
    getCellElement: getCellElement,
    mapCells: mapCells,
    cellLength: cellLength
  };

  var getColumn = function (grid, index) {
    return $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      return $_4eqo10mljfeu9k8n.getCell(row, index);
    });
  };
  var getRow = function (grid, index) {
    return grid[index];
  };
  var findDiff = function (xs, comp) {
    if (xs.length === 0)
      return 0;
    var first = xs[0];
    var index = $_8soyqzjsjfeu9jnc.findIndex(xs, function (x) {
      return !comp(first.element(), x.element());
    });
    return index.fold(function () {
      return xs.length;
    }, function (ind) {
      return ind;
    });
  };
  var subgrid = function (grid, row, column, comparator) {
    var restOfRow = getRow(grid, row).cells().slice(column);
    var endColIndex = findDiff(restOfRow, comparator);
    var restOfColumn = getColumn(grid, column).slice(row);
    var endRowIndex = findDiff(restOfColumn, comparator);
    return {
      colspan: $_8b8jopjujfeu9jnn.constant(endColIndex),
      rowspan: $_8b8jopjujfeu9jnn.constant(endRowIndex)
    };
  };
  var $_aoq846mkjfeu9k8h = { subgrid: subgrid };

  var toDetails = function (grid, comparator) {
    var seen = $_8soyqzjsjfeu9jnc.map(grid, function (row, ri) {
      return $_8soyqzjsjfeu9jnc.map(row.cells(), function (col, ci) {
        return false;
      });
    });
    var updateSeen = function (ri, ci, rowspan, colspan) {
      for (var r = ri; r < ri + rowspan; r++) {
        for (var c = ci; c < ci + colspan; c++) {
          seen[r][c] = true;
        }
      }
    };
    return $_8soyqzjsjfeu9jnc.map(grid, function (row, ri) {
      var details = $_8soyqzjsjfeu9jnc.bind(row.cells(), function (cell, ci) {
        if (seen[ri][ci] === false) {
          var result = $_aoq846mkjfeu9k8h.subgrid(grid, ri, ci, comparator);
          updateSeen(ri, ci, result.rowspan(), result.colspan());
          return [$_2crbd2k3jfeu9jpu.detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
        } else {
          return [];
        }
      });
      return $_2crbd2k3jfeu9jpu.rowdetails(details, row.section());
    });
  };
  var toGrid = function (warehouse, generators, isNew) {
    var grid = [];
    for (var i = 0; i < warehouse.grid().rows(); i++) {
      var rowCells = [];
      for (var j = 0; j < warehouse.grid().columns(); j++) {
        var element = $_8o21o3l0jfeu9jvn.getAt(warehouse, i, j).map(function (item) {
          return $_2crbd2k3jfeu9jpu.elementnew(item.element(), isNew);
        }).getOrThunk(function () {
          return $_2crbd2k3jfeu9jpu.elementnew(generators.gap(), true);
        });
        rowCells.push(element);
      }
      var row = $_2crbd2k3jfeu9jpu.rowcells(rowCells, warehouse.all()[i].section());
      grid.push(row);
    }
    return grid;
  };
  var $_8v9rxomjjfeu9k8d = {
    toDetails: toDetails,
    toGrid: toGrid
  };

  var setIfNot = function (element, property, value, ignore) {
    if (value === ignore)
      $_gd427vksjfeu9ju9.remove(element, property);
    else
      $_gd427vksjfeu9ju9.set(element, property, value);
  };
  var render = function (table, grid) {
    var newRows = [];
    var newCells = [];
    var renderSection = function (gridSection, sectionName) {
      var section = $_e4f1b4kxjfeu9jv4.child(table, sectionName).getOrThunk(function () {
        var tb = $_5csi13k7jfeu9jrb.fromTag(sectionName, $_dzvm7xk9jfeu9jrm.owner(table).dom());
        $_68ujuxl3jfeu9jw9.append(table, tb);
        return tb;
      });
      $_sg34gl4jfeu9jwb.empty(section);
      var rows = $_8soyqzjsjfeu9jnc.map(gridSection, function (row) {
        if (row.isNew()) {
          newRows.push(row.element());
        }
        var tr = row.element();
        $_sg34gl4jfeu9jwb.empty(tr);
        $_8soyqzjsjfeu9jnc.each(row.cells(), function (cell) {
          if (cell.isNew()) {
            newCells.push(cell.element());
          }
          setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
          setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
          $_68ujuxl3jfeu9jw9.append(tr, cell.element());
        });
        return tr;
      });
      $_fhqznl5jfeu9jwf.append(section, rows);
    };
    var removeSection = function (sectionName) {
      $_e4f1b4kxjfeu9jv4.child(table, sectionName).bind($_sg34gl4jfeu9jwb.remove);
    };
    var renderOrRemoveSection = function (gridSection, sectionName) {
      if (gridSection.length > 0) {
        renderSection(gridSection, sectionName);
      } else {
        removeSection(sectionName);
      }
    };
    var headSection = [];
    var bodySection = [];
    var footSection = [];
    $_8soyqzjsjfeu9jnc.each(grid, function (row) {
      switch (row.section()) {
      case 'thead':
        headSection.push(row);
        break;
      case 'tbody':
        bodySection.push(row);
        break;
      case 'tfoot':
        footSection.push(row);
        break;
      }
    });
    renderOrRemoveSection(headSection, 'thead');
    renderOrRemoveSection(bodySection, 'tbody');
    renderOrRemoveSection(footSection, 'tfoot');
    return {
      newRows: $_8b8jopjujfeu9jnn.constant(newRows),
      newCells: $_8b8jopjujfeu9jnn.constant(newCells)
    };
  };
  var copy$2 = function (grid) {
    var rows = $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      var tr = $_3hnsgql7jfeu9jxb.shallow(row.element());
      $_8soyqzjsjfeu9jnc.each(row.cells(), function (cell) {
        var clonedCell = $_3hnsgql7jfeu9jxb.deep(cell.element());
        setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
        setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
        $_68ujuxl3jfeu9jw9.append(tr, clonedCell);
      });
      return tr;
    });
    return rows;
  };
  var $_cjajefmmjfeu9k8s = {
    render: render,
    copy: copy$2
  };

  var repeat = function (repititions, f) {
    var r = [];
    for (var i = 0; i < repititions; i++) {
      r.push(f(i));
    }
    return r;
  };
  var range$1 = function (start, end) {
    var r = [];
    for (var i = start; i < end; i++) {
      r.push(i);
    }
    return r;
  };
  var unique = function (xs, comparator) {
    var result = [];
    $_8soyqzjsjfeu9jnc.each(xs, function (x, i) {
      if (i < xs.length - 1 && !comparator(x, xs[i + 1])) {
        result.push(x);
      } else if (i === xs.length - 1) {
        result.push(x);
      }
    });
    return result;
  };
  var deduce = function (xs, index) {
    if (index < 0 || index >= xs.length - 1)
      return Option.none();
    var current = xs[index].fold(function () {
      var rest = $_8soyqzjsjfeu9jnc.reverse(xs.slice(0, index));
      return $_dxo57pmijfeu9k8a.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (c) {
      return Option.some({
        value: c,
        delta: 0
      });
    });
    var next = xs[index + 1].fold(function () {
      var rest = xs.slice(index + 1);
      return $_dxo57pmijfeu9k8a.findMap(rest, function (a, i) {
        return a.map(function (aa) {
          return {
            value: aa,
            delta: i + 1
          };
        });
      });
    }, function (n) {
      return Option.some({
        value: n,
        delta: 1
      });
    });
    return current.bind(function (c) {
      return next.map(function (n) {
        var extras = n.delta + c.delta;
        return Math.abs(n.value - c.value) / extras;
      });
    });
  };
  var $_b3yf7lmpjfeu9kaa = {
    repeat: repeat,
    range: range$1,
    unique: unique,
    deduce: deduce
  };

  var columns = function (warehouse) {
    var grid = warehouse.grid();
    var cols = $_b3yf7lmpjfeu9kaa.range(0, grid.columns());
    var rows = $_b3yf7lmpjfeu9kaa.range(0, grid.rows());
    return $_8soyqzjsjfeu9jnc.map(cols, function (col) {
      var getBlock = function () {
        return $_8soyqzjsjfeu9jnc.bind(rows, function (r) {
          return $_8o21o3l0jfeu9jvn.getAt(warehouse, r, col).filter(function (detail) {
            return detail.column() === col;
          }).fold($_8b8jopjujfeu9jnn.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.colspan() === 1;
      };
      var getFallback = function () {
        return $_8o21o3l0jfeu9jvn.getAt(warehouse, 0, col);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var decide = function (getBlock, isSingle, getFallback) {
    var inBlock = getBlock();
    var singleInBlock = $_8soyqzjsjfeu9jnc.find(inBlock, isSingle);
    var detailOption = singleInBlock.orThunk(function () {
      return Option.from(inBlock[0]).orThunk(getFallback);
    });
    return detailOption.map(function (detail) {
      return detail.element();
    });
  };
  var rows$1 = function (warehouse) {
    var grid = warehouse.grid();
    var rows = $_b3yf7lmpjfeu9kaa.range(0, grid.rows());
    var cols = $_b3yf7lmpjfeu9kaa.range(0, grid.columns());
    return $_8soyqzjsjfeu9jnc.map(rows, function (row) {
      var getBlock = function () {
        return $_8soyqzjsjfeu9jnc.bind(cols, function (c) {
          return $_8o21o3l0jfeu9jvn.getAt(warehouse, row, c).filter(function (detail) {
            return detail.row() === row;
          }).fold($_8b8jopjujfeu9jnn.constant([]), function (detail) {
            return [detail];
          });
        });
      };
      var isSingle = function (detail) {
        return detail.rowspan() === 1;
      };
      var getFallback = function () {
        return $_8o21o3l0jfeu9jvn.getAt(warehouse, row, 0);
      };
      return decide(getBlock, isSingle, getFallback);
    });
  };
  var $_95dbe0mojfeu9k9z = {
    columns: columns,
    rows: rows$1
  };

  var col = function (column, x, y, w, h) {
    var blocker = $_5csi13k7jfeu9jrb.fromTag('div');
    $_esap7zl1jfeu9jvv.setAll(blocker, {
      position: 'absolute',
      left: x - w / 2 + 'px',
      top: y + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_gd427vksjfeu9ju9.setAll(blocker, {
      'data-column': column,
      'role': 'presentation'
    });
    return blocker;
  };
  var row$1 = function (row, x, y, w, h) {
    var blocker = $_5csi13k7jfeu9jrb.fromTag('div');
    $_esap7zl1jfeu9jvv.setAll(blocker, {
      position: 'absolute',
      left: x + 'px',
      top: y - h / 2 + 'px',
      height: h + 'px',
      width: w + 'px'
    });
    $_gd427vksjfeu9ju9.setAll(blocker, {
      'data-row': row,
      'role': 'presentation'
    });
    return blocker;
  };
  var $_9m48vwmqjfeu9kai = {
    col: col,
    row: row$1
  };

  var css = function (namespace) {
    var dashNamespace = namespace.replace(/\./g, '-');
    var resolve = function (str) {
      return dashNamespace + '-' + str;
    };
    return { resolve: resolve };
  };
  var $_88jhs1msjfeu9kat = { css: css };

  var styles = $_88jhs1msjfeu9kat.css('ephox-snooker');
  var $_g8yu1imrjfeu9kap = { resolve: styles.resolve };

  function Toggler (turnOff, turnOn, initial) {
    var active = initial || false;
    var on = function () {
      turnOn();
      active = true;
    };
    var off = function () {
      turnOff();
      active = false;
    };
    var toggle = function () {
      var f = active ? off : on;
      f();
    };
    var isOn = function () {
      return active;
    };
    return {
      on: on,
      off: off,
      toggle: toggle,
      isOn: isOn
    };
  }

  var read = function (element, attr) {
    var value = $_gd427vksjfeu9ju9.get(element, attr);
    return value === undefined || value === '' ? [] : value.split(' ');
  };
  var add = function (element, attr, id) {
    var old = read(element, attr);
    var nu = old.concat([id]);
    $_gd427vksjfeu9ju9.set(element, attr, nu.join(' '));
  };
  var remove$3 = function (element, attr, id) {
    var nu = $_8soyqzjsjfeu9jnc.filter(read(element, attr), function (v) {
      return v !== id;
    });
    if (nu.length > 0)
      $_gd427vksjfeu9ju9.set(element, attr, nu.join(' '));
    else
      $_gd427vksjfeu9ju9.remove(element, attr);
  };
  var $_d9rrm5mwjfeu9kb6 = {
    read: read,
    add: add,
    remove: remove$3
  };

  var supports = function (element) {
    return element.dom().classList !== undefined;
  };
  var get$6 = function (element) {
    return $_d9rrm5mwjfeu9kb6.read(element, 'class');
  };
  var add$1 = function (element, clazz) {
    return $_d9rrm5mwjfeu9kb6.add(element, 'class', clazz);
  };
  var remove$4 = function (element, clazz) {
    return $_d9rrm5mwjfeu9kb6.remove(element, 'class', clazz);
  };
  var toggle = function (element, clazz) {
    if ($_8soyqzjsjfeu9jnc.contains(get$6(element), clazz)) {
      remove$4(element, clazz);
    } else {
      add$1(element, clazz);
    }
  };
  var $_ah67cgmvjfeu9kb1 = {
    get: get$6,
    add: add$1,
    remove: remove$4,
    toggle: toggle,
    supports: supports
  };

  var add$2 = function (element, clazz) {
    if ($_ah67cgmvjfeu9kb1.supports(element))
      element.dom().classList.add(clazz);
    else
      $_ah67cgmvjfeu9kb1.add(element, clazz);
  };
  var cleanClass = function (element) {
    var classList = $_ah67cgmvjfeu9kb1.supports(element) ? element.dom().classList : $_ah67cgmvjfeu9kb1.get(element);
    if (classList.length === 0) {
      $_gd427vksjfeu9ju9.remove(element, 'class');
    }
  };
  var remove$5 = function (element, clazz) {
    if ($_ah67cgmvjfeu9kb1.supports(element)) {
      var classList = element.dom().classList;
      classList.remove(clazz);
    } else
      $_ah67cgmvjfeu9kb1.remove(element, clazz);
    cleanClass(element);
  };
  var toggle$1 = function (element, clazz) {
    return $_ah67cgmvjfeu9kb1.supports(element) ? element.dom().classList.toggle(clazz) : $_ah67cgmvjfeu9kb1.toggle(element, clazz);
  };
  var toggler = function (element, clazz) {
    var hasClasslist = $_ah67cgmvjfeu9kb1.supports(element);
    var classList = element.dom().classList;
    var off = function () {
      if (hasClasslist)
        classList.remove(clazz);
      else
        $_ah67cgmvjfeu9kb1.remove(element, clazz);
    };
    var on = function () {
      if (hasClasslist)
        classList.add(clazz);
      else
        $_ah67cgmvjfeu9kb1.add(element, clazz);
    };
    return Toggler(off, on, has$1(element, clazz));
  };
  var has$1 = function (element, clazz) {
    return $_ah67cgmvjfeu9kb1.supports(element) && element.dom().classList.contains(clazz);
  };
  var $_d7p727mtjfeu9kav = {
    add: add$2,
    remove: remove$5,
    toggle: toggle$1,
    toggler: toggler,
    has: has$1
  };

  var resizeBar = $_g8yu1imrjfeu9kap.resolve('resizer-bar');
  var resizeRowBar = $_g8yu1imrjfeu9kap.resolve('resizer-rows');
  var resizeColBar = $_g8yu1imrjfeu9kap.resolve('resizer-cols');
  var BAR_THICKNESS = 7;
  var clear = function (wire) {
    var previous = $_dva6q3kujfeu9juo.descendants(wire.parent(), '.' + resizeBar);
    $_8soyqzjsjfeu9jnc.each(previous, $_sg34gl4jfeu9jwb.remove);
  };
  var drawBar = function (wire, positions, create) {
    var origin = wire.origin();
    $_8soyqzjsjfeu9jnc.each(positions, function (cpOption, i) {
      cpOption.each(function (cp) {
        var bar = create(origin, cp);
        $_d7p727mtjfeu9kav.add(bar, resizeBar);
        $_68ujuxl3jfeu9jw9.append(wire.parent(), bar);
      });
    });
  };
  var refreshCol = function (wire, colPositions, position, tableHeight) {
    drawBar(wire, colPositions, function (origin, cp) {
      var colBar = $_9m48vwmqjfeu9kai.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
      $_d7p727mtjfeu9kav.add(colBar, resizeColBar);
      return colBar;
    });
  };
  var refreshRow = function (wire, rowPositions, position, tableWidth) {
    drawBar(wire, rowPositions, function (origin, cp) {
      var rowBar = $_9m48vwmqjfeu9kai.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
      $_d7p727mtjfeu9kav.add(rowBar, resizeRowBar);
      return rowBar;
    });
  };
  var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
    var position = $_7hhj6fm5jfeu9k5b.absolute(table);
    var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
    refreshRow(wire, rowPositions, position, $_5oyednm1jfeu9k4m.getOuter(table));
    var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
    refreshCol(wire, colPositions, position, $_ewjs1xlzjfeu9k4c.getOuter(table));
  };
  var refresh = function (wire, table, hdirection, vdirection) {
    clear(wire);
    var list = $_csfqqxk2jfeu9jph.fromTable(table);
    var warehouse = $_8o21o3l0jfeu9jvn.generate(list);
    var rows = $_95dbe0mojfeu9k9z.rows(warehouse);
    var cols = $_95dbe0mojfeu9k9z.columns(warehouse);
    refreshGrid(wire, table, rows, cols, hdirection, vdirection);
  };
  var each$2 = function (wire, f) {
    var bars = $_dva6q3kujfeu9juo.descendants(wire.parent(), '.' + resizeBar);
    $_8soyqzjsjfeu9jnc.each(bars, f);
  };
  var hide = function (wire) {
    each$2(wire, function (bar) {
      $_esap7zl1jfeu9jvv.set(bar, 'display', 'none');
    });
  };
  var show = function (wire) {
    each$2(wire, function (bar) {
      $_esap7zl1jfeu9jvv.set(bar, 'display', 'block');
    });
  };
  var isRowBar = function (element) {
    return $_d7p727mtjfeu9kav.has(element, resizeRowBar);
  };
  var isColBar = function (element) {
    return $_d7p727mtjfeu9kav.has(element, resizeColBar);
  };
  var $_7wuh8xmnjfeu9k9d = {
    refresh: refresh,
    hide: hide,
    show: show,
    destroy: clear,
    isRowBar: isRowBar,
    isColBar: isColBar
  };

  var fromWarehouse = function (warehouse, generators) {
    return $_8v9rxomjjfeu9k8d.toGrid(warehouse, generators, false);
  };
  var deriveRows = function (rendered, generators) {
    var findRow = function (details) {
      var rowOfCells = $_dxo57pmijfeu9k8a.findMap(details, function (detail) {
        return $_dzvm7xk9jfeu9jrm.parent(detail.element()).map(function (row) {
          var isNew = $_dzvm7xk9jfeu9jrm.parent(row).isNone();
          return $_2crbd2k3jfeu9jpu.elementnew(row, isNew);
        });
      });
      return rowOfCells.getOrThunk(function () {
        return $_2crbd2k3jfeu9jpu.elementnew(generators.row(), true);
      });
    };
    return $_8soyqzjsjfeu9jnc.map(rendered, function (details) {
      var row = findRow(details.details());
      return $_2crbd2k3jfeu9jpu.rowdatanew(row.element(), details.details(), details.section(), row.isNew());
    });
  };
  var toDetailList = function (grid, generators) {
    var rendered = $_8v9rxomjjfeu9k8d.toDetails(grid, $_adlyqikbjfeu9js6.eq);
    return deriveRows(rendered, generators);
  };
  var findInWarehouse = function (warehouse, element) {
    var all = $_8soyqzjsjfeu9jnc.flatten($_8soyqzjsjfeu9jnc.map(warehouse.all(), function (r) {
      return r.cells();
    }));
    return $_8soyqzjsjfeu9jnc.find(all, function (e) {
      return $_adlyqikbjfeu9js6.eq(element, e.element());
    });
  };
  var run = function (operation, extract, adjustment, postAction, genWrappers) {
    return function (wire, table, target, generators, direction) {
      var input = $_csfqqxk2jfeu9jph.fromTable(table);
      var warehouse = $_8o21o3l0jfeu9jvn.generate(input);
      var output = extract(warehouse, target).map(function (info) {
        var model = fromWarehouse(warehouse, generators);
        var result = operation(model, info, $_adlyqikbjfeu9js6.eq, genWrappers(generators));
        var grid = toDetailList(result.grid(), generators);
        return {
          grid: $_8b8jopjujfeu9jnn.constant(grid),
          cursor: result.cursor
        };
      });
      return output.fold(function () {
        return Option.none();
      }, function (out) {
        var newElements = $_cjajefmmjfeu9k8s.render(table, out.grid());
        adjustment(table, out.grid(), direction);
        postAction(table);
        $_7wuh8xmnjfeu9k9d.refresh(wire, table, $_edppk0m4jfeu9k4t.height, direction);
        return Option.some({
          cursor: out.cursor,
          newRows: newElements.newRows,
          newCells: newElements.newCells
        });
      });
    };
  };
  var onCell = function (warehouse, target) {
    return $_811muwk4jfeu9jq0.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell);
    });
  };
  var onPaste = function (warehouse, target) {
    return $_811muwk4jfeu9jq0.cell(target.element()).bind(function (cell) {
      return findInWarehouse(warehouse, cell).map(function (details) {
        return $_fkb9qbmhjfeu9k87.merge(details, {
          generators: target.generators,
          clipboard: target.clipboard
        });
      });
    });
  };
  var onPasteRows = function (warehouse, target) {
    var details = $_8soyqzjsjfeu9jnc.map(target.selection(), function (cell) {
      return $_811muwk4jfeu9jq0.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_dxo57pmijfeu9k8a.cat(details);
    return cells.length > 0 ? Option.some($_fkb9qbmhjfeu9k87.merge({ cells: cells }, {
      generators: target.generators,
      clipboard: target.clipboard
    })) : Option.none();
  };
  var onMergable = function (warehouse, target) {
    return target.mergable();
  };
  var onUnmergable = function (warehouse, target) {
    return target.unmergable();
  };
  var onCells = function (warehouse, target) {
    var details = $_8soyqzjsjfeu9jnc.map(target.selection(), function (cell) {
      return $_811muwk4jfeu9jq0.cell(cell).bind(function (lc) {
        return findInWarehouse(warehouse, lc);
      });
    });
    var cells = $_dxo57pmijfeu9k8a.cat(details);
    return cells.length > 0 ? Option.some(cells) : Option.none();
  };
  var $_8j5l0qmgjfeu9k7r = {
    run: run,
    toDetailList: toDetailList,
    onCell: onCell,
    onCells: onCells,
    onPaste: onPaste,
    onPasteRows: onPasteRows,
    onMergable: onMergable,
    onUnmergable: onUnmergable
  };

  var value$1 = function (o) {
    var is = function (v) {
      return o === v;
    };
    var or = function (opt) {
      return value$1(o);
    };
    var orThunk = function (f) {
      return value$1(o);
    };
    var map = function (f) {
      return value$1(f(o));
    };
    var each = function (f) {
      f(o);
    };
    var bind = function (f) {
      return f(o);
    };
    var fold = function (_, onValue) {
      return onValue(o);
    };
    var exists = function (f) {
      return f(o);
    };
    var forall = function (f) {
      return f(o);
    };
    var toOption = function () {
      return Option.some(o);
    };
    return {
      is: is,
      isValue: $_8b8jopjujfeu9jnn.always,
      isError: $_8b8jopjujfeu9jnn.never,
      getOr: $_8b8jopjujfeu9jnn.constant(o),
      getOrThunk: $_8b8jopjujfeu9jnn.constant(o),
      getOrDie: $_8b8jopjujfeu9jnn.constant(o),
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: each,
      bind: bind,
      exists: exists,
      forall: forall,
      toOption: toOption
    };
  };
  var error = function (message) {
    var getOrThunk = function (f) {
      return f();
    };
    var getOrDie = function () {
      return $_8b8jopjujfeu9jnn.die(String(message))();
    };
    var or = function (opt) {
      return opt;
    };
    var orThunk = function (f) {
      return f();
    };
    var map = function (f) {
      return error(message);
    };
    var bind = function (f) {
      return error(message);
    };
    var fold = function (onError, _) {
      return onError(message);
    };
    return {
      is: $_8b8jopjujfeu9jnn.never,
      isValue: $_8b8jopjujfeu9jnn.never,
      isError: $_8b8jopjujfeu9jnn.always,
      getOr: $_8b8jopjujfeu9jnn.identity,
      getOrThunk: getOrThunk,
      getOrDie: getOrDie,
      or: or,
      orThunk: orThunk,
      fold: fold,
      map: map,
      each: $_8b8jopjujfeu9jnn.noop,
      bind: bind,
      exists: $_8b8jopjujfeu9jnn.never,
      forall: $_8b8jopjujfeu9jnn.always,
      toOption: Option.none
    };
  };
  var Result = {
    value: value$1,
    error: error
  };

  var measure = function (startAddress, gridA, gridB) {
    if (startAddress.row() >= gridA.length || startAddress.column() > $_4eqo10mljfeu9k8n.cellLength(gridA[0]))
      return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
    var rowRemainder = gridA.slice(startAddress.row());
    var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
    var colRequired = $_4eqo10mljfeu9k8n.cellLength(gridB[0]);
    var rowRequired = gridB.length;
    return Result.value({
      rowDelta: $_8b8jopjujfeu9jnn.constant(rowRemainder.length - rowRequired),
      colDelta: $_8b8jopjujfeu9jnn.constant(colRemainder.length - colRequired)
    });
  };
  var measureWidth = function (gridA, gridB) {
    var colLengthA = $_4eqo10mljfeu9k8n.cellLength(gridA[0]);
    var colLengthB = $_4eqo10mljfeu9k8n.cellLength(gridB[0]);
    return {
      rowDelta: $_8b8jopjujfeu9jnn.constant(0),
      colDelta: $_8b8jopjujfeu9jnn.constant(colLengthA - colLengthB)
    };
  };
  var fill = function (cells, generator) {
    return $_8soyqzjsjfeu9jnc.map(cells, function () {
      return $_2crbd2k3jfeu9jpu.elementnew(generator.cell(), true);
    });
  };
  var rowFill = function (grid, amount, generator) {
    return grid.concat($_b3yf7lmpjfeu9kaa.repeat(amount, function (_row) {
      return $_4eqo10mljfeu9k8n.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
    }));
  };
  var colFill = function (grid, amount, generator) {
    return $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      return $_4eqo10mljfeu9k8n.setCells(row, row.cells().concat(fill($_b3yf7lmpjfeu9kaa.range(0, amount), generator)));
    });
  };
  var tailor = function (gridA, delta, generator) {
    var fillCols = delta.colDelta() < 0 ? colFill : $_8b8jopjujfeu9jnn.identity;
    var fillRows = delta.rowDelta() < 0 ? rowFill : $_8b8jopjujfeu9jnn.identity;
    var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
    var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
    return tailoredGrid;
  };
  var $_967v8bmyjfeu9kbl = {
    measure: measure,
    measureWidth: measureWidth,
    tailor: tailor
  };

  var merge$2 = function (grid, bounds, comparator, substitution) {
    if (grid.length === 0)
      return grid;
    for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
      for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
        $_4eqo10mljfeu9k8n.mutateCell(grid[i], j, $_2crbd2k3jfeu9jpu.elementnew(substitution(), false));
      }
    }
    return grid;
  };
  var unmerge = function (grid, target, comparator, substitution) {
    var first = true;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < $_4eqo10mljfeu9k8n.cellLength(grid[0]); j++) {
        var current = $_4eqo10mljfeu9k8n.getCellElement(grid[i], j);
        var isToReplace = comparator(current, target);
        if (isToReplace === true && first === false) {
          $_4eqo10mljfeu9k8n.mutateCell(grid[i], j, $_2crbd2k3jfeu9jpu.elementnew(substitution(), true));
        } else if (isToReplace === true) {
          first = false;
        }
      }
    }
    return grid;
  };
  var uniqueCells = function (row, comparator) {
    return $_8soyqzjsjfeu9jnc.foldl(row, function (rest, cell) {
      return $_8soyqzjsjfeu9jnc.exists(rest, function (currentCell) {
        return comparator(currentCell.element(), cell.element());
      }) ? rest : rest.concat([cell]);
    }, []);
  };
  var splitRows = function (grid, index, comparator, substitution) {
    if (index > 0 && index < grid.length) {
      var rowPrevCells = grid[index - 1].cells();
      var cells = uniqueCells(rowPrevCells, comparator);
      $_8soyqzjsjfeu9jnc.each(cells, function (cell) {
        var replacement = Option.none();
        for (var i = index; i < grid.length; i++) {
          for (var j = 0; j < $_4eqo10mljfeu9k8n.cellLength(grid[0]); j++) {
            var current = grid[i].cells()[j];
            var isToReplace = comparator(current.element(), cell.element());
            if (isToReplace) {
              if (replacement.isNone()) {
                replacement = Option.some(substitution());
              }
              replacement.each(function (sub) {
                $_4eqo10mljfeu9k8n.mutateCell(grid[i], j, $_2crbd2k3jfeu9jpu.elementnew(sub, true));
              });
            }
          }
        }
      });
    }
    return grid;
  };
  var $_fu995qn0jfeu9kc4 = {
    merge: merge$2,
    unmerge: unmerge,
    splitRows: splitRows
  };

  var isSpanning = function (grid, row, col, comparator) {
    var candidate = $_4eqo10mljfeu9k8n.getCell(grid[row], col);
    var matching = $_8b8jopjujfeu9jnn.curry(comparator, candidate.element());
    var currentRow = grid[row];
    return grid.length > 1 && $_4eqo10mljfeu9k8n.cellLength(currentRow) > 1 && (col > 0 && matching($_4eqo10mljfeu9k8n.getCellElement(currentRow, col - 1)) || col < currentRow.length - 1 && matching($_4eqo10mljfeu9k8n.getCellElement(currentRow, col + 1)) || row > 0 && matching($_4eqo10mljfeu9k8n.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching($_4eqo10mljfeu9k8n.getCellElement(grid[row + 1], col)));
  };
  var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
    var startRow = startAddress.row();
    var startCol = startAddress.column();
    var mergeHeight = gridB.length;
    var mergeWidth = $_4eqo10mljfeu9k8n.cellLength(gridB[0]);
    var endRow = startRow + mergeHeight;
    var endCol = startCol + mergeWidth;
    for (var r = startRow; r < endRow; r++) {
      for (var c = startCol; c < endCol; c++) {
        if (isSpanning(gridA, r, c, comparator)) {
          $_fu995qn0jfeu9kc4.unmerge(gridA, $_4eqo10mljfeu9k8n.getCellElement(gridA[r], c), comparator, generator.cell);
        }
        var newCell = $_4eqo10mljfeu9k8n.getCellElement(gridB[r - startRow], c - startCol);
        var replacement = generator.replace(newCell);
        $_4eqo10mljfeu9k8n.mutateCell(gridA[r], c, $_2crbd2k3jfeu9jpu.elementnew(replacement, true));
      }
    }
    return gridA;
  };
  var merge$3 = function (startAddress, gridA, gridB, generator, comparator) {
    var result = $_967v8bmyjfeu9kbl.measure(startAddress, gridA, gridB);
    return result.map(function (delta) {
      var fittedGrid = $_967v8bmyjfeu9kbl.tailor(gridA, delta, generator);
      return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
    });
  };
  var insert = function (index, gridA, gridB, generator, comparator) {
    $_fu995qn0jfeu9kc4.splitRows(gridA, index, comparator, generator.cell);
    var delta = $_967v8bmyjfeu9kbl.measureWidth(gridB, gridA);
    var fittedNewGrid = $_967v8bmyjfeu9kbl.tailor(gridB, delta, generator);
    var secondDelta = $_967v8bmyjfeu9kbl.measureWidth(gridA, fittedNewGrid);
    var fittedOldGrid = $_967v8bmyjfeu9kbl.tailor(gridA, secondDelta, generator);
    return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
  };
  var $_d9q6bpmxjfeu9kbe = {
    merge: merge$3,
    insert: insert
  };

  var insertRowAt = function (grid, index, example, comparator, substitution) {
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_4eqo10mljfeu9k8n.mapCells(grid[example], function (ex, c) {
      var withinSpan = index > 0 && index < grid.length && comparator($_4eqo10mljfeu9k8n.getCellElement(grid[index - 1], c), $_4eqo10mljfeu9k8n.getCellElement(grid[index], c));
      var ret = withinSpan ? $_4eqo10mljfeu9k8n.getCell(grid[index], c) : $_2crbd2k3jfeu9jpu.elementnew(substitution(ex.element(), comparator), true);
      return ret;
    });
    return before.concat([between]).concat(after);
  };
  var insertColumnAt = function (grid, index, example, comparator, substitution) {
    return $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      var withinSpan = index > 0 && index < $_4eqo10mljfeu9k8n.cellLength(row) && comparator($_4eqo10mljfeu9k8n.getCellElement(row, index - 1), $_4eqo10mljfeu9k8n.getCellElement(row, index));
      var sub = withinSpan ? $_4eqo10mljfeu9k8n.getCell(row, index) : $_2crbd2k3jfeu9jpu.elementnew(substitution($_4eqo10mljfeu9k8n.getCellElement(row, example), comparator), true);
      return $_4eqo10mljfeu9k8n.addCell(row, index, sub);
    });
  };
  var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleCol + 1;
    return $_8soyqzjsjfeu9jnc.map(grid, function (row, i) {
      var isTargetCell = i === exampleRow;
      var sub = isTargetCell ? $_2crbd2k3jfeu9jpu.elementnew(substitution($_4eqo10mljfeu9k8n.getCellElement(row, exampleCol), comparator), true) : $_4eqo10mljfeu9k8n.getCell(row, exampleCol);
      return $_4eqo10mljfeu9k8n.addCell(row, index, sub);
    });
  };
  var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
    var index = exampleRow + 1;
    var before = grid.slice(0, index);
    var after = grid.slice(index);
    var between = $_4eqo10mljfeu9k8n.mapCells(grid[exampleRow], function (ex, i) {
      var isTargetCell = i === exampleCol;
      return isTargetCell ? $_2crbd2k3jfeu9jpu.elementnew(substitution(ex.element(), comparator), true) : ex;
    });
    return before.concat([between]).concat(after);
  };
  var deleteColumnsAt = function (grid, start, finish) {
    var rows = $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
      return $_2crbd2k3jfeu9jpu.rowcells(cells, row.section());
    });
    return $_8soyqzjsjfeu9jnc.filter(rows, function (row) {
      return row.cells().length > 0;
    });
  };
  var deleteRowsAt = function (grid, start, finish) {
    return grid.slice(0, start).concat(grid.slice(finish + 1));
  };
  var $_6n1p8vn1jfeu9kcf = {
    insertRowAt: insertRowAt,
    insertColumnAt: insertColumnAt,
    splitCellIntoColumns: splitCellIntoColumns,
    splitCellIntoRows: splitCellIntoRows,
    deleteRowsAt: deleteRowsAt,
    deleteColumnsAt: deleteColumnsAt
  };

  var replaceIn = function (grid, targets, comparator, substitution) {
    var isTarget = function (cell) {
      return $_8soyqzjsjfeu9jnc.exists(targets, function (target) {
        return comparator(cell.element(), target.element());
      });
    };
    return $_8soyqzjsjfeu9jnc.map(grid, function (row) {
      return $_4eqo10mljfeu9k8n.mapCells(row, function (cell) {
        return isTarget(cell) ? $_2crbd2k3jfeu9jpu.elementnew(substitution(cell.element(), comparator), true) : cell;
      });
    });
  };
  var notStartRow = function (grid, rowIndex, colIndex, comparator) {
    return $_4eqo10mljfeu9k8n.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator($_4eqo10mljfeu9k8n.getCellElement(grid[rowIndex - 1], colIndex), $_4eqo10mljfeu9k8n.getCellElement(grid[rowIndex], colIndex)));
  };
  var notStartColumn = function (row, index, comparator) {
    return index > 0 && comparator($_4eqo10mljfeu9k8n.getCellElement(row, index - 1), $_4eqo10mljfeu9k8n.getCellElement(row, index));
  };
  var replaceColumn = function (grid, index, comparator, substitution) {
    var targets = $_8soyqzjsjfeu9jnc.bind(grid, function (row, i) {
      var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
      return alreadyAdded ? [] : [$_4eqo10mljfeu9k8n.getCell(row, index)];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var replaceRow = function (grid, index, comparator, substitution) {
    var targetRow = grid[index];
    var targets = $_8soyqzjsjfeu9jnc.bind(targetRow.cells(), function (item, i) {
      var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
      return alreadyAdded ? [] : [item];
    });
    return replaceIn(grid, targets, comparator, substitution);
  };
  var $_4ahxnkn2jfeu9kcm = {
    replaceColumn: replaceColumn,
    replaceRow: replaceRow
  };

  var none$1 = function () {
    return folder(function (n, o, l, m, r) {
      return n();
    });
  };
  var only = function (index) {
    return folder(function (n, o, l, m, r) {
      return o(index);
    });
  };
  var left = function (index, next) {
    return folder(function (n, o, l, m, r) {
      return l(index, next);
    });
  };
  var middle = function (prev, index, next) {
    return folder(function (n, o, l, m, r) {
      return m(prev, index, next);
    });
  };
  var right = function (prev, index) {
    return folder(function (n, o, l, m, r) {
      return r(prev, index);
    });
  };
  var folder = function (fold) {
    return { fold: fold };
  };
  var $_axpc75n5jfeu9kdi = {
    none: none$1,
    only: only,
    left: left,
    middle: middle,
    right: right
  };

  var neighbours$1 = function (input, index) {
    if (input.length === 0)
      return $_axpc75n5jfeu9kdi.none();
    if (input.length === 1)
      return $_axpc75n5jfeu9kdi.only(0);
    if (index === 0)
      return $_axpc75n5jfeu9kdi.left(0, 1);
    if (index === input.length - 1)
      return $_axpc75n5jfeu9kdi.right(index - 1, index);
    if (index > 0 && index < input.length - 1)
      return $_axpc75n5jfeu9kdi.middle(index - 1, index, index + 1);
    return $_axpc75n5jfeu9kdi.none();
  };
  var determine = function (input, column, step, tableSize) {
    var result = input.slice(0);
    var context = neighbours$1(input, column);
    var zero = function (array) {
      return $_8soyqzjsjfeu9jnc.map(array, $_8b8jopjujfeu9jnn.constant(0));
    };
    var onNone = $_8b8jopjujfeu9jnn.constant(zero(result));
    var onOnly = function (index) {
      return tableSize.singleColumnWidth(result[index], step);
    };
    var onChange = function (index, next) {
      if (step >= 0) {
        var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
        return zero(result.slice(0, index)).concat([
          step,
          newNext - result[next]
        ]).concat(zero(result.slice(next + 1)));
      } else {
        var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
        var diffx = result[index] - newThis;
        return zero(result.slice(0, index)).concat([
          newThis - result[index],
          diffx
        ]).concat(zero(result.slice(next + 1)));
      }
    };
    var onLeft = onChange;
    var onMiddle = function (prev, index, next) {
      return onChange(index, next);
    };
    var onRight = function (prev, index) {
      if (step >= 0) {
        return zero(result.slice(0, index)).concat([step]);
      } else {
        var size = Math.max(tableSize.minCellWidth(), result[index] + step);
        return zero(result.slice(0, index)).concat([size - result[index]]);
      }
    };
    return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
  };
  var $_16vhksn4jfeu9kd9 = { determine: determine };

  var getSpan$1 = function (cell, type) {
    return $_gd427vksjfeu9ju9.has(cell, type) && parseInt($_gd427vksjfeu9ju9.get(cell, type), 10) > 1;
  };
  var hasColspan = function (cell) {
    return getSpan$1(cell, 'colspan');
  };
  var hasRowspan = function (cell) {
    return getSpan$1(cell, 'rowspan');
  };
  var getInt = function (element, property) {
    return parseInt($_esap7zl1jfeu9jvv.get(element, property), 10);
  };
  var $_b8n52bn7jfeu9kdx = {
    hasColspan: hasColspan,
    hasRowspan: hasRowspan,
    minWidth: $_8b8jopjujfeu9jnn.constant(10),
    minHeight: $_8b8jopjujfeu9jnn.constant(10),
    getInt: getInt
  };

  var getRaw$1 = function (cell, property, getter) {
    return $_esap7zl1jfeu9jvv.getRaw(cell, property).fold(function () {
      return getter(cell) + 'px';
    }, function (raw) {
      return raw;
    });
  };
  var getRawW = function (cell) {
    return getRaw$1(cell, 'width', $_2mynphlxjfeu9k3h.getPixelWidth);
  };
  var getRawH = function (cell) {
    return getRaw$1(cell, 'height', $_2mynphlxjfeu9k3h.getHeight);
  };
  var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
    var columns = $_95dbe0mojfeu9k9z.columns(warehouse);
    var backups = $_8soyqzjsjfeu9jnc.map(columns, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_8soyqzjsjfeu9jnc.map(columns, function (cellOption, c) {
      var columnCell = cellOption.filter($_8b8jopjujfeu9jnn.not($_b8n52bn7jfeu9kdx.hasColspan));
      return columnCell.fold(function () {
        var deduced = $_b3yf7lmpjfeu9kaa.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getWidth(cell, tableSize);
      });
    });
  };
  var getDeduced = function (deduced) {
    return deduced.map(function (d) {
      return d + 'px';
    }).getOr('');
  };
  var getRawWidths = function (warehouse, direction) {
    return getWidthFrom(warehouse, direction, getRawW, getDeduced);
  };
  var getPercentageWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_2mynphlxjfeu9k3h.getPercentageWidth, function (deduced) {
      return deduced.fold(function () {
        return tableSize.minCellWidth();
      }, function (cellWidth) {
        return cellWidth / tableSize.pixelWidth() * 100;
      });
    }, tableSize);
  };
  var getPixelWidths = function (warehouse, direction, tableSize) {
    return getWidthFrom(warehouse, direction, $_2mynphlxjfeu9k3h.getPixelWidth, function (deduced) {
      return deduced.getOrThunk(tableSize.minCellWidth);
    }, tableSize);
  };
  var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
    var rows = $_95dbe0mojfeu9k9z.rows(warehouse);
    var backups = $_8soyqzjsjfeu9jnc.map(rows, function (cellOption) {
      return cellOption.map(direction.edge);
    });
    return $_8soyqzjsjfeu9jnc.map(rows, function (cellOption, c) {
      var rowCell = cellOption.filter($_8b8jopjujfeu9jnn.not($_b8n52bn7jfeu9kdx.hasRowspan));
      return rowCell.fold(function () {
        var deduced = $_b3yf7lmpjfeu9kaa.deduce(backups, c);
        return fallback(deduced);
      }, function (cell) {
        return getHeight(cell);
      });
    });
  };
  var getPixelHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, $_2mynphlxjfeu9k3h.getHeight, function (deduced) {
      return deduced.getOrThunk($_b8n52bn7jfeu9kdx.minHeight);
    });
  };
  var getRawHeights = function (warehouse, direction) {
    return getHeightFrom(warehouse, direction, getRawH, getDeduced);
  };
  var $_fjqht2n6jfeu9kdm = {
    getRawWidths: getRawWidths,
    getPixelWidths: getPixelWidths,
    getPercentageWidths: getPercentageWidths,
    getPixelHeights: getPixelHeights,
    getRawHeights: getRawHeights
  };

  var total = function (start, end, measures) {
    var r = 0;
    for (var i = start; i < end; i++) {
      r += measures[i] !== undefined ? measures[i] : 0;
    }
    return r;
  };
  var recalculateWidth = function (warehouse, widths) {
    var all = $_8o21o3l0jfeu9jvn.justCells(warehouse);
    return $_8soyqzjsjfeu9jnc.map(all, function (cell) {
      var width = total(cell.column(), cell.column() + cell.colspan(), widths);
      return {
        element: cell.element,
        width: $_8b8jopjujfeu9jnn.constant(width),
        colspan: cell.colspan
      };
    });
  };
  var recalculateHeight = function (warehouse, heights) {
    var all = $_8o21o3l0jfeu9jvn.justCells(warehouse);
    return $_8soyqzjsjfeu9jnc.map(all, function (cell) {
      var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
      return {
        element: cell.element,
        height: $_8b8jopjujfeu9jnn.constant(height),
        rowspan: cell.rowspan
      };
    });
  };
  var matchRowHeight = function (warehouse, heights) {
    return $_8soyqzjsjfeu9jnc.map(warehouse.all(), function (row, i) {
      return {
        element: row.element,
        height: $_8b8jopjujfeu9jnn.constant(heights[i])
      };
    });
  };
  var $_5753axn8jfeu9ke8 = {
    recalculateWidth: recalculateWidth,
    recalculateHeight: recalculateHeight,
    matchRowHeight: matchRowHeight
  };

  var percentageSize = function (width, element) {
    var floatWidth = parseFloat(width);
    var pixelWidth = $_5oyednm1jfeu9k4m.get(element);
    var getCellDelta = function (delta) {
      return delta / pixelWidth * 100;
    };
    var singleColumnWidth = function (width, _delta) {
      return [100 - width];
    };
    var minCellWidth = function () {
      return $_b8n52bn7jfeu9kdx.minWidth() / pixelWidth * 100;
    };
    var setTableWidth = function (table, _newWidths, delta) {
      var total = floatWidth + delta;
      $_2mynphlxjfeu9k3h.setPercentageWidth(table, total);
    };
    return {
      width: $_8b8jopjujfeu9jnn.constant(floatWidth),
      pixelWidth: $_8b8jopjujfeu9jnn.constant(pixelWidth),
      getWidths: $_fjqht2n6jfeu9kdm.getPercentageWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: minCellWidth,
      setElementWidth: $_2mynphlxjfeu9k3h.setPercentageWidth,
      setTableWidth: setTableWidth
    };
  };
  var pixelSize = function (width) {
    var intWidth = parseInt(width, 10);
    var getCellDelta = $_8b8jopjujfeu9jnn.identity;
    var singleColumnWidth = function (width, delta) {
      var newNext = Math.max($_b8n52bn7jfeu9kdx.minWidth(), width + delta);
      return [newNext - width];
    };
    var setTableWidth = function (table, newWidths, _delta) {
      var total = $_8soyqzjsjfeu9jnc.foldr(newWidths, function (b, a) {
        return b + a;
      }, 0);
      $_2mynphlxjfeu9k3h.setPixelWidth(table, total);
    };
    return {
      width: $_8b8jopjujfeu9jnn.constant(intWidth),
      pixelWidth: $_8b8jopjujfeu9jnn.constant(intWidth),
      getWidths: $_fjqht2n6jfeu9kdm.getPixelWidths,
      getCellDelta: getCellDelta,
      singleColumnWidth: singleColumnWidth,
      minCellWidth: $_b8n52bn7jfeu9kdx.minWidth,
      setElementWidth: $_2mynphlxjfeu9k3h.setPixelWidth,
      setTableWidth: setTableWidth
    };
  };
  var chooseSize = function (element, width) {
    if ($_2mynphlxjfeu9k3h.percentageBasedSizeRegex().test(width)) {
      var percentMatch = $_2mynphlxjfeu9k3h.percentageBasedSizeRegex().exec(width);
      return percentageSize(percentMatch[1], element);
    } else if ($_2mynphlxjfeu9k3h.pixelBasedSizeRegex().test(width)) {
      var pixelMatch = $_2mynphlxjfeu9k3h.pixelBasedSizeRegex().exec(width);
      return pixelSize(pixelMatch[1]);
    } else {
      var fallbackWidth = $_5oyednm1jfeu9k4m.get(element);
      return pixelSize(fallbackWidth);
    }
  };
  var getTableSize = function (element) {
    var width = $_2mynphlxjfeu9k3h.getRawWidth(element);
    return width.fold(function () {
      var fallbackWidth = $_5oyednm1jfeu9k4m.get(element);
      return pixelSize(fallbackWidth);
    }, function (width) {
      return chooseSize(element, width);
    });
  };
  var $_dd0gyzn9jfeu9keh = { getTableSize: getTableSize };

  var getWarehouse$1 = function (list) {
    return $_8o21o3l0jfeu9jvn.generate(list);
  };
  var sumUp = function (newSize) {
    return $_8soyqzjsjfeu9jnc.foldr(newSize, function (b, a) {
      return b + a;
    }, 0);
  };
  var getTableWarehouse = function (table) {
    var list = $_csfqqxk2jfeu9jph.fromTable(table);
    return getWarehouse$1(list);
  };
  var adjustWidth = function (table, delta, index, direction) {
    var tableSize = $_dd0gyzn9jfeu9keh.getTableSize(table);
    var step = tableSize.getCellDelta(delta);
    var warehouse = getTableWarehouse(table);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var deltas = $_16vhksn4jfeu9kd9.determine(widths, index, step, tableSize);
    var newWidths = $_8soyqzjsjfeu9jnc.map(deltas, function (dx, i) {
      return dx + widths[i];
    });
    var newSizes = $_5753axn8jfeu9ke8.recalculateWidth(warehouse, newWidths);
    $_8soyqzjsjfeu9jnc.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    if (index === warehouse.grid().columns() - 1) {
      tableSize.setTableWidth(table, newWidths, step);
    }
  };
  var adjustHeight = function (table, delta, index, direction) {
    var warehouse = getTableWarehouse(table);
    var heights = $_fjqht2n6jfeu9kdm.getPixelHeights(warehouse, direction);
    var newHeights = $_8soyqzjsjfeu9jnc.map(heights, function (dy, i) {
      return index === i ? Math.max(delta + dy, $_b8n52bn7jfeu9kdx.minHeight()) : dy;
    });
    var newCellSizes = $_5753axn8jfeu9ke8.recalculateHeight(warehouse, newHeights);
    var newRowSizes = $_5753axn8jfeu9ke8.matchRowHeight(warehouse, newHeights);
    $_8soyqzjsjfeu9jnc.each(newRowSizes, function (row) {
      $_2mynphlxjfeu9k3h.setHeight(row.element(), row.height());
    });
    $_8soyqzjsjfeu9jnc.each(newCellSizes, function (cell) {
      $_2mynphlxjfeu9k3h.setHeight(cell.element(), cell.height());
    });
    var total = sumUp(newHeights);
    $_2mynphlxjfeu9k3h.setHeight(table, total);
  };
  var adjustWidthTo = function (table, list, direction) {
    var tableSize = $_dd0gyzn9jfeu9keh.getTableSize(table);
    var warehouse = getWarehouse$1(list);
    var widths = tableSize.getWidths(warehouse, direction, tableSize);
    var newSizes = $_5753axn8jfeu9ke8.recalculateWidth(warehouse, widths);
    $_8soyqzjsjfeu9jnc.each(newSizes, function (cell) {
      tableSize.setElementWidth(cell.element(), cell.width());
    });
    var total = $_8soyqzjsjfeu9jnc.foldr(widths, function (b, a) {
      return a + b;
    }, 0);
    if (newSizes.length > 0) {
      tableSize.setElementWidth(table, total);
    }
  };
  var $_6grssqn3jfeu9kd0 = {
    adjustWidth: adjustWidth,
    adjustHeight: adjustHeight,
    adjustWidthTo: adjustWidthTo
  };

  var prune = function (table) {
    var cells = $_811muwk4jfeu9jq0.cells(table);
    if (cells.length === 0)
      $_sg34gl4jfeu9jwb.remove(table);
  };
  var outcome = $_6s7wfojxjfeu9joz.immutable('grid', 'cursor');
  var elementFromGrid = function (grid, row, column) {
    return findIn(grid, row, column).orThunk(function () {
      return findIn(grid, 0, 0);
    });
  };
  var findIn = function (grid, row, column) {
    return Option.from(grid[row]).bind(function (r) {
      return Option.from(r.cells()[column]).bind(function (c) {
        return Option.from(c.element());
      });
    });
  };
  var bundle = function (grid, row, column) {
    return outcome(grid, findIn(grid, row, column));
  };
  var uniqueRows = function (details) {
    return $_8soyqzjsjfeu9jnc.foldl(details, function (rest, detail) {
      return $_8soyqzjsjfeu9jnc.exists(rest, function (currentDetail) {
        return currentDetail.row() === detail.row();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.row() - detailB.row();
    });
  };
  var uniqueColumns = function (details) {
    return $_8soyqzjsjfeu9jnc.foldl(details, function (rest, detail) {
      return $_8soyqzjsjfeu9jnc.exists(rest, function (currentDetail) {
        return currentDetail.column() === detail.column();
      }) ? rest : rest.concat([detail]);
    }, []).sort(function (detailA, detailB) {
      return detailA.column() - detailB.column();
    });
  };
  var insertRowBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row();
    var newGrid = $_6n1p8vn1jfeu9kcf.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsBefore = function (grid, details, comparator, genWrappers) {
    var example = details[0].row();
    var targetIndex = details[0].row();
    var rows = uniqueRows(details);
    var newGrid = $_8soyqzjsjfeu9jnc.foldl(rows, function (newGrid, _row) {
      return $_6n1p8vn1jfeu9kcf.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertRowAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.row();
    var targetIndex = detail.row() + detail.rowspan();
    var newGrid = $_6n1p8vn1jfeu9kcf.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, targetIndex, detail.column());
  };
  var insertRowsAfter = function (grid, details, comparator, genWrappers) {
    var rows = uniqueRows(details);
    var example = rows[rows.length - 1].row();
    var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
    var newGrid = $_8soyqzjsjfeu9jnc.foldl(rows, function (newGrid, _row) {
      return $_6n1p8vn1jfeu9kcf.insertRowAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, targetIndex, details[0].column());
  };
  var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column();
    var newGrid = $_6n1p8vn1jfeu9kcf.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
    var columns = uniqueColumns(details);
    var example = columns[0].column();
    var targetIndex = columns[0].column();
    var newGrid = $_8soyqzjsjfeu9jnc.foldl(columns, function (newGrid, _row) {
      return $_6n1p8vn1jfeu9kcf.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
    var example = detail.column();
    var targetIndex = detail.column() + detail.colspan();
    var newGrid = $_6n1p8vn1jfeu9kcf.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), targetIndex);
  };
  var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
    var example = details[details.length - 1].column();
    var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
    var columns = uniqueColumns(details);
    var newGrid = $_8soyqzjsjfeu9jnc.foldl(columns, function (newGrid, _row) {
      return $_6n1p8vn1jfeu9kcf.insertColumnAt(newGrid, targetIndex, example, comparator, genWrappers.getOrInit);
    }, grid);
    return bundle(newGrid, details[0].row(), targetIndex);
  };
  var makeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_4ahxnkn2jfeu9kcm.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_4ahxnkn2jfeu9kcm.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_4ahxnkn2jfeu9kcm.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_4ahxnkn2jfeu9kcm.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_6n1p8vn1jfeu9kcf.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
    var newGrid = $_6n1p8vn1jfeu9kcf.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
    return bundle(newGrid, detail.row(), detail.column());
  };
  var eraseColumns = function (grid, details, comparator, _genWrappers) {
    var columns = uniqueColumns(details);
    var newGrid = $_6n1p8vn1jfeu9kcf.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var eraseRows = function (grid, details, comparator, _genWrappers) {
    var rows = uniqueRows(details);
    var newGrid = $_6n1p8vn1jfeu9kcf.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
    var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
    return outcome(newGrid, cursor);
  };
  var mergeCells = function (grid, mergable, comparator, _genWrappers) {
    var cells = mergable.cells();
    $_3lm8wumdjfeu9k6p.merge(cells);
    var newGrid = $_fu995qn0jfeu9kc4.merge(grid, mergable.bounds(), comparator, $_8b8jopjujfeu9jnn.constant(cells[0]));
    return outcome(newGrid, Option.from(cells[0]));
  };
  var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
    var newGrid = $_8soyqzjsjfeu9jnc.foldr(unmergable, function (b, cell) {
      return $_fu995qn0jfeu9kc4.unmerge(b, cell, comparator, genWrappers.combine(cell));
    }, grid);
    return outcome(newGrid, Option.from(unmergable[0]));
  };
  var pasteCells = function (grid, pasteDetails, comparator, genWrappers) {
    var gridify = function (table, generators) {
      var list = $_csfqqxk2jfeu9jph.fromTable(table);
      var wh = $_8o21o3l0jfeu9jvn.generate(list);
      return $_8v9rxomjjfeu9k8d.toGrid(wh, generators, true);
    };
    var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
    var startAddress = $_2crbd2k3jfeu9jpu.address(pasteDetails.row(), pasteDetails.column());
    var mergedGrid = $_d9q6bpmxjfeu9kbe.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
    return mergedGrid.fold(function () {
      return outcome(grid, Option.some(pasteDetails.element()));
    }, function (nuGrid) {
      var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
      return outcome(nuGrid, cursor);
    });
  };
  var gridifyRows = function (rows, generators, example) {
    var pasteDetails = $_csfqqxk2jfeu9jph.fromPastedRows(rows, example);
    var wh = $_8o21o3l0jfeu9jvn.generate(pasteDetails);
    return $_8v9rxomjjfeu9k8d.toGrid(wh, generators, true);
  };
  var pasteRowsBefore = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[0].row();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_d9q6bpmxjfeu9kbe.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var pasteRowsAfter = function (grid, pasteDetails, comparator, genWrappers) {
    var example = grid[pasteDetails.cells[0].row()];
    var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
    var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
    var mergedGrid = $_d9q6bpmxjfeu9kbe.insert(index, grid, gridB, pasteDetails.generators(), comparator);
    var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
    return outcome(mergedGrid, cursor);
  };
  var resize = $_6grssqn3jfeu9kd0.adjustWidthTo;
  var $_9wuvolm9jfeu9k5p = {
    insertRowBefore: $_8j5l0qmgjfeu9k7r.run(insertRowBefore, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertRowsBefore: $_8j5l0qmgjfeu9k7r.run(insertRowsBefore, $_8j5l0qmgjfeu9k7r.onCells, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertRowAfter: $_8j5l0qmgjfeu9k7r.run(insertRowAfter, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertRowsAfter: $_8j5l0qmgjfeu9k7r.run(insertRowsAfter, $_8j5l0qmgjfeu9k7r.onCells, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertColumnBefore: $_8j5l0qmgjfeu9k7r.run(insertColumnBefore, $_8j5l0qmgjfeu9k7r.onCell, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertColumnsBefore: $_8j5l0qmgjfeu9k7r.run(insertColumnsBefore, $_8j5l0qmgjfeu9k7r.onCells, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertColumnAfter: $_8j5l0qmgjfeu9k7r.run(insertColumnAfter, $_8j5l0qmgjfeu9k7r.onCell, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    insertColumnsAfter: $_8j5l0qmgjfeu9k7r.run(insertColumnsAfter, $_8j5l0qmgjfeu9k7r.onCells, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    splitCellIntoColumns: $_8j5l0qmgjfeu9k7r.run(splitCellIntoColumns$1, $_8j5l0qmgjfeu9k7r.onCell, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    splitCellIntoRows: $_8j5l0qmgjfeu9k7r.run(splitCellIntoRows$1, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    eraseColumns: $_8j5l0qmgjfeu9k7r.run(eraseColumns, $_8j5l0qmgjfeu9k7r.onCells, resize, prune, $_1m4ciqmajfeu9k65.modification),
    eraseRows: $_8j5l0qmgjfeu9k7r.run(eraseRows, $_8j5l0qmgjfeu9k7r.onCells, $_8b8jopjujfeu9jnn.noop, prune, $_1m4ciqmajfeu9k65.modification),
    makeColumnHeader: $_8j5l0qmgjfeu9k7r.run(makeColumnHeader, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.transform('row', 'th')),
    unmakeColumnHeader: $_8j5l0qmgjfeu9k7r.run(unmakeColumnHeader, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.transform(null, 'td')),
    makeRowHeader: $_8j5l0qmgjfeu9k7r.run(makeRowHeader, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.transform('col', 'th')),
    unmakeRowHeader: $_8j5l0qmgjfeu9k7r.run(unmakeRowHeader, $_8j5l0qmgjfeu9k7r.onCell, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.transform(null, 'td')),
    mergeCells: $_8j5l0qmgjfeu9k7r.run(mergeCells, $_8j5l0qmgjfeu9k7r.onMergable, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.merging),
    unmergeCells: $_8j5l0qmgjfeu9k7r.run(unmergeCells, $_8j5l0qmgjfeu9k7r.onUnmergable, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.merging),
    pasteCells: $_8j5l0qmgjfeu9k7r.run(pasteCells, $_8j5l0qmgjfeu9k7r.onPaste, resize, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    pasteRowsBefore: $_8j5l0qmgjfeu9k7r.run(pasteRowsBefore, $_8j5l0qmgjfeu9k7r.onPasteRows, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification),
    pasteRowsAfter: $_8j5l0qmgjfeu9k7r.run(pasteRowsAfter, $_8j5l0qmgjfeu9k7r.onPasteRows, $_8b8jopjujfeu9jnn.noop, $_8b8jopjujfeu9jnn.noop, $_1m4ciqmajfeu9k65.modification)
  };

  var getBody$1 = function (editor) {
    return $_5csi13k7jfeu9jrb.fromDom(editor.getBody());
  };
  var getIsRoot = function (editor) {
    return function (element) {
      return $_adlyqikbjfeu9js6.eq(element, getBody$1(editor));
    };
  };
  var removePxSuffix = function (size) {
    return size ? size.replace(/px$/, '') : '';
  };
  var addSizeSuffix = function (size) {
    if (/^[0-9]+$/.test(size)) {
      size += 'px';
    }
    return size;
  };
  var $_ejkywknajfeu9ket = {
    getBody: getBody$1,
    getIsRoot: getIsRoot,
    addSizeSuffix: addSizeSuffix,
    removePxSuffix: removePxSuffix
  };

  var onDirection = function (isLtr, isRtl) {
    return function (element) {
      return getDirection(element) === 'rtl' ? isRtl : isLtr;
    };
  };
  var getDirection = function (element) {
    return $_esap7zl1jfeu9jvv.get(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
  };
  var $_1owbbyncjfeu9kf8 = {
    onDirection: onDirection,
    getDirection: getDirection
  };

  var ltr$1 = { isRtl: $_8b8jopjujfeu9jnn.constant(false) };
  var rtl$1 = { isRtl: $_8b8jopjujfeu9jnn.constant(true) };
  var directionAt = function (element) {
    var dir = $_1owbbyncjfeu9kf8.getDirection(element);
    return dir === 'rtl' ? rtl$1 : ltr$1;
  };
  var $_3ta6w6nbjfeu9kf0 = { directionAt: directionAt };

  var defaultTableToolbar = [
    'tableprops',
    'tabledelete',
    '|',
    'tableinsertrowbefore',
    'tableinsertrowafter',
    'tabledeleterow',
    '|',
    'tableinsertcolbefore',
    'tableinsertcolafter',
    'tabledeletecol'
  ];
  var defaultStyles = {
    'border-collapse': 'collapse',
    'width': '100%'
  };
  var defaultAttributes = { border: '1' };
  var getDefaultAttributes = function (editor) {
    return editor.getParam('table_default_attributes', defaultAttributes, 'object');
  };
  var getDefaultStyles = function (editor) {
    return editor.getParam('table_default_styles', defaultStyles, 'object');
  };
  var hasTableResizeBars = function (editor) {
    return editor.getParam('table_resize_bars', true, 'boolean');
  };
  var hasTabNavigation = function (editor) {
    return editor.getParam('table_tab_navigation', true, 'boolean');
  };
  var getForcedRootBlock = function (editor) {
    return editor.getParam('forced_root_block', 'p', 'string');
  };
  var hasAdvancedCellTab = function (editor) {
    return editor.getParam('table_cell_advtab', true, 'boolean');
  };
  var hasAdvancedRowTab = function (editor) {
    return editor.getParam('table_row_advtab', true, 'boolean');
  };
  var hasAdvancedTableTab = function (editor) {
    return editor.getParam('table_advtab', true, 'boolean');
  };
  var hasAppearanceOptions = function (editor) {
    return editor.getParam('table_appearance_options', true, 'boolean');
  };
  var hasTableGrid = function (editor) {
    return editor.getParam('table_grid', true, 'boolean');
  };
  var shouldStyleWithCss = function (editor) {
    return editor.getParam('table_style_by_css', false, 'boolean');
  };
  var getForcedRootBlockAttrs = function (editor) {
    return editor.getParam('forced_block_attrs', {}, 'object');
  };
  var getCellClassList = function (editor) {
    return editor.getParam('table_cell_class_list', [], 'array');
  };
  var getRowClassList = function (editor) {
    return editor.getParam('table_row_class_list', [], 'array');
  };
  var getTableClassList = function (editor) {
    return editor.getParam('table_class_list', [], 'array');
  };
  var getColorPickerCallback = function (editor) {
    return editor.getParam('color_picker_callback');
  };
  var isPixelsForced = function (editor) {
    return editor.getParam('table_responsive_width') === false;
  };
  var getCloneElements = function (editor) {
    var cloneElements = editor.getParam('table_clone_elements');
    if ($_91jv01k1jfeu9jpc.isString(cloneElements)) {
      return Option.some(cloneElements.split(/[ ,]/));
    } else if (Array.isArray(cloneElements)) {
      return Option.some(cloneElements);
    } else {
      return Option.none();
    }
  };
  var hasObjectResizing = function (editor) {
    var objectResizing = editor.getParam('object_resizing', true);
    return objectResizing === 'table' || objectResizing;
  };
  var getToolbar = function (editor) {
    var toolbar = editor.getParam('table_toolbar', defaultTableToolbar);
    if (toolbar === '' || toolbar === false) {
      return [];
    } else if ($_91jv01k1jfeu9jpc.isString(toolbar)) {
      return toolbar.split(/[ ,]/);
    } else if ($_91jv01k1jfeu9jpc.isArray(toolbar)) {
      return toolbar;
    } else {
      return [];
    }
  };

  var fireNewRow = function (editor, row) {
    return editor.fire('newrow', { node: row });
  };
  var fireNewCell = function (editor, cell) {
    return editor.fire('newcell', { node: cell });
  };

  var TableActions = function (editor, lazyWire) {
    var isTableBody = function (editor) {
      return $_prkbektjfeu9juk.name($_ejkywknajfeu9ket.getBody(editor)) === 'table';
    };
    var lastRowGuard = function (table) {
      var size = $_9lz68em8jfeu9k5m.getGridSize(table);
      return isTableBody(editor) === false || size.rows() > 1;
    };
    var lastColumnGuard = function (table) {
      var size = $_9lz68em8jfeu9k5m.getGridSize(table);
      return isTableBody(editor) === false || size.columns() > 1;
    };
    var cloneFormats = getCloneElements(editor);
    var execute = function (operation, guard, mutate, lazyWire) {
      return function (table, target) {
        var dataStyleCells = $_dva6q3kujfeu9juo.descendants(table, 'td[data-mce-style],th[data-mce-style]');
        $_8soyqzjsjfeu9jnc.each(dataStyleCells, function (cell) {
          $_gd427vksjfeu9ju9.remove(cell, 'data-mce-style');
        });
        var wire = lazyWire();
        var doc = $_5csi13k7jfeu9jrb.fromDom(editor.getDoc());
        var direction = TableDirection($_3ta6w6nbjfeu9kf0.directionAt);
        var generators = $_eqiwv2l6jfeu9jwk.cellOperations(mutate, doc, cloneFormats);
        return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
          $_8soyqzjsjfeu9jnc.each(result.newRows(), function (row) {
            fireNewRow(editor, row.dom());
          });
          $_8soyqzjsjfeu9jnc.each(result.newCells(), function (cell) {
            fireNewCell(editor, cell.dom());
          });
          return result.cursor().map(function (cell) {
            var rng = editor.dom.createRng();
            rng.setStart(cell.dom(), 0);
            rng.setEnd(cell.dom(), 0);
            return rng;
          });
        }) : Option.none();
      };
    };
    var deleteRow = execute($_9wuvolm9jfeu9k5p.eraseRows, lastRowGuard, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var deleteColumn = execute($_9wuvolm9jfeu9k5p.eraseColumns, lastColumnGuard, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var insertRowsBefore = execute($_9wuvolm9jfeu9k5p.insertRowsBefore, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var insertRowsAfter = execute($_9wuvolm9jfeu9k5p.insertRowsAfter, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var insertColumnsBefore = execute($_9wuvolm9jfeu9k5p.insertColumnsBefore, $_8b8jopjujfeu9jnn.always, $_f59omrlwjfeu9k3d.halve, lazyWire);
    var insertColumnsAfter = execute($_9wuvolm9jfeu9k5p.insertColumnsAfter, $_8b8jopjujfeu9jnn.always, $_f59omrlwjfeu9k3d.halve, lazyWire);
    var mergeCells = execute($_9wuvolm9jfeu9k5p.mergeCells, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var unmergeCells = execute($_9wuvolm9jfeu9k5p.unmergeCells, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var pasteRowsBefore = execute($_9wuvolm9jfeu9k5p.pasteRowsBefore, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var pasteRowsAfter = execute($_9wuvolm9jfeu9k5p.pasteRowsAfter, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    var pasteCells = execute($_9wuvolm9jfeu9k5p.pasteCells, $_8b8jopjujfeu9jnn.always, $_8b8jopjujfeu9jnn.noop, lazyWire);
    return {
      deleteRow: deleteRow,
      deleteColumn: deleteColumn,
      insertRowsBefore: insertRowsBefore,
      insertRowsAfter: insertRowsAfter,
      insertColumnsBefore: insertColumnsBefore,
      insertColumnsAfter: insertColumnsAfter,
      mergeCells: mergeCells,
      unmergeCells: unmergeCells,
      pasteRowsBefore: pasteRowsBefore,
      pasteRowsAfter: pasteRowsAfter,
      pasteCells: pasteCells
    };
  };

  var copyRows = function (table, target, generators) {
    var list = $_csfqqxk2jfeu9jph.fromTable(table);
    var house = $_8o21o3l0jfeu9jvn.generate(list);
    var details = $_8j5l0qmgjfeu9k7r.onCells(house, target);
    return details.map(function (selectedCells) {
      var grid = $_8v9rxomjjfeu9k8d.toGrid(house, generators, false);
      var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
      var slicedDetails = $_8j5l0qmgjfeu9k7r.toDetailList(slicedGrid, generators);
      return $_cjajefmmjfeu9k8s.copy(slicedDetails);
    });
  };
  var $_19jq6vngjfeu9kgj = { copyRows: copyRows };

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var getTDTHOverallStyle = function (dom, elm, name) {
    var cells = dom.select('td,th', elm);
    var firstChildStyle;
    var checkChildren = function (firstChildStyle, elms) {
      for (var i = 0; i < elms.length; i++) {
        var currentStyle = dom.getStyle(elms[i], name);
        if (typeof firstChildStyle === 'undefined') {
          firstChildStyle = currentStyle;
        }
        if (firstChildStyle !== currentStyle) {
          return '';
        }
      }
      return firstChildStyle;
    };
    firstChildStyle = checkChildren(firstChildStyle, cells);
    return firstChildStyle;
  };
  var applyAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('align' + name, {}, elm);
    }
  };
  var applyVAlign = function (editor, elm, name) {
    if (name) {
      editor.formatter.apply('valign' + name, {}, elm);
    }
  };
  var unApplyAlign = function (editor, elm) {
    global$2.each('left center right'.split(' '), function (name) {
      editor.formatter.remove('align' + name, {}, elm);
    });
  };
  var unApplyVAlign = function (editor, elm) {
    global$2.each('top middle bottom'.split(' '), function (name) {
      editor.formatter.remove('valign' + name, {}, elm);
    });
  };
  var $_9rudyhnjjfeu9kh0 = {
    applyAlign: applyAlign,
    applyVAlign: applyVAlign,
    unApplyAlign: unApplyAlign,
    unApplyVAlign: unApplyVAlign,
    getTDTHOverallStyle: getTDTHOverallStyle
  };

  var buildListItems = function (inputList, itemCallback, startItems) {
    var appendItems = function (values, output) {
      output = output || [];
      global$2.each(values, function (item) {
        var menuItem = { text: item.text || item.title };
        if (item.menu) {
          menuItem.menu = appendItems(item.menu);
        } else {
          menuItem.value = item.value;
          if (itemCallback) {
            itemCallback(menuItem);
          }
        }
        output.push(menuItem);
      });
      return output;
    };
    return appendItems(inputList, startItems || []);
  };
  var updateStyleField = function (editor, evt) {
    var dom = editor.dom;
    var rootControl = evt.control.rootControl;
    var data = rootControl.toJSON();
    var css = dom.parseStyle(data.style);
    if (evt.control.name() === 'style') {
      rootControl.find('#borderStyle').value(css['border-style'] || '')[0].fire('select');
      rootControl.find('#borderColor').value(css['border-color'] || '')[0].fire('change');
      rootControl.find('#backgroundColor').value(css['background-color'] || '')[0].fire('change');
      rootControl.find('#width').value(css.width || '').fire('change');
      rootControl.find('#height').value(css.height || '').fire('change');
    } else {
      css['border-style'] = data.borderStyle;
      css['border-color'] = data.borderColor;
      css['background-color'] = data.backgroundColor;
      css.width = data.width ? $_ejkywknajfeu9ket.addSizeSuffix(data.width) : '';
      css.height = data.height ? $_ejkywknajfeu9ket.addSizeSuffix(data.height) : '';
    }
    rootControl.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
  };
  var extractAdvancedStyles = function (dom, elm) {
    var css = dom.parseStyle(dom.getAttrib(elm, 'style'));
    var data = {};
    if (css['border-style']) {
      data.borderStyle = css['border-style'];
    }
    if (css['border-color']) {
      data.borderColor = css['border-color'];
    }
    if (css['background-color']) {
      data.backgroundColor = css['background-color'];
    }
    data.style = dom.serializeStyle(css);
    return data;
  };
  var createStyleForm = function (editor) {
    var createColorPickAction = function () {
      var colorPickerCallback = getColorPickerCallback(editor);
      if (colorPickerCallback) {
        return function (evt) {
          return colorPickerCallback.call(editor, function (value) {
            evt.control.value(value).fire('change');
          }, evt.control.value());
        };
      }
    };
    return {
      title: 'Advanced',
      type: 'form',
      defaults: { onchange: $_8b8jopjujfeu9jnn.curry(updateStyleField, editor) },
      items: [
        {
          label: 'Style',
          name: 'style',
          type: 'textbox'
        },
        {
          type: 'form',
          padding: 0,
          formItemDefaults: {
            layout: 'grid',
            alignH: [
              'start',
              'right'
            ]
          },
          defaults: { size: 7 },
          items: [
            {
              label: 'Border style',
              type: 'listbox',
              name: 'borderStyle',
              width: 90,
              onselect: $_8b8jopjujfeu9jnn.curry(updateStyleField, editor),
              values: [
                {
                  text: 'Select...',
                  value: ''
                },
                {
                  text: 'Solid',
                  value: 'solid'
                },
                {
                  text: 'Dotted',
                  value: 'dotted'
                },
                {
                  text: 'Dashed',
                  value: 'dashed'
                },
                {
                  text: 'Double',
                  value: 'double'
                },
                {
                  text: 'Groove',
                  value: 'groove'
                },
                {
                  text: 'Ridge',
                  value: 'ridge'
                },
                {
                  text: 'Inset',
                  value: 'inset'
                },
                {
                  text: 'Outset',
                  value: 'outset'
                },
                {
                  text: 'None',
                  value: 'none'
                },
                {
                  text: 'Hidden',
                  value: 'hidden'
                }
              ]
            },
            {
              label: 'Border color',
              type: 'colorbox',
              name: 'borderColor',
              onaction: createColorPickAction()
            },
            {
              label: 'Background color',
              type: 'colorbox',
              name: 'backgroundColor',
              onaction: createColorPickAction()
            }
          ]
        }
      ]
    };
  };
  var $_e33lhqnkjfeu9kh4 = {
    createStyleForm: createStyleForm,
    buildListItems: buildListItems,
    updateStyleField: updateStyleField,
    extractAdvancedStyles: extractAdvancedStyles
  };

  var updateStyles = function (elm, cssText) {
    elm.style.cssText += ';' + cssText;
  };
  var extractDataFromElement = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      type: elm.nodeName.toLowerCase(),
      style: '',
      align: '',
      valign: ''
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    global$2.each('top middle bottom'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'valign' + name)) {
        data.valign = name;
      }
    });
    if (hasAdvancedCellTab(editor)) {
      global$2.extend(data, $_e33lhqnkjfeu9kh4.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var onSubmitCellForm = function (editor, cells, evt) {
    var dom = editor.dom;
    var data;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_e33lhqnkjfeu9kh4.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$2.each(cells, function (cellElm) {
        setAttrib(cellElm, 'scope', data.scope);
        if (cells.length === 1) {
          setAttrib(cellElm, 'style', data.style);
        } else {
          updateStyles(cellElm, data.style);
        }
        setAttrib(cellElm, 'class', data.class);
        setStyle(cellElm, 'width', $_ejkywknajfeu9ket.addSizeSuffix(data.width));
        setStyle(cellElm, 'height', $_ejkywknajfeu9ket.addSizeSuffix(data.height));
        if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
          cellElm = dom.rename(cellElm, data.type);
        }
        if (cells.length === 1) {
          $_9rudyhnjjfeu9kh0.unApplyAlign(editor, cellElm);
          $_9rudyhnjjfeu9kh0.unApplyVAlign(editor, cellElm);
        }
        if (data.align) {
          $_9rudyhnjjfeu9kh0.applyAlign(editor, cellElm, data.align);
        }
        if (data.valign) {
          $_9rudyhnjjfeu9kh0.applyVAlign(editor, cellElm, data.valign);
        }
      });
      editor.focus();
    });
  };
  var open = function (editor) {
    var cellElm, data, classListCtrl, cells = [];
    cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
    cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
    if (!cells.length && cellElm) {
      cells.push(cellElm);
    }
    cellElm = cellElm || cells[0];
    if (!cellElm) {
      return;
    }
    if (cells.length > 1) {
      data = {
        width: '',
        height: '',
        scope: '',
        class: '',
        align: '',
        valign: '',
        style: '',
        type: cellElm.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement(editor, cellElm);
    }
    if (getCellClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_e33lhqnkjfeu9kh4.buildListItems(getCellClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'td',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    var generalCellForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          layout: 'grid',
          columns: 2,
          labelGapCalc: false,
          padding: 0,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: [
            {
              label: 'Width',
              name: 'width',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            },
            {
              label: 'Cell type',
              name: 'type',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'Cell',
                  value: 'td'
                },
                {
                  text: 'Header cell',
                  value: 'th'
                }
              ]
            },
            {
              label: 'Scope',
              name: 'scope',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Row',
                  value: 'row'
                },
                {
                  text: 'Column',
                  value: 'col'
                },
                {
                  text: 'Row group',
                  value: 'rowgroup'
                },
                {
                  text: 'Column group',
                  value: 'colgroup'
                }
              ]
            },
            {
              label: 'H Align',
              name: 'align',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Left',
                  value: 'left'
                },
                {
                  text: 'Center',
                  value: 'center'
                },
                {
                  text: 'Right',
                  value: 'right'
                }
              ]
            },
            {
              label: 'V Align',
              name: 'valign',
              type: 'listbox',
              text: 'None',
              minWidth: 90,
              maxWidth: null,
              values: [
                {
                  text: 'None',
                  value: ''
                },
                {
                  text: 'Top',
                  value: 'top'
                },
                {
                  text: 'Middle',
                  value: 'middle'
                },
                {
                  text: 'Bottom',
                  value: 'bottom'
                }
              ]
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedCellTab(editor)) {
      editor.windowManager.open({
        title: 'Cell properties',
        bodyType: 'tabpanel',
        data: data,
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalCellForm
          },
          $_e33lhqnkjfeu9kh4.createStyleForm(editor)
        ],
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitCellForm, editor, cells)
      });
    } else {
      editor.windowManager.open({
        title: 'Cell properties',
        data: data,
        body: generalCellForm,
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitCellForm, editor, cells)
      });
    }
  };
  var $_4lgmbrnijfeu9kgp = { open: open };

  var extractDataFromElement$1 = function (editor, elm) {
    var dom = editor.dom;
    var data = {
      height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
      scope: dom.getAttrib(elm, 'scope'),
      class: dom.getAttrib(elm, 'class'),
      align: '',
      style: '',
      type: elm.parentNode.nodeName.toLowerCase()
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(elm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedRowTab(editor)) {
      global$2.extend(data, $_e33lhqnkjfeu9kh4.extractAdvancedStyles(dom, elm));
    }
    return data;
  };
  var switchRowType = function (dom, rowElm, toType) {
    var tableElm = dom.getParent(rowElm, 'table');
    var oldParentElm = rowElm.parentNode;
    var parentElm = dom.select(toType, tableElm)[0];
    if (!parentElm) {
      parentElm = dom.create(toType);
      if (tableElm.firstChild) {
        if (tableElm.firstChild.nodeName === 'CAPTION') {
          dom.insertAfter(parentElm, tableElm.firstChild);
        } else {
          tableElm.insertBefore(parentElm, tableElm.firstChild);
        }
      } else {
        tableElm.appendChild(parentElm);
      }
    }
    parentElm.appendChild(rowElm);
    if (!oldParentElm.hasChildNodes()) {
      dom.remove(oldParentElm);
    }
  };
  function onSubmitRowForm(editor, rows, oldData, evt) {
    var dom = editor.dom;
    function setAttrib(elm, name, value) {
      if (value) {
        dom.setAttrib(elm, name, value);
      }
    }
    function setStyle(elm, name, value) {
      if (value) {
        dom.setStyle(elm, name, value);
      }
    }
    $_e33lhqnkjfeu9kh4.updateStyleField(editor, evt);
    var data = evt.control.rootControl.toJSON();
    editor.undoManager.transact(function () {
      global$2.each(rows, function (rowElm) {
        setAttrib(rowElm, 'scope', data.scope);
        setAttrib(rowElm, 'style', data.style);
        setAttrib(rowElm, 'class', data.class);
        setStyle(rowElm, 'height', $_ejkywknajfeu9ket.addSizeSuffix(data.height));
        if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
          switchRowType(editor.dom, rowElm, data.type);
        }
        if (data.align !== oldData.align) {
          $_9rudyhnjjfeu9kh0.unApplyAlign(editor, rowElm);
          $_9rudyhnjjfeu9kh0.applyAlign(editor, rowElm, data.align);
        }
      });
      editor.focus();
    });
  }
  var open$1 = function (editor) {
    var dom = editor.dom;
    var tableElm, cellElm, rowElm, classListCtrl, data;
    var rows = [];
    var generalRowForm;
    tableElm = dom.getParent(editor.selection.getStart(), 'table');
    cellElm = dom.getParent(editor.selection.getStart(), 'td,th');
    global$2.each(tableElm.rows, function (row) {
      global$2.each(row.cells, function (cell) {
        if (dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) {
          rows.push(row);
          return false;
        }
      });
    });
    rowElm = rows[0];
    if (!rowElm) {
      return;
    }
    if (rows.length > 1) {
      data = {
        height: '',
        scope: '',
        style: '',
        class: '',
        align: '',
        type: rowElm.parentNode.nodeName.toLowerCase()
      };
    } else {
      data = extractDataFromElement$1(editor, rowElm);
    }
    if (getRowClassList(editor).length > 0) {
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_e33lhqnkjfeu9kh4.buildListItems(getRowClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'tr',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalRowForm = {
      type: 'form',
      columns: 2,
      padding: 0,
      defaults: { type: 'textbox' },
      items: [
        {
          type: 'listbox',
          name: 'type',
          label: 'Row type',
          text: 'Header',
          maxWidth: null,
          values: [
            {
              text: 'Header',
              value: 'thead'
            },
            {
              text: 'Body',
              value: 'tbody'
            },
            {
              text: 'Footer',
              value: 'tfoot'
            }
          ]
        },
        {
          type: 'listbox',
          name: 'align',
          label: 'Alignment',
          text: 'None',
          maxWidth: null,
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        {
          label: 'Height',
          name: 'height'
        },
        classListCtrl
      ]
    };
    if (hasAdvancedRowTab(editor)) {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalRowForm
          },
          $_e33lhqnkjfeu9kh4.createStyleForm(editor)
        ],
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitRowForm, editor, rows, data)
      });
    } else {
      editor.windowManager.open({
        title: 'Row properties',
        data: data,
        body: generalRowForm,
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitRowForm, editor, rows, data)
      });
    }
  };
  var $_2f4uqqnljfeu9khd = { open: open$1 };

  var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

  var DefaultRenderOptions = {
    styles: {
      'border-collapse': 'collapse',
      width: '100%'
    },
    attributes: { border: '1' },
    percentages: true
  };
  var makeTable = function () {
    return $_5csi13k7jfeu9jrb.fromTag('table');
  };
  var tableBody = function () {
    return $_5csi13k7jfeu9jrb.fromTag('tbody');
  };
  var tableRow = function () {
    return $_5csi13k7jfeu9jrb.fromTag('tr');
  };
  var tableHeaderCell = function () {
    return $_5csi13k7jfeu9jrb.fromTag('th');
  };
  var tableCell = function () {
    return $_5csi13k7jfeu9jrb.fromTag('td');
  };
  var render$1 = function (rows, columns, rowHeaders, columnHeaders, renderOpts) {
    if (renderOpts === void 0) {
      renderOpts = DefaultRenderOptions;
    }
    var table = makeTable();
    $_esap7zl1jfeu9jvv.setAll(table, renderOpts.styles);
    $_gd427vksjfeu9ju9.setAll(table, renderOpts.attributes);
    var tbody = tableBody();
    $_68ujuxl3jfeu9jw9.append(table, tbody);
    var trs = [];
    for (var i = 0; i < rows; i++) {
      var tr = tableRow();
      for (var j = 0; j < columns; j++) {
        var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
        if (j < columnHeaders) {
          $_gd427vksjfeu9ju9.set(td, 'scope', 'row');
        }
        if (i < rowHeaders) {
          $_gd427vksjfeu9ju9.set(td, 'scope', 'col');
        }
        $_68ujuxl3jfeu9jw9.append(td, $_5csi13k7jfeu9jrb.fromTag('br'));
        if (renderOpts.percentages) {
          $_esap7zl1jfeu9jvv.set(td, 'width', 100 / columns + '%');
        }
        $_68ujuxl3jfeu9jw9.append(tr, td);
      }
      trs.push(tr);
    }
    $_fhqznl5jfeu9jwf.append(tbody, trs);
    return table;
  };

  var get$7 = function (element) {
    return element.dom().innerHTML;
  };
  var set$5 = function (element, content) {
    var owner = $_dzvm7xk9jfeu9jrm.owner(element);
    var docDom = owner.dom();
    var fragment = $_5csi13k7jfeu9jrb.fromDom(docDom.createDocumentFragment());
    var contentElements = $_8mwj6nlcjfeu9jxv.fromHtml(content, docDom);
    $_fhqznl5jfeu9jwf.append(fragment, contentElements);
    $_sg34gl4jfeu9jwb.empty(element);
    $_68ujuxl3jfeu9jw9.append(element, fragment);
  };
  var getOuter$2 = function (element) {
    var container = $_5csi13k7jfeu9jrb.fromTag('div');
    var clone = $_5csi13k7jfeu9jrb.fromDom(element.dom().cloneNode(true));
    $_68ujuxl3jfeu9jw9.append(container, clone);
    return get$7(container);
  };
  var $_3mr4hgnrjfeu9kiu = {
    get: get$7,
    set: set$5,
    getOuter: getOuter$2
  };

  var placeCaretInCell = function (editor, cell) {
    editor.selection.select(cell.dom(), true);
    editor.selection.collapse(true);
  };
  var selectFirstCellInTable = function (editor, tableElm) {
    $_e4f1b4kxjfeu9jv4.descendant(tableElm, 'td,th').each($_8b8jopjujfeu9jnn.curry(placeCaretInCell, editor));
  };
  var fireEvents = function (editor, table) {
    $_8soyqzjsjfeu9jnc.each($_dva6q3kujfeu9juo.descendants(table, 'tr'), function (row) {
      fireNewRow(editor, row.dom());
      $_8soyqzjsjfeu9jnc.each($_dva6q3kujfeu9juo.descendants(row, 'th,td'), function (cell) {
        fireNewCell(editor, cell.dom());
      });
    });
  };
  var isPercentage = function (width) {
    return $_91jv01k1jfeu9jpc.isString(width) && width.indexOf('%') !== -1;
  };
  var insert$1 = function (editor, columns, rows) {
    var defaultStyles = getDefaultStyles(editor);
    var options = {
      styles: defaultStyles,
      attributes: getDefaultAttributes(editor),
      percentages: isPercentage(defaultStyles.width) && !isPixelsForced(editor)
    };
    var table = render$1(rows, columns, 0, 0, options);
    $_gd427vksjfeu9ju9.set(table, 'data-mce-id', '__mce');
    var html = $_3mr4hgnrjfeu9kiu.getOuter(table);
    editor.insertContent(html);
    return $_e4f1b4kxjfeu9jv4.descendant($_ejkywknajfeu9ket.getBody(editor), 'table[data-mce-id="__mce"]').map(function (table) {
      if (isPixelsForced(editor)) {
        $_esap7zl1jfeu9jvv.set(table, 'width', $_esap7zl1jfeu9jvv.get(table, 'width'));
      }
      $_gd427vksjfeu9ju9.remove(table, 'data-mce-id');
      fireEvents(editor, table);
      selectFirstCellInTable(editor, table);
      return table.dom();
    }).getOr(null);
  };
  var $_c7e6qlnojfeu9khz = { insert: insert$1 };

  function styleTDTH(dom, elm, name, value) {
    if (elm.tagName === 'TD' || elm.tagName === 'TH') {
      dom.setStyle(elm, name, value);
    } else {
      if (elm.children) {
        for (var i = 0; i < elm.children.length; i++) {
          styleTDTH(dom, elm.children[i], name, value);
        }
      }
    }
  }
  var extractDataFromElement$2 = function (editor, tableElm) {
    var dom = editor.dom;
    var data = {
      width: dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width'),
      height: dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height'),
      cellspacing: dom.getStyle(tableElm, 'border-spacing') || dom.getAttrib(tableElm, 'cellspacing'),
      cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') || $_9rudyhnjjfeu9kh0.getTDTHOverallStyle(editor.dom, tableElm, 'padding'),
      border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') || $_9rudyhnjjfeu9kh0.getTDTHOverallStyle(editor.dom, tableElm, 'border'),
      borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
      caption: !!dom.select('caption', tableElm)[0],
      class: dom.getAttrib(tableElm, 'class')
    };
    global$2.each('left center right'.split(' '), function (name) {
      if (editor.formatter.matchNode(tableElm, 'align' + name)) {
        data.align = name;
      }
    });
    if (hasAdvancedTableTab(editor)) {
      global$2.extend(data, $_e33lhqnkjfeu9kh4.extractAdvancedStyles(dom, tableElm));
    }
    return data;
  };
  var applyDataToElement = function (editor, tableElm, data) {
    var dom = editor.dom;
    var attrs = {};
    var styles = {};
    attrs.class = data.class;
    styles.height = $_ejkywknajfeu9ket.addSizeSuffix(data.height);
    if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
      attrs.width = $_ejkywknajfeu9ket.removePxSuffix(data.width);
    } else {
      styles.width = $_ejkywknajfeu9ket.addSizeSuffix(data.width);
    }
    if (shouldStyleWithCss(editor)) {
      styles['border-width'] = $_ejkywknajfeu9ket.addSizeSuffix(data.border);
      styles['border-spacing'] = $_ejkywknajfeu9ket.addSizeSuffix(data.cellspacing);
      global$2.extend(attrs, {
        'data-mce-border-color': data.borderColor,
        'data-mce-cell-padding': data.cellpadding,
        'data-mce-border': data.border
      });
    } else {
      global$2.extend(attrs, {
        border: data.border,
        cellpadding: data.cellpadding,
        cellspacing: data.cellspacing
      });
    }
    if (shouldStyleWithCss(editor)) {
      if (tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': $_ejkywknajfeu9ket.addSizeSuffix(data.border),
            'border-color': data.borderColor,
            'padding': $_ejkywknajfeu9ket.addSizeSuffix(data.cellpadding)
          });
        }
      }
    }
    if (data.style) {
      global$2.extend(styles, dom.parseStyle(data.style));
    } else {
      styles = global$2.extend({}, dom.parseStyle(dom.getAttrib(tableElm, 'style')), styles);
    }
    attrs.style = dom.serializeStyle(styles);
    dom.setAttribs(tableElm, attrs);
  };
  var onSubmitTableForm = function (editor, tableElm, evt) {
    var dom = editor.dom;
    var captionElm;
    var data;
    $_e33lhqnkjfeu9kh4.updateStyleField(editor, evt);
    data = evt.control.rootControl.toJSON();
    if (data.class === false) {
      delete data.class;
    }
    editor.undoManager.transact(function () {
      if (!tableElm) {
        tableElm = $_c7e6qlnojfeu9khz.insert(editor, data.cols || 1, data.rows || 1);
      }
      applyDataToElement(editor, tableElm, data);
      captionElm = dom.select('caption', tableElm)[0];
      if (captionElm && !data.caption) {
        dom.remove(captionElm);
      }
      if (!captionElm && data.caption) {
        captionElm = dom.create('caption');
        captionElm.innerHTML = !global$3.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
        tableElm.insertBefore(captionElm, tableElm.firstChild);
      }
      $_9rudyhnjjfeu9kh0.unApplyAlign(editor, tableElm);
      if (data.align) {
        $_9rudyhnjjfeu9kh0.applyAlign(editor, tableElm, data.align);
      }
      editor.focus();
      editor.addVisual();
    });
  };
  var open$2 = function (editor, isProps) {
    var dom = editor.dom;
    var tableElm, colsCtrl, rowsCtrl, classListCtrl, data = {}, generalTableForm;
    if (isProps === true) {
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (tableElm) {
        data = extractDataFromElement$2(editor, tableElm);
      }
    } else {
      colsCtrl = {
        label: 'Cols',
        name: 'cols'
      };
      rowsCtrl = {
        label: 'Rows',
        name: 'rows'
      };
    }
    if (getTableClassList(editor).length > 0) {
      if (data.class) {
        data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
      }
      classListCtrl = {
        name: 'class',
        type: 'listbox',
        label: 'Class',
        values: $_e33lhqnkjfeu9kh4.buildListItems(getTableClassList(editor), function (item) {
          if (item.value) {
            item.textStyle = function () {
              return editor.formatter.getCssText({
                block: 'table',
                classes: [item.value]
              });
            };
          }
        })
      };
    }
    generalTableForm = {
      type: 'form',
      layout: 'flex',
      direction: 'column',
      labelGapCalc: 'children',
      padding: 0,
      items: [
        {
          type: 'form',
          labelGapCalc: false,
          padding: 0,
          layout: 'grid',
          columns: 2,
          defaults: {
            type: 'textbox',
            maxWidth: 50
          },
          items: hasAppearanceOptions(editor) ? [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            },
            {
              label: 'Cell spacing',
              name: 'cellspacing'
            },
            {
              label: 'Cell padding',
              name: 'cellpadding'
            },
            {
              label: 'Border',
              name: 'border'
            },
            {
              label: 'Caption',
              name: 'caption',
              type: 'checkbox'
            }
          ] : [
            colsCtrl,
            rowsCtrl,
            {
              label: 'Width',
              name: 'width',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            },
            {
              label: 'Height',
              name: 'height',
              onchange: $_8b8jopjujfeu9jnn.curry($_e33lhqnkjfeu9kh4.updateStyleField, editor)
            }
          ]
        },
        {
          label: 'Alignment',
          name: 'align',
          type: 'listbox',
          text: 'None',
          values: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        },
        classListCtrl
      ]
    };
    if (hasAdvancedTableTab(editor)) {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        bodyType: 'tabpanel',
        body: [
          {
            title: 'General',
            type: 'form',
            items: generalTableForm
          },
          $_e33lhqnkjfeu9kh4.createStyleForm(editor)
        ],
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitTableForm, editor, tableElm)
      });
    } else {
      editor.windowManager.open({
        title: 'Table properties',
        data: data,
        body: generalTableForm,
        onsubmit: $_8b8jopjujfeu9jnn.curry(onSubmitTableForm, editor, tableElm)
      });
    }
  };
  var $_3ld6eonmjfeu9kho = { open: open$2 };

  var each$3 = global$2.each;
  var registerCommands = function (editor, actions, cellSelection, selections, clipboardRows) {
    var isRoot = $_ejkywknajfeu9ket.getIsRoot(editor);
    var eraseTable = function () {
      var cell = $_5csi13k7jfeu9jrb.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
      var table = $_811muwk4jfeu9jq0.table(cell, isRoot);
      table.filter($_8b8jopjujfeu9jnn.not(isRoot)).each(function (table) {
        var cursor = $_5csi13k7jfeu9jrb.fromText('');
        $_68ujuxl3jfeu9jw9.after(table, cursor);
        $_sg34gl4jfeu9jwb.remove(table);
        var rng = editor.dom.createRng();
        rng.setStart(cursor.dom(), 0);
        rng.setEnd(cursor.dom(), 0);
        editor.selection.setRng(rng);
      });
    };
    var getSelectionStartCell = function () {
      return $_5csi13k7jfeu9jrb.fromDom(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
    };
    var getTableFromCell = function (cell) {
      return $_811muwk4jfeu9jq0.table(cell, isRoot);
    };
    var actOnSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      table.each(function (table) {
        var targets = $_5sslqzldjfeu9jxz.forMenu(selections, table, cell);
        execute(table, targets).each(function (rng) {
          editor.selection.setRng(rng);
          editor.focus();
          cellSelection.clear(table);
        });
      });
    };
    var copyRowSelection = function (execute) {
      var cell = getSelectionStartCell();
      var table = getTableFromCell(cell);
      return table.bind(function (table) {
        var doc = $_5csi13k7jfeu9jrb.fromDom(editor.getDoc());
        var targets = $_5sslqzldjfeu9jxz.forMenu(selections, table, cell);
        var generators = $_eqiwv2l6jfeu9jwk.cellOperations($_8b8jopjujfeu9jnn.noop, doc, Option.none());
        return $_19jq6vngjfeu9kgj.copyRows(table, targets, generators);
      });
    };
    var pasteOnSelection = function (execute) {
      clipboardRows.get().each(function (rows) {
        var clonedRows = $_8soyqzjsjfeu9jnc.map(rows, function (row) {
          return $_3hnsgql7jfeu9jxb.deep(row);
        });
        var cell = getSelectionStartCell();
        var table = getTableFromCell(cell);
        table.bind(function (table) {
          var doc = $_5csi13k7jfeu9jrb.fromDom(editor.getDoc());
          var generators = $_eqiwv2l6jfeu9jwk.paste(doc);
          var targets = $_5sslqzldjfeu9jxz.pasteRows(selections, table, cell, clonedRows, generators);
          execute(table, targets).each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
            cellSelection.clear(table);
          });
        });
      });
    };
    each$3({
      mceTableSplitCells: function () {
        actOnSelection(actions.unmergeCells);
      },
      mceTableMergeCells: function () {
        actOnSelection(actions.mergeCells);
      },
      mceTableInsertRowBefore: function () {
        actOnSelection(actions.insertRowsBefore);
      },
      mceTableInsertRowAfter: function () {
        actOnSelection(actions.insertRowsAfter);
      },
      mceTableInsertColBefore: function () {
        actOnSelection(actions.insertColumnsBefore);
      },
      mceTableInsertColAfter: function () {
        actOnSelection(actions.insertColumnsAfter);
      },
      mceTableDeleteCol: function () {
        actOnSelection(actions.deleteColumn);
      },
      mceTableDeleteRow: function () {
        actOnSelection(actions.deleteRow);
      },
      mceTableCutRow: function (grid) {
        clipboardRows.set(copyRowSelection());
        actOnSelection(actions.deleteRow);
      },
      mceTableCopyRow: function (grid) {
        clipboardRows.set(copyRowSelection());
      },
      mceTablePasteRowBefore: function (grid) {
        pasteOnSelection(actions.pasteRowsBefore);
      },
      mceTablePasteRowAfter: function (grid) {
        pasteOnSelection(actions.pasteRowsAfter);
      },
      mceTableDelete: eraseTable
    }, function (func, name) {
      editor.addCommand(name, func);
    });
    each$3({
      mceInsertTable: $_8b8jopjujfeu9jnn.curry($_3ld6eonmjfeu9kho.open, editor),
      mceTableProps: $_8b8jopjujfeu9jnn.curry($_3ld6eonmjfeu9kho.open, editor, true),
      mceTableRowProps: $_8b8jopjujfeu9jnn.curry($_2f4uqqnljfeu9khd.open, editor),
      mceTableCellProps: $_8b8jopjujfeu9jnn.curry($_4lgmbrnijfeu9kgp.open, editor)
    }, function (func, name) {
      editor.addCommand(name, function (ui, val) {
        func(val);
      });
    });
  };
  var $_4cxbiwnfjfeu9kfm = { registerCommands: registerCommands };

  var only$1 = function (element) {
    var parent = Option.from(element.dom().documentElement).map($_5csi13k7jfeu9jrb.fromDom).getOr(element);
    return {
      parent: $_8b8jopjujfeu9jnn.constant(parent),
      view: $_8b8jopjujfeu9jnn.constant(element),
      origin: $_8b8jopjujfeu9jnn.constant(r(0, 0))
    };
  };
  var detached = function (editable, chrome) {
    var origin = $_8b8jopjujfeu9jnn.curry($_7hhj6fm5jfeu9k5b.absolute, chrome);
    return {
      parent: $_8b8jopjujfeu9jnn.constant(chrome),
      view: $_8b8jopjujfeu9jnn.constant(editable),
      origin: origin
    };
  };
  var body$1 = function (editable, chrome) {
    return {
      parent: $_8b8jopjujfeu9jnn.constant(chrome),
      view: $_8b8jopjujfeu9jnn.constant(editable),
      origin: $_8b8jopjujfeu9jnn.constant(r(0, 0))
    };
  };
  var $_bnf4xqntjfeu9kjk = {
    only: only$1,
    detached: detached,
    body: body$1
  };

  function Event (fields) {
    var struct = $_6s7wfojxjfeu9joz.immutable.apply(null, fields);
    var handlers = [];
    var bind = function (handler) {
      if (handler === undefined) {
        throw 'Event bind error: undefined handler';
      }
      handlers.push(handler);
    };
    var unbind = function (handler) {
      handlers = $_8soyqzjsjfeu9jnc.filter(handlers, function (h) {
        return h !== handler;
      });
    };
    var trigger = function () {
      var event = struct.apply(null, arguments);
      $_8soyqzjsjfeu9jnc.each(handlers, function (handler) {
        handler(event);
      });
    };
    return {
      bind: bind,
      unbind: unbind,
      trigger: trigger
    };
  }

  var create = function (typeDefs) {
    var registry = $_1iiwlojwjfeu9jou.map(typeDefs, function (event) {
      return {
        bind: event.bind,
        unbind: event.unbind
      };
    });
    var trigger = $_1iiwlojwjfeu9jou.map(typeDefs, function (event) {
      return event.trigger;
    });
    return {
      registry: registry,
      trigger: trigger
    };
  };
  var $_g3qweinwjfeu9kkb = { create: create };

  var mode = $_1dhdbrmcjfeu9k6l.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
  ]);
  var sink = $_1dhdbrmcjfeu9k6l.exactly([
    'element',
    'start',
    'stop',
    'destroy'
  ]);
  var api$3 = $_1dhdbrmcjfeu9k6l.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
  ]);
  var $_g1c8wio0jfeu9klx = {
    mode: mode,
    sink: sink,
    api: api$3
  };

  var styles$1 = $_88jhs1msjfeu9kat.css('ephox-dragster');
  var $_1kinemo2jfeu9kmd = { resolve: styles$1.resolve };

  function Blocker (options) {
    var settings = $_fkb9qbmhjfeu9k87.merge({ 'layerClass': $_1kinemo2jfeu9kmd.resolve('blocker') }, options);
    var div = $_5csi13k7jfeu9jrb.fromTag('div');
    $_gd427vksjfeu9ju9.set(div, 'role', 'presentation');
    $_esap7zl1jfeu9jvv.setAll(div, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%'
    });
    $_d7p727mtjfeu9kav.add(div, $_1kinemo2jfeu9kmd.resolve('blocker'));
    $_d7p727mtjfeu9kav.add(div, settings.layerClass);
    var element = function () {
      return div;
    };
    var destroy = function () {
      $_sg34gl4jfeu9jwb.remove(div);
    };
    return {
      element: element,
      destroy: destroy
    };
  }

  var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
    return {
      'target': $_8b8jopjujfeu9jnn.constant(target),
      'x': $_8b8jopjujfeu9jnn.constant(x),
      'y': $_8b8jopjujfeu9jnn.constant(y),
      'stop': stop,
      'prevent': prevent,
      'kill': kill,
      'raw': $_8b8jopjujfeu9jnn.constant(raw)
    };
  };
  var handle = function (filter, handler) {
    return function (rawEvent) {
      if (!filter(rawEvent))
        return;
      var target = $_5csi13k7jfeu9jrb.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = $_8b8jopjujfeu9jnn.compose(prevent, stop);
      var evt = mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
      handler(evt);
    };
  };
  var binder = function (element, event, filter, handler, useCapture) {
    var wrapped = handle(filter, handler);
    element.dom().addEventListener(event, wrapped, useCapture);
    return { unbind: $_8b8jopjujfeu9jnn.curry(unbind, element, event, wrapped, useCapture) };
  };
  var bind$1 = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, false);
  };
  var capture = function (element, event, filter, handler) {
    return binder(element, event, filter, handler, true);
  };
  var unbind = function (element, event, handler, useCapture) {
    element.dom().removeEventListener(event, handler, useCapture);
  };
  var $_fgdy83o4jfeu9kml = {
    bind: bind$1,
    capture: capture
  };

  var filter$1 = $_8b8jopjujfeu9jnn.constant(true);
  var bind$2 = function (element, event, handler) {
    return $_fgdy83o4jfeu9kml.bind(element, event, filter$1, handler);
  };
  var capture$1 = function (element, event, handler) {
    return $_fgdy83o4jfeu9kml.capture(element, event, filter$1, handler);
  };
  var $_8fx81ao3jfeu9kmh = {
    bind: bind$2,
    capture: capture$1
  };

  var compare = function (old, nu) {
    return r(nu.left() - old.left(), nu.top() - old.top());
  };
  var extract$1 = function (event) {
    return Option.some(r(event.x(), event.y()));
  };
  var mutate$1 = function (mutation, info) {
    mutation.mutate(info.left(), info.top());
  };
  var sink$1 = function (dragApi, settings) {
    var blocker = Blocker(settings);
    var mdown = $_8fx81ao3jfeu9kmh.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = $_8fx81ao3jfeu9kmh.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = $_8fx81ao3jfeu9kmh.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = $_8fx81ao3jfeu9kmh.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
      blocker.destroy();
      mup.unbind();
      mmove.unbind();
      mout.unbind();
      mdown.unbind();
    };
    var start = function (parent) {
      $_68ujuxl3jfeu9jw9.append(parent, blocker.element());
    };
    var stop = function () {
      $_sg34gl4jfeu9jwb.remove(blocker.element());
    };
    return $_g1c8wio0jfeu9klx.sink({
      element: blocker.element,
      start: start,
      stop: stop,
      destroy: destroy
    });
  };
  var MouseDrag = $_g1c8wio0jfeu9klx.mode({
    compare: compare,
    extract: extract$1,
    sink: sink$1,
    mutate: mutate$1
  });

  function InDrag () {
    var previous = Option.none();
    var reset = function () {
      previous = Option.none();
    };
    var update = function (mode, nu) {
      var result = previous.map(function (old) {
        return mode.compare(old, nu);
      });
      previous = Option.some(nu);
      return result;
    };
    var onEvent = function (event, mode) {
      var dataOption = mode.extract(event);
      dataOption.each(function (data) {
        var offset = update(mode, data);
        offset.each(function (d) {
          events.trigger.move(d);
        });
      });
    };
    var events = $_g3qweinwjfeu9kkb.create({ move: Event(['info']) });
    return {
      onEvent: onEvent,
      reset: reset,
      events: events.registry
    };
  }

  function NoDrag (anchor) {
    var onEvent = function (event, mode) {
    };
    return {
      onEvent: onEvent,
      reset: $_8b8jopjujfeu9jnn.noop
    };
  }

  function Movement () {
    var noDragState = NoDrag();
    var inDragState = InDrag();
    var dragState = noDragState;
    var on = function () {
      dragState.reset();
      dragState = inDragState;
    };
    var off = function () {
      dragState.reset();
      dragState = noDragState;
    };
    var onEvent = function (event, mode) {
      dragState.onEvent(event, mode);
    };
    var isOn = function () {
      return dragState === inDragState;
    };
    return {
      on: on,
      off: off,
      isOn: isOn,
      onEvent: onEvent,
      events: inDragState.events
    };
  }

  var adaptable = function (fn, rate) {
    var timer = null;
    var args = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        args = null;
      }
    };
    var throttle = function () {
      args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var first$4 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer === null) {
        timer = setTimeout(function () {
          fn.apply(null, args);
          timer = null;
          args = null;
        }, rate);
      }
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var last$3 = function (fn, rate) {
    var timer = null;
    var cancel = function () {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
    var throttle = function () {
      var args = arguments;
      if (timer !== null)
        clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(null, args);
        timer = null;
        args = null;
      }, rate);
    };
    return {
      cancel: cancel,
      throttle: throttle
    };
  };
  var $_4ompsco9jfeu9kne = {
    adaptable: adaptable,
    first: first$4,
    last: last$3
  };

  var setup = function (mutation, mode, settings) {
    var active = false;
    var events = $_g3qweinwjfeu9kkb.create({
      start: Event([]),
      stop: Event([])
    });
    var movement = Movement();
    var drop = function () {
      sink.stop();
      if (movement.isOn()) {
        movement.off();
        events.trigger.stop();
      }
    };
    var throttledDrop = $_4ompsco9jfeu9kne.last(drop, 200);
    var go = function (parent) {
      sink.start(parent);
      movement.on();
      events.trigger.start();
    };
    var mousemove = function (event, ui) {
      throttledDrop.cancel();
      movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
      mode.mutate(mutation, event.info());
    });
    var on = function () {
      active = true;
    };
    var off = function () {
      active = false;
    };
    var runIfActive = function (f) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (active) {
          return f.apply(null, args);
        }
      };
    };
    var sink = mode.sink($_g1c8wio0jfeu9klx.api({
      forceDrop: drop,
      drop: runIfActive(drop),
      move: runIfActive(mousemove),
      delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
      sink.destroy();
    };
    return {
      element: sink.element,
      go: go,
      on: on,
      off: off,
      destroy: destroy,
      events: events.registry
    };
  };
  var $_7tr0ewo5jfeu9kmq = { setup: setup };

  var transform$1 = function (mutation, options) {
    var settings = options !== undefined ? options : {};
    var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
    return $_7tr0ewo5jfeu9kmq.setup(mutation, mode, options);
  };
  var $_afw6m3nyjfeu9kl9 = { transform: transform$1 };

  function Mutation () {
    var events = $_g3qweinwjfeu9kkb.create({
      'drag': Event([
        'xDelta',
        'yDelta'
      ])
    });
    var mutate = function (x, y) {
      events.trigger.drag(x, y);
    };
    return {
      mutate: mutate,
      events: events.registry
    };
  }

  function BarMutation () {
    var events = $_g3qweinwjfeu9kkb.create({
      drag: Event([
        'xDelta',
        'yDelta',
        'target'
      ])
    });
    var target = Option.none();
    var delegate = Mutation();
    delegate.events.drag.bind(function (event) {
      target.each(function (t) {
        events.trigger.drag(event.xDelta(), event.yDelta(), t);
      });
    });
    var assign = function (t) {
      target = Option.some(t);
    };
    var get = function () {
      return target;
    };
    return {
      assign: assign,
      get: get,
      mutate: delegate.mutate,
      events: events.registry
    };
  }

  var any = function (selector) {
    return $_e4f1b4kxjfeu9jv4.first(selector).isSome();
  };
  var ancestor$2 = function (scope, selector, isRoot) {
    return $_e4f1b4kxjfeu9jv4.ancestor(scope, selector, isRoot).isSome();
  };
  var sibling$2 = function (scope, selector) {
    return $_e4f1b4kxjfeu9jv4.sibling(scope, selector).isSome();
  };
  var child$3 = function (scope, selector) {
    return $_e4f1b4kxjfeu9jv4.child(scope, selector).isSome();
  };
  var descendant$2 = function (scope, selector) {
    return $_e4f1b4kxjfeu9jv4.descendant(scope, selector).isSome();
  };
  var closest$2 = function (scope, selector, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(scope, selector, isRoot).isSome();
  };
  var $_c6zthvocjfeu9knu = {
    any: any,
    ancestor: ancestor$2,
    sibling: sibling$2,
    child: child$3,
    descendant: descendant$2,
    closest: closest$2
  };

  var resizeBarDragging = $_g8yu1imrjfeu9kap.resolve('resizer-bar-dragging');
  function BarManager (wire, direction, hdirection) {
    var mutation = BarMutation();
    var resizing = $_afw6m3nyjfeu9kl9.transform(mutation, {});
    var hoverTable = Option.none();
    var getResizer = function (element, type) {
      return Option.from($_gd427vksjfeu9ju9.get(element, type));
    };
    mutation.events.drag.bind(function (event) {
      getResizer(event.target(), 'data-row').each(function (_dataRow) {
        var currentRow = $_b8n52bn7jfeu9kdx.getInt(event.target(), 'top');
        $_esap7zl1jfeu9jvv.set(event.target(), 'top', currentRow + event.yDelta() + 'px');
      });
      getResizer(event.target(), 'data-column').each(function (_dataCol) {
        var currentCol = $_b8n52bn7jfeu9kdx.getInt(event.target(), 'left');
        $_esap7zl1jfeu9jvv.set(event.target(), 'left', currentCol + event.xDelta() + 'px');
      });
    });
    var getDelta = function (target, direction) {
      var newX = $_b8n52bn7jfeu9kdx.getInt(target, direction);
      var oldX = parseInt($_gd427vksjfeu9ju9.get(target, 'data-initial-' + direction), 10);
      return newX - oldX;
    };
    resizing.events.stop.bind(function () {
      mutation.get().each(function (target) {
        hoverTable.each(function (table) {
          getResizer(target, 'data-row').each(function (row) {
            var delta = getDelta(target, 'top');
            $_gd427vksjfeu9ju9.remove(target, 'data-initial-top');
            events.trigger.adjustHeight(table, delta, parseInt(row, 10));
          });
          getResizer(target, 'data-column').each(function (column) {
            var delta = getDelta(target, 'left');
            $_gd427vksjfeu9ju9.remove(target, 'data-initial-left');
            events.trigger.adjustWidth(table, delta, parseInt(column, 10));
          });
          $_7wuh8xmnjfeu9k9d.refresh(wire, table, hdirection, direction);
        });
      });
    });
    var handler = function (target, direction) {
      events.trigger.startAdjust();
      mutation.assign(target);
      $_gd427vksjfeu9ju9.set(target, 'data-initial-' + direction, parseInt($_esap7zl1jfeu9jvv.get(target, direction), 10));
      $_d7p727mtjfeu9kav.add(target, resizeBarDragging);
      $_esap7zl1jfeu9jvv.set(target, 'opacity', '0.2');
      resizing.go(wire.parent());
    };
    var mousedown = $_8fx81ao3jfeu9kmh.bind(wire.parent(), 'mousedown', function (event) {
      if ($_7wuh8xmnjfeu9k9d.isRowBar(event.target()))
        handler(event.target(), 'top');
      if ($_7wuh8xmnjfeu9k9d.isColBar(event.target()))
        handler(event.target(), 'left');
    });
    var isRoot = function (e) {
      return $_adlyqikbjfeu9js6.eq(e, wire.view());
    };
    var mouseover = $_8fx81ao3jfeu9kmh.bind(wire.view(), 'mouseover', function (event) {
      if ($_prkbektjfeu9juk.name(event.target()) === 'table' || $_c6zthvocjfeu9knu.closest(event.target(), 'table', isRoot)) {
        hoverTable = $_prkbektjfeu9juk.name(event.target()) === 'table' ? Option.some(event.target()) : $_e4f1b4kxjfeu9jv4.ancestor(event.target(), 'table', isRoot);
        hoverTable.each(function (ht) {
          $_7wuh8xmnjfeu9k9d.refresh(wire, ht, hdirection, direction);
        });
      } else if ($_6mhhmqkwjfeu9juu.inBody(event.target())) {
        $_7wuh8xmnjfeu9k9d.destroy(wire);
      }
    });
    var destroy = function () {
      mousedown.unbind();
      mouseover.unbind();
      resizing.destroy();
      $_7wuh8xmnjfeu9k9d.destroy(wire);
    };
    var refresh = function (tbl) {
      $_7wuh8xmnjfeu9k9d.refresh(wire, tbl, hdirection, direction);
    };
    var events = $_g3qweinwjfeu9kkb.create({
      adjustHeight: Event([
        'table',
        'delta',
        'row'
      ]),
      adjustWidth: Event([
        'table',
        'delta',
        'column'
      ]),
      startAdjust: Event([])
    });
    return {
      destroy: destroy,
      refresh: refresh,
      on: resizing.on,
      off: resizing.off,
      hideBars: $_8b8jopjujfeu9jnn.curry($_7wuh8xmnjfeu9k9d.hide, wire),
      showBars: $_8b8jopjujfeu9jnn.curry($_7wuh8xmnjfeu9k9d.show, wire),
      events: events.registry
    };
  }

  function TableResize (wire, vdirection) {
    var hdirection = $_edppk0m4jfeu9k4t.height;
    var manager = BarManager(wire, vdirection, hdirection);
    var events = $_g3qweinwjfeu9kkb.create({
      beforeResize: Event(['table']),
      afterResize: Event(['table']),
      startDrag: Event([])
    });
    manager.events.adjustHeight.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = hdirection.delta(event.delta(), event.table());
      $_6grssqn3jfeu9kd0.adjustHeight(event.table(), delta, event.row(), hdirection);
      events.trigger.afterResize(event.table());
    });
    manager.events.startAdjust.bind(function (event) {
      events.trigger.startDrag();
    });
    manager.events.adjustWidth.bind(function (event) {
      events.trigger.beforeResize(event.table());
      var delta = vdirection.delta(event.delta(), event.table());
      $_6grssqn3jfeu9kd0.adjustWidth(event.table(), delta, event.column(), vdirection);
      events.trigger.afterResize(event.table());
    });
    return {
      on: manager.on,
      off: manager.off,
      hideBars: manager.hideBars,
      showBars: manager.showBars,
      destroy: manager.destroy,
      events: events.registry
    };
  }

  var createContainer = function () {
    var container = $_5csi13k7jfeu9jrb.fromTag('div');
    $_esap7zl1jfeu9jvv.setAll(container, {
      position: 'static',
      height: '0',
      width: '0',
      padding: '0',
      margin: '0',
      border: '0'
    });
    $_68ujuxl3jfeu9jw9.append($_6mhhmqkwjfeu9juu.body(), container);
    return container;
  };
  var get$8 = function (editor, container) {
    return editor.inline ? $_bnf4xqntjfeu9kjk.body($_ejkywknajfeu9ket.getBody(editor), createContainer()) : $_bnf4xqntjfeu9kjk.only($_5csi13k7jfeu9jrb.fromDom(editor.getDoc()));
  };
  var remove$6 = function (editor, wire) {
    if (editor.inline) {
      $_sg34gl4jfeu9jwb.remove(wire.parent());
    }
  };
  var $_4jrmhtodjfeu9knw = {
    get: get$8,
    remove: remove$6
  };

  var ResizeHandler = function (editor) {
    var selectionRng = Option.none();
    var resize = Option.none();
    var wire = Option.none();
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var startW, startRawW;
    var isTable = function (elm) {
      return elm.nodeName === 'TABLE';
    };
    var getRawWidth = function (elm) {
      return editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
    };
    var lazyResize = function () {
      return resize;
    };
    var lazyWire = function () {
      return wire.getOr($_bnf4xqntjfeu9kjk.only($_5csi13k7jfeu9jrb.fromDom(editor.getBody())));
    };
    var destroy = function () {
      resize.each(function (sz) {
        sz.destroy();
      });
      wire.each(function (w) {
        $_4jrmhtodjfeu9knw.remove(editor, w);
      });
    };
    editor.on('init', function () {
      var direction = TableDirection($_3ta6w6nbjfeu9kf0.directionAt);
      var rawWire = $_4jrmhtodjfeu9knw.get(editor);
      wire = Option.some(rawWire);
      if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
        var sz = TableResize(rawWire, direction);
        sz.on();
        sz.events.startDrag.bind(function (event) {
          selectionRng = Option.some(editor.selection.getRng());
        });
        sz.events.afterResize.bind(function (event) {
          var table = event.table();
          var dataStyleCells = $_dva6q3kujfeu9juo.descendants(table, 'td[data-mce-style],th[data-mce-style]');
          $_8soyqzjsjfeu9jnc.each(dataStyleCells, function (cell) {
            $_gd427vksjfeu9ju9.remove(cell, 'data-mce-style');
          });
          selectionRng.each(function (rng) {
            editor.selection.setRng(rng);
            editor.focus();
          });
          editor.undoManager.add();
        });
        resize = Option.some(sz);
      }
    });
    editor.on('ObjectResizeStart', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        startW = e.width;
        startRawW = getRawWidth(targetElm);
      }
    });
    editor.on('ObjectResized', function (e) {
      var targetElm = e.target;
      if (isTable(targetElm)) {
        var table = targetElm;
        if (percentageBasedSizeRegex.test(startRawW)) {
          var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
          var targetPercentW = e.width * percentW / startW;
          editor.dom.setStyle(table, 'width', targetPercentW + '%');
        } else {
          var newCellSizes_1 = [];
          global$2.each(table.rows, function (row) {
            global$2.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes_1.push({
                cell: cell,
                width: width
              });
            });
          });
          global$2.each(newCellSizes_1, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      }
    });
    return {
      lazyResize: lazyResize,
      lazyWire: lazyWire,
      destroy: destroy
    };
  };

  var none$2 = function (current) {
    return folder$1(function (n, f, m, l) {
      return n(current);
    });
  };
  var first$5 = function (current) {
    return folder$1(function (n, f, m, l) {
      return f(current);
    });
  };
  var middle$1 = function (current, target) {
    return folder$1(function (n, f, m, l) {
      return m(current, target);
    });
  };
  var last$4 = function (current) {
    return folder$1(function (n, f, m, l) {
      return l(current);
    });
  };
  var folder$1 = function (fold) {
    return { fold: fold };
  };
  var $_dk60d5ogjfeu9kp3 = {
    none: none$2,
    first: first$5,
    middle: middle$1,
    last: last$4
  };

  var detect$4 = function (current, isRoot) {
    return $_811muwk4jfeu9jq0.table(current, isRoot).bind(function (table) {
      var all = $_811muwk4jfeu9jq0.cells(table);
      var index = $_8soyqzjsjfeu9jnc.findIndex(all, function (x) {
        return $_adlyqikbjfeu9js6.eq(current, x);
      });
      return index.map(function (ind) {
        return {
          index: $_8b8jopjujfeu9jnn.constant(ind),
          all: $_8b8jopjujfeu9jnn.constant(all)
        };
      });
    });
  };
  var next = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_dk60d5ogjfeu9kp3.none(current);
    }, function (info) {
      return info.index() + 1 < info.all().length ? $_dk60d5ogjfeu9kp3.middle(current, info.all()[info.index() + 1]) : $_dk60d5ogjfeu9kp3.last(current);
    });
  };
  var prev = function (current, isRoot) {
    var detection = detect$4(current, isRoot);
    return detection.fold(function () {
      return $_dk60d5ogjfeu9kp3.none();
    }, function (info) {
      return info.index() - 1 >= 0 ? $_dk60d5ogjfeu9kp3.middle(current, info.all()[info.index() - 1]) : $_dk60d5ogjfeu9kp3.first(current);
    });
  };
  var $_ae87ybofjfeu9kov = {
    next: next,
    prev: prev
  };

  var adt = $_8miy51lujfeu9k2p.generate([
    { 'before': ['element'] },
    {
      'on': [
        'element',
        'offset'
      ]
    },
    { after: ['element'] }
  ]);
  var cata$1 = function (subject, onBefore, onOn, onAfter) {
    return subject.fold(onBefore, onOn, onAfter);
  };
  var getStart = function (situ) {
    return situ.fold($_8b8jopjujfeu9jnn.identity, $_8b8jopjujfeu9jnn.identity, $_8b8jopjujfeu9jnn.identity);
  };
  var $_86vrrvoijfeu9kpb = {
    before: adt.before,
    on: adt.on,
    after: adt.after,
    cata: cata$1,
    getStart: getStart
  };

  var type$2 = $_8miy51lujfeu9k2p.generate([
    { domRange: ['rng'] },
    {
      relative: [
        'startSitu',
        'finishSitu'
      ]
    },
    {
      exact: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var range$2 = $_6s7wfojxjfeu9joz.immutable('start', 'soffset', 'finish', 'foffset');
  var exactFromRange = function (simRange) {
    return type$2.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
  };
  var getStart$1 = function (selection) {
    return selection.match({
      domRange: function (rng) {
        return $_5csi13k7jfeu9jrb.fromDom(rng.startContainer);
      },
      relative: function (startSitu, finishSitu) {
        return $_86vrrvoijfeu9kpb.getStart(startSitu);
      },
      exact: function (start, soffset, finish, foffset) {
        return start;
      }
    });
  };
  var getWin = function (selection) {
    var start = getStart$1(selection);
    return $_dzvm7xk9jfeu9jrm.defaultView(start);
  };
  var $_6f0j2fohjfeu9kp5 = {
    domRange: type$2.domRange,
    relative: type$2.relative,
    exact: type$2.exact,
    exactFromRange: exactFromRange,
    range: range$2,
    getWin: getWin
  };

  var makeRange = function (start, soffset, finish, foffset) {
    var doc = $_dzvm7xk9jfeu9jrm.owner(start);
    var rng = doc.dom().createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var commonAncestorContainer = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    return $_5csi13k7jfeu9jrb.fromDom(r.commonAncestorContainer);
  };
  var after$2 = function (start, soffset, finish, foffset) {
    var r = makeRange(start, soffset, finish, foffset);
    var same = $_adlyqikbjfeu9js6.eq(start, finish) && soffset === foffset;
    return r.collapsed && !same;
  };
  var $_8a80c0okjfeu9kpo = {
    after: after$2,
    commonAncestorContainer: commonAncestorContainer
  };

  var fromElements = function (elements, scope) {
    var doc = scope || document;
    var fragment = doc.createDocumentFragment();
    $_8soyqzjsjfeu9jnc.each(elements, function (element) {
      fragment.appendChild(element.dom());
    });
    return $_5csi13k7jfeu9jrb.fromDom(fragment);
  };
  var $_9w3ixcoljfeu9kpr = { fromElements: fromElements };

  var selectNodeContents = function (win, element) {
    var rng = win.document.createRange();
    selectNodeContentsUsing(rng, element);
    return rng;
  };
  var selectNodeContentsUsing = function (rng, element) {
    rng.selectNodeContents(element.dom());
  };
  var isWithin$1 = function (outerRange, innerRange) {
    return innerRange.compareBoundaryPoints(outerRange.END_TO_START, outerRange) < 1 && innerRange.compareBoundaryPoints(outerRange.START_TO_END, outerRange) > -1;
  };
  var create$1 = function (win) {
    return win.document.createRange();
  };
  var setStart = function (rng, situ) {
    situ.fold(function (e) {
      rng.setStartBefore(e.dom());
    }, function (e, o) {
      rng.setStart(e.dom(), o);
    }, function (e) {
      rng.setStartAfter(e.dom());
    });
  };
  var setFinish = function (rng, situ) {
    situ.fold(function (e) {
      rng.setEndBefore(e.dom());
    }, function (e, o) {
      rng.setEnd(e.dom(), o);
    }, function (e) {
      rng.setEndAfter(e.dom());
    });
  };
  var replaceWith = function (rng, fragment) {
    deleteContents(rng);
    rng.insertNode(fragment.dom());
  };
  var relativeToNative = function (win, startSitu, finishSitu) {
    var range = win.document.createRange();
    setStart(range, startSitu);
    setFinish(range, finishSitu);
    return range;
  };
  var exactToNative = function (win, start, soffset, finish, foffset) {
    var rng = win.document.createRange();
    rng.setStart(start.dom(), soffset);
    rng.setEnd(finish.dom(), foffset);
    return rng;
  };
  var deleteContents = function (rng) {
    rng.deleteContents();
  };
  var cloneFragment = function (rng) {
    var fragment = rng.cloneContents();
    return $_5csi13k7jfeu9jrb.fromDom(fragment);
  };
  var toRect = function (rect) {
    return {
      left: $_8b8jopjujfeu9jnn.constant(rect.left),
      top: $_8b8jopjujfeu9jnn.constant(rect.top),
      right: $_8b8jopjujfeu9jnn.constant(rect.right),
      bottom: $_8b8jopjujfeu9jnn.constant(rect.bottom),
      width: $_8b8jopjujfeu9jnn.constant(rect.width),
      height: $_8b8jopjujfeu9jnn.constant(rect.height)
    };
  };
  var getFirstRect = function (rng) {
    var rects = rng.getClientRects();
    var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var getBounds$1 = function (rng) {
    var rect = rng.getBoundingClientRect();
    return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
  };
  var toString = function (rng) {
    return rng.toString();
  };
  var $_7uhophomjfeu9kpw = {
    create: create$1,
    replaceWith: replaceWith,
    selectNodeContents: selectNodeContents,
    selectNodeContentsUsing: selectNodeContentsUsing,
    relativeToNative: relativeToNative,
    exactToNative: exactToNative,
    deleteContents: deleteContents,
    cloneFragment: cloneFragment,
    getFirstRect: getFirstRect,
    getBounds: getBounds$1,
    isWithin: isWithin$1,
    toString: toString
  };

  var adt$1 = $_8miy51lujfeu9k2p.generate([
    {
      ltr: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    },
    {
      rtl: [
        'start',
        'soffset',
        'finish',
        'foffset'
      ]
    }
  ]);
  var fromRange = function (win, type, range) {
    return type($_5csi13k7jfeu9jrb.fromDom(range.startContainer), range.startOffset, $_5csi13k7jfeu9jrb.fromDom(range.endContainer), range.endOffset);
  };
  var getRanges = function (win, selection) {
    return selection.match({
      domRange: function (rng) {
        return {
          ltr: $_8b8jopjujfeu9jnn.constant(rng),
          rtl: Option.none
        };
      },
      relative: function (startSitu, finishSitu) {
        return {
          ltr: $_a38w16khjfeu9jsy.cached(function () {
            return $_7uhophomjfeu9kpw.relativeToNative(win, startSitu, finishSitu);
          }),
          rtl: $_a38w16khjfeu9jsy.cached(function () {
            return Option.some($_7uhophomjfeu9kpw.relativeToNative(win, finishSitu, startSitu));
          })
        };
      },
      exact: function (start, soffset, finish, foffset) {
        return {
          ltr: $_a38w16khjfeu9jsy.cached(function () {
            return $_7uhophomjfeu9kpw.exactToNative(win, start, soffset, finish, foffset);
          }),
          rtl: $_a38w16khjfeu9jsy.cached(function () {
            return Option.some($_7uhophomjfeu9kpw.exactToNative(win, finish, foffset, start, soffset));
          })
        };
      }
    });
  };
  var doDiagnose = function (win, ranges) {
    var rng = ranges.ltr();
    if (rng.collapsed) {
      var reversed = ranges.rtl().filter(function (rev) {
        return rev.collapsed === false;
      });
      return reversed.map(function (rev) {
        return adt$1.rtl($_5csi13k7jfeu9jrb.fromDom(rev.endContainer), rev.endOffset, $_5csi13k7jfeu9jrb.fromDom(rev.startContainer), rev.startOffset);
      }).getOrThunk(function () {
        return fromRange(win, adt$1.ltr, rng);
      });
    } else {
      return fromRange(win, adt$1.ltr, rng);
    }
  };
  var diagnose = function (win, selection) {
    var ranges = getRanges(win, selection);
    return doDiagnose(win, ranges);
  };
  var asLtrRange = function (win, selection) {
    var diagnosis = diagnose(win, selection);
    return diagnosis.match({
      ltr: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(start.dom(), soffset);
        rng.setEnd(finish.dom(), foffset);
        return rng;
      },
      rtl: function (start, soffset, finish, foffset) {
        var rng = win.document.createRange();
        rng.setStart(finish.dom(), foffset);
        rng.setEnd(start.dom(), soffset);
        return rng;
      }
    });
  };
  var $_b7updqonjfeu9kq4 = {
    ltr: adt$1.ltr,
    rtl: adt$1.rtl,
    diagnose: diagnose,
    asLtrRange: asLtrRange
  };

  var searchForPoint = function (rectForOffset, x, y, maxX, length) {
    if (length === 0)
      return 0;
    else if (x === maxX)
      return length - 1;
    var xDelta = maxX;
    for (var i = 1; i < length; i++) {
      var rect = rectForOffset(i);
      var curDeltaX = Math.abs(x - rect.left);
      if (y > rect.bottom) {
      } else if (y < rect.top || curDeltaX > xDelta) {
        return i - 1;
      } else {
        xDelta = curDeltaX;
      }
    }
    return 0;
  };
  var inRect = function (rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };
  var $_921yawoqjfeu9kqu = {
    inRect: inRect,
    searchForPoint: searchForPoint
  };

  var locateOffset = function (doc, textnode, x, y, rect) {
    var rangeForOffset = function (offset) {
      var r = doc.dom().createRange();
      r.setStart(textnode.dom(), offset);
      r.collapse(true);
      return r;
    };
    var rectForOffset = function (offset) {
      var r = rangeForOffset(offset);
      return r.getBoundingClientRect();
    };
    var length = $_allfqrlajfeu9jxn.get(textnode).length;
    var offset = $_921yawoqjfeu9kqu.searchForPoint(rectForOffset, x, y, rect.right, length);
    return rangeForOffset(offset);
  };
  var locate = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rects = r.getClientRects();
    var foundRect = $_dxo57pmijfeu9k8a.findMap(rects, function (rect) {
      return $_921yawoqjfeu9kqu.inRect(rect, x, y) ? Option.some(rect) : Option.none();
    });
    return foundRect.map(function (rect) {
      return locateOffset(doc, node, x, y, rect);
    });
  };
  var $_1x3hpuorjfeu9kqx = { locate: locate };

  var searchInChildren = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    var nodes = $_dzvm7xk9jfeu9jrm.children(node);
    return $_dxo57pmijfeu9k8a.findMap(nodes, function (n) {
      r.selectNode(n.dom());
      return $_921yawoqjfeu9kqu.inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
    });
  };
  var locateNode = function (doc, node, x, y) {
    var locator = $_prkbektjfeu9juk.isText(node) ? $_1x3hpuorjfeu9kqx.locate : searchInChildren;
    return locator(doc, node, x, y);
  };
  var locate$1 = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return locateNode(doc, node, boundedX, boundedY);
  };
  var $_fjhf3vopjfeu9kqk = { locate: locate$1 };

  var COLLAPSE_TO_LEFT = true;
  var COLLAPSE_TO_RIGHT = false;
  var getCollapseDirection = function (rect, x) {
    return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
  };
  var createCollapsedNode = function (doc, target, collapseDirection) {
    var r = doc.dom().createRange();
    r.selectNode(target.dom());
    r.collapse(collapseDirection);
    return r;
  };
  var locateInElement = function (doc, node, x) {
    var cursorRange = doc.dom().createRange();
    cursorRange.selectNode(node.dom());
    var rect = cursorRange.getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    var f = collapseDirection === COLLAPSE_TO_LEFT ? $_7ig6trl8jfeu9jxe.first : $_7ig6trl8jfeu9jxe.last;
    return f(node).map(function (target) {
      return createCollapsedNode(doc, target, collapseDirection);
    });
  };
  var locateInEmpty = function (doc, node, x) {
    var rect = node.dom().getBoundingClientRect();
    var collapseDirection = getCollapseDirection(rect, x);
    return Option.some(createCollapsedNode(doc, node, collapseDirection));
  };
  var search = function (doc, node, x) {
    var f = $_dzvm7xk9jfeu9jrm.children(node).length === 0 ? locateInEmpty : locateInElement;
    return f(doc, node, x);
  };
  var $_3lc74josjfeu9kr3 = { search: search };

  var caretPositionFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
      if (pos.offsetNode === null)
        return Option.none();
      var r = doc.dom().createRange();
      r.setStart(pos.offsetNode, pos.offset);
      r.collapse();
      return Option.some(r);
    });
  };
  var caretRangeFromPoint = function (doc, x, y) {
    return Option.from(doc.dom().caretRangeFromPoint(x, y));
  };
  var searchTextNodes = function (doc, node, x, y) {
    var r = doc.dom().createRange();
    r.selectNode(node.dom());
    var rect = r.getBoundingClientRect();
    var boundedX = Math.max(rect.left, Math.min(rect.right, x));
    var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
    return $_fjhf3vopjfeu9kqk.locate(doc, node, boundedX, boundedY);
  };
  var searchFromPoint = function (doc, x, y) {
    return $_5csi13k7jfeu9jrb.fromPoint(doc, x, y).bind(function (elem) {
      var fallback = function () {
        return $_3lc74josjfeu9kr3.search(doc, elem, x);
      };
      return $_dzvm7xk9jfeu9jrm.children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
    });
  };
  var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
  var fromPoint$1 = function (win, x, y) {
    var doc = $_5csi13k7jfeu9jrb.fromDom(win.document);
    return availableSearch(doc, x, y).map(function (rng) {
      return $_6f0j2fohjfeu9kp5.range($_5csi13k7jfeu9jrb.fromDom(rng.startContainer), rng.startOffset, $_5csi13k7jfeu9jrb.fromDom(rng.endContainer), rng.endOffset);
    });
  };
  var $_g9mshfoojfeu9kqf = { fromPoint: fromPoint$1 };

  var withinContainer = function (win, ancestor, outerRange, selector) {
    var innerRange = $_7uhophomjfeu9kpw.create(win);
    var self = $_ddcrggk6jfeu9jr0.is(ancestor, selector) ? [ancestor] : [];
    var elements = self.concat($_dva6q3kujfeu9juo.descendants(ancestor, selector));
    return $_8soyqzjsjfeu9jnc.filter(elements, function (elem) {
      $_7uhophomjfeu9kpw.selectNodeContentsUsing(innerRange, elem);
      return $_7uhophomjfeu9kpw.isWithin(outerRange, innerRange);
    });
  };
  var find$3 = function (win, selection, selector) {
    var outerRange = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    var ancestor = $_5csi13k7jfeu9jrb.fromDom(outerRange.commonAncestorContainer);
    return $_prkbektjfeu9juk.isElement(ancestor) ? withinContainer(win, ancestor, outerRange, selector) : [];
  };
  var $_62e5w2otjfeu9kr7 = { find: find$3 };

  var beforeSpecial = function (element, offset) {
    var name = $_prkbektjfeu9juk.name(element);
    if ('input' === name)
      return $_86vrrvoijfeu9kpb.after(element);
    else if (!$_8soyqzjsjfeu9jnc.contains([
        'br',
        'img'
      ], name))
      return $_86vrrvoijfeu9kpb.on(element, offset);
    else
      return offset === 0 ? $_86vrrvoijfeu9kpb.before(element) : $_86vrrvoijfeu9kpb.after(element);
  };
  var preprocessRelative = function (startSitu, finishSitu) {
    var start = startSitu.fold($_86vrrvoijfeu9kpb.before, beforeSpecial, $_86vrrvoijfeu9kpb.after);
    var finish = finishSitu.fold($_86vrrvoijfeu9kpb.before, beforeSpecial, $_86vrrvoijfeu9kpb.after);
    return $_6f0j2fohjfeu9kp5.relative(start, finish);
  };
  var preprocessExact = function (start, soffset, finish, foffset) {
    var startSitu = beforeSpecial(start, soffset);
    var finishSitu = beforeSpecial(finish, foffset);
    return $_6f0j2fohjfeu9kp5.relative(startSitu, finishSitu);
  };
  var preprocess = function (selection) {
    return selection.match({
      domRange: function (rng) {
        var start = $_5csi13k7jfeu9jrb.fromDom(rng.startContainer);
        var finish = $_5csi13k7jfeu9jrb.fromDom(rng.endContainer);
        return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
      },
      relative: preprocessRelative,
      exact: preprocessExact
    });
  };
  var $_fnc8stoujfeu9krd = {
    beforeSpecial: beforeSpecial,
    preprocess: preprocess,
    preprocessRelative: preprocessRelative,
    preprocessExact: preprocessExact
  };

  var doSetNativeRange = function (win, rng) {
    Option.from(win.getSelection()).each(function (selection) {
      selection.removeAllRanges();
      selection.addRange(rng);
    });
  };
  var doSetRange = function (win, start, soffset, finish, foffset) {
    var rng = $_7uhophomjfeu9kpw.exactToNative(win, start, soffset, finish, foffset);
    doSetNativeRange(win, rng);
  };
  var findWithin = function (win, selection, selector) {
    return $_62e5w2otjfeu9kr7.find(win, selection, selector);
  };
  var setRangeFromRelative = function (win, relative) {
    return $_b7updqonjfeu9kq4.diagnose(win, relative).match({
      ltr: function (start, soffset, finish, foffset) {
        doSetRange(win, start, soffset, finish, foffset);
      },
      rtl: function (start, soffset, finish, foffset) {
        var selection = win.getSelection();
        if (selection.setBaseAndExtent) {
          selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
        } else if (selection.extend) {
          selection.collapse(start.dom(), soffset);
          selection.extend(finish.dom(), foffset);
        } else {
          doSetRange(win, finish, foffset, start, soffset);
        }
      }
    });
  };
  var setExact = function (win, start, soffset, finish, foffset) {
    var relative = $_fnc8stoujfeu9krd.preprocessExact(start, soffset, finish, foffset);
    setRangeFromRelative(win, relative);
  };
  var setRelative = function (win, startSitu, finishSitu) {
    var relative = $_fnc8stoujfeu9krd.preprocessRelative(startSitu, finishSitu);
    setRangeFromRelative(win, relative);
  };
  var toNative = function (selection) {
    var win = $_6f0j2fohjfeu9kp5.getWin(selection).dom();
    var getDomRange = function (start, soffset, finish, foffset) {
      return $_7uhophomjfeu9kpw.exactToNative(win, start, soffset, finish, foffset);
    };
    var filtered = $_fnc8stoujfeu9krd.preprocess(selection);
    return $_b7updqonjfeu9kq4.diagnose(win, filtered).match({
      ltr: getDomRange,
      rtl: getDomRange
    });
  };
  var readRange = function (selection) {
    if (selection.rangeCount > 0) {
      var firstRng = selection.getRangeAt(0);
      var lastRng = selection.getRangeAt(selection.rangeCount - 1);
      return Option.some($_6f0j2fohjfeu9kp5.range($_5csi13k7jfeu9jrb.fromDom(firstRng.startContainer), firstRng.startOffset, $_5csi13k7jfeu9jrb.fromDom(lastRng.endContainer), lastRng.endOffset));
    } else {
      return Option.none();
    }
  };
  var doGetExact = function (selection) {
    var anchorNode = $_5csi13k7jfeu9jrb.fromDom(selection.anchorNode);
    var focusNode = $_5csi13k7jfeu9jrb.fromDom(selection.focusNode);
    return $_8a80c0okjfeu9kpo.after(anchorNode, selection.anchorOffset, focusNode, selection.focusOffset) ? Option.some($_6f0j2fohjfeu9kp5.range($_5csi13k7jfeu9jrb.fromDom(selection.anchorNode), selection.anchorOffset, $_5csi13k7jfeu9jrb.fromDom(selection.focusNode), selection.focusOffset)) : readRange(selection);
  };
  var setToElement = function (win, element) {
    var rng = $_7uhophomjfeu9kpw.selectNodeContents(win, element);
    doSetNativeRange(win, rng);
  };
  var forElement = function (win, element) {
    var rng = $_7uhophomjfeu9kpw.selectNodeContents(win, element);
    return $_6f0j2fohjfeu9kp5.range($_5csi13k7jfeu9jrb.fromDom(rng.startContainer), rng.startOffset, $_5csi13k7jfeu9jrb.fromDom(rng.endContainer), rng.endOffset);
  };
  var getExact = function (win) {
    var selection = win.getSelection();
    return selection.rangeCount > 0 ? doGetExact(selection) : Option.none();
  };
  var get$9 = function (win) {
    return getExact(win).map(function (range) {
      return $_6f0j2fohjfeu9kp5.exact(range.start(), range.soffset(), range.finish(), range.foffset());
    });
  };
  var getFirstRect$1 = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    return $_7uhophomjfeu9kpw.getFirstRect(rng);
  };
  var getBounds$2 = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    return $_7uhophomjfeu9kpw.getBounds(rng);
  };
  var getAtPoint = function (win, x, y) {
    return $_g9mshfoojfeu9kqf.fromPoint(win, x, y);
  };
  var getAsString = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    return $_7uhophomjfeu9kpw.toString(rng);
  };
  var clear$1 = function (win) {
    var selection = win.getSelection();
    selection.removeAllRanges();
  };
  var clone$2 = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    return $_7uhophomjfeu9kpw.cloneFragment(rng);
  };
  var replace$1 = function (win, selection, elements) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    var fragment = $_9w3ixcoljfeu9kpr.fromElements(elements, win.document);
    $_7uhophomjfeu9kpw.replaceWith(rng, fragment);
  };
  var deleteAt = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    $_7uhophomjfeu9kpw.deleteContents(rng);
  };
  var isCollapsed = function (start, soffset, finish, foffset) {
    return $_adlyqikbjfeu9js6.eq(start, finish) && soffset === foffset;
  };
  var $_af2bn6ojjfeu9kpi = {
    setExact: setExact,
    getExact: getExact,
    get: get$9,
    setRelative: setRelative,
    toNative: toNative,
    setToElement: setToElement,
    clear: clear$1,
    clone: clone$2,
    replace: replace$1,
    deleteAt: deleteAt,
    forElement: forElement,
    getFirstRect: getFirstRect$1,
    getBounds: getBounds$2,
    getAtPoint: getAtPoint,
    findWithin: findWithin,
    getAsString: getAsString,
    isCollapsed: isCollapsed
  };

  var global$4 = tinymce.util.Tools.resolve('tinymce.util.VK');

  var forward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_ae87ybofjfeu9kov.next(cell), lazyWire);
  };
  var backward = function (editor, isRoot, cell, lazyWire) {
    return go(editor, isRoot, $_ae87ybofjfeu9kov.prev(cell), lazyWire);
  };
  var getCellFirstCursorPosition = function (editor, cell) {
    var selection = $_6f0j2fohjfeu9kp5.exact(cell, 0, cell, 0);
    return $_af2bn6ojjfeu9kpi.toNative(selection);
  };
  var getNewRowCursorPosition = function (editor, table) {
    var rows = $_dva6q3kujfeu9juo.descendants(table, 'tr');
    return $_8soyqzjsjfeu9jnc.last(rows).bind(function (last) {
      return $_e4f1b4kxjfeu9jv4.descendant(last, 'td,th').map(function (first) {
        return getCellFirstCursorPosition(editor, first);
      });
    });
  };
  var go = function (editor, isRoot, cell, actions, lazyWire) {
    return cell.fold(Option.none, Option.none, function (current, next) {
      return $_7ig6trl8jfeu9jxe.first(next).map(function (cell) {
        return getCellFirstCursorPosition(editor, cell);
      });
    }, function (current) {
      return $_811muwk4jfeu9jq0.table(current, isRoot).bind(function (table) {
        var targets = $_5sslqzldjfeu9jxz.noMenu(current);
        editor.undoManager.transact(function () {
          actions.insertRowsAfter(table, targets);
        });
        return getNewRowCursorPosition(editor, table);
      });
    });
  };
  var rootElements = [
    'table',
    'li',
    'dl'
  ];
  var handle$1 = function (event, editor, actions, lazyWire) {
    if (event.keyCode === global$4.TAB) {
      var body_1 = $_ejkywknajfeu9ket.getBody(editor);
      var isRoot_1 = function (element) {
        var name = $_prkbektjfeu9juk.name(element);
        return $_adlyqikbjfeu9js6.eq(element, body_1) || $_8soyqzjsjfeu9jnc.contains(rootElements, name);
      };
      var rng = editor.selection.getRng();
      if (rng.collapsed) {
        var start = $_5csi13k7jfeu9jrb.fromDom(rng.startContainer);
        $_811muwk4jfeu9jq0.cell(start, isRoot_1).each(function (cell) {
          event.preventDefault();
          var navigation = event.shiftKey ? backward : forward;
          var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
          rng.each(function (range) {
            editor.selection.setRng(range);
          });
        });
      }
    }
  };
  var $_7v220koejfeu9ko7 = { handle: handle$1 };

  var response = $_6s7wfojxjfeu9joz.immutable('selection', 'kill');
  var $_exod7oyjfeu9ksm = { response: response };

  var isKey = function (key) {
    return function (keycode) {
      return keycode === key;
    };
  };
  var isUp = isKey(38);
  var isDown = isKey(40);
  var isNavigation = function (keycode) {
    return keycode >= 37 && keycode <= 40;
  };
  var $_d1j4jtozjfeu9ksr = {
    ltr: {
      isBackward: isKey(37),
      isForward: isKey(39)
    },
    rtl: {
      isBackward: isKey(39),
      isForward: isKey(37)
    },
    isUp: isUp,
    isDown: isDown,
    isNavigation: isNavigation
  };

  var convertToRange = function (win, selection) {
    var rng = $_b7updqonjfeu9kq4.asLtrRange(win, selection);
    return {
      start: $_8b8jopjujfeu9jnn.constant($_5csi13k7jfeu9jrb.fromDom(rng.startContainer)),
      soffset: $_8b8jopjujfeu9jnn.constant(rng.startOffset),
      finish: $_8b8jopjujfeu9jnn.constant($_5csi13k7jfeu9jrb.fromDom(rng.endContainer)),
      foffset: $_8b8jopjujfeu9jnn.constant(rng.endOffset)
    };
  };
  var makeSitus = function (start, soffset, finish, foffset) {
    return {
      start: $_8b8jopjujfeu9jnn.constant($_86vrrvoijfeu9kpb.on(start, soffset)),
      finish: $_8b8jopjujfeu9jnn.constant($_86vrrvoijfeu9kpb.on(finish, foffset))
    };
  };
  var $_e4zxhwp1jfeu9ktf = {
    convertToRange: convertToRange,
    makeSitus: makeSitus
  };

  var isSafari = $_d2ygmokgjfeu9jsv.detect().browser.isSafari();
  var get$10 = function (_doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
    var y = doc.body.scrollTop || doc.documentElement.scrollTop;
    return r(x, y);
  };
  var to = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollTo(x, y);
  };
  var by = function (x, y, _doc) {
    var doc = _doc !== undefined ? _doc.dom() : document;
    var win = doc.defaultView;
    win.scrollBy(x, y);
  };
  var setToElement$1 = function (win, element) {
    var pos = $_7hhj6fm5jfeu9k5b.absolute(element);
    var doc = $_5csi13k7jfeu9jrb.fromDom(win.document);
    to(pos.left(), pos.top(), doc);
  };
  var preserve$1 = function (doc, f) {
    var before = get$10(doc);
    f();
    var after = get$10(doc);
    if (before.top() !== after.top() || before.left() !== after.left()) {
      to(before.left(), before.top(), doc);
    }
  };
  var capture$2 = function (doc) {
    var previous = Option.none();
    var save = function () {
      previous = Option.some(get$10(doc));
    };
    var restore = function () {
      previous.each(function (p) {
        to(p.left(), p.top(), doc);
      });
    };
    save();
    return {
      save: save,
      restore: restore
    };
  };
  var intoView = function (element, alignToTop) {
    if (isSafari && $_91jv01k1jfeu9jpc.isFunction(element.dom().scrollIntoViewIfNeeded)) {
      element.dom().scrollIntoViewIfNeeded(false);
    } else {
      element.dom().scrollIntoView(alignToTop);
    }
  };
  var intoViewIfNeeded = function (element, container) {
    var containerBox = container.dom().getBoundingClientRect();
    var elementBox = element.dom().getBoundingClientRect();
    if (elementBox.top < containerBox.top) {
      intoView(element, true);
    } else if (elementBox.bottom > containerBox.bottom) {
      intoView(element, false);
    }
  };
  var scrollBarWidth = function () {
    var scrollDiv = $_5csi13k7jfeu9jrb.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
    $_68ujuxl3jfeu9jw9.after($_6mhhmqkwjfeu9juu.body(), scrollDiv);
    var w = scrollDiv.dom().offsetWidth - scrollDiv.dom().clientWidth;
    $_sg34gl4jfeu9jwb.remove(scrollDiv);
    return w;
  };
  var $_9p4vs3p2jfeu9ktq = {
    get: get$10,
    to: to,
    by: by,
    preserve: preserve$1,
    capture: capture$2,
    intoView: intoView,
    intoViewIfNeeded: intoViewIfNeeded,
    setToElement: setToElement$1,
    scrollBarWidth: scrollBarWidth
  };

  function WindowBridge (win) {
    var elementFromPoint = function (x, y) {
      return Option.from(win.document.elementFromPoint(x, y)).map($_5csi13k7jfeu9jrb.fromDom);
    };
    var getRect = function (element) {
      return element.dom().getBoundingClientRect();
    };
    var getRangedRect = function (start, soffset, finish, foffset) {
      var sel = $_6f0j2fohjfeu9kp5.exact(start, soffset, finish, foffset);
      return $_af2bn6ojjfeu9kpi.getFirstRect(win, sel).map(function (structRect) {
        return $_1iiwlojwjfeu9jou.map(structRect, $_8b8jopjujfeu9jnn.apply);
      });
    };
    var getSelection = function () {
      return $_af2bn6ojjfeu9kpi.get(win).map(function (exactAdt) {
        return $_e4zxhwp1jfeu9ktf.convertToRange(win, exactAdt);
      });
    };
    var fromSitus = function (situs) {
      var relative = $_6f0j2fohjfeu9kp5.relative(situs.start(), situs.finish());
      return $_e4zxhwp1jfeu9ktf.convertToRange(win, relative);
    };
    var situsFromPoint = function (x, y) {
      return $_af2bn6ojjfeu9kpi.getAtPoint(win, x, y).map(function (exact) {
        return {
          start: $_8b8jopjujfeu9jnn.constant($_86vrrvoijfeu9kpb.on(exact.start(), exact.soffset())),
          finish: $_8b8jopjujfeu9jnn.constant($_86vrrvoijfeu9kpb.on(exact.finish(), exact.foffset()))
        };
      });
    };
    var clearSelection = function () {
      $_af2bn6ojjfeu9kpi.clear(win);
    };
    var selectContents = function (element) {
      $_af2bn6ojjfeu9kpi.setToElement(win, element);
    };
    var setSelection = function (sel) {
      $_af2bn6ojjfeu9kpi.setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
    };
    var setRelativeSelection = function (start, finish) {
      $_af2bn6ojjfeu9kpi.setRelative(win, start, finish);
    };
    var getInnerHeight = function () {
      return win.innerHeight;
    };
    var getScrollY = function () {
      var pos = $_9p4vs3p2jfeu9ktq.get($_5csi13k7jfeu9jrb.fromDom(win.document));
      return pos.top();
    };
    var scrollBy = function (x, y) {
      $_9p4vs3p2jfeu9ktq.by(x, y, $_5csi13k7jfeu9jrb.fromDom(win.document));
    };
    return {
      elementFromPoint: elementFromPoint,
      getRect: getRect,
      getRangedRect: getRangedRect,
      getSelection: getSelection,
      fromSitus: fromSitus,
      situsFromPoint: situsFromPoint,
      clearSelection: clearSelection,
      setSelection: setSelection,
      setRelativeSelection: setRelativeSelection,
      selectContents: selectContents,
      getInnerHeight: getInnerHeight,
      getScrollY: getScrollY,
      scrollBy: scrollBy
    };
  }

  var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
    if (!($_adlyqikbjfeu9js6.eq(start, finish) && soffset === foffset)) {
      return $_e4f1b4kxjfeu9jv4.closest(start, 'td,th', isRoot).bind(function (s) {
        return $_e4f1b4kxjfeu9jv4.closest(finish, 'td,th', isRoot).bind(function (f) {
          return detect$5(container, isRoot, s, f, selectRange);
        });
      });
    } else {
      return Option.none();
    }
  };
  var detect$5 = function (container, isRoot, start, finish, selectRange) {
    if (!$_adlyqikbjfeu9js6.eq(start, finish)) {
      return $_38fsr3lgjfeu9jyw.identify(start, finish, isRoot).bind(function (cellSel) {
        var boxes = cellSel.boxes().getOr([]);
        if (boxes.length > 0) {
          selectRange(container, boxes, cellSel.start(), cellSel.finish());
          return Option.some($_exod7oyjfeu9ksm.response(Option.some($_e4zxhwp1jfeu9ktf.makeSitus(start, 0, start, $_ci6vdnl9jfeu9jxj.getEnd(start))), true));
        } else {
          return Option.none();
        }
      });
    } else {
      return Option.none();
    }
  };
  var update = function (rows, columns, container, selected, annotations) {
    var updateSelection = function (newSels) {
      annotations.clear(container);
      annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
      return newSels.boxes();
    };
    return $_38fsr3lgjfeu9jyw.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
  };
  var $_6eoa31p3jfeu9ku0 = {
    sync: sync,
    detect: detect$5,
    update: update
  };

  var nu$3 = $_6s7wfojxjfeu9joz.immutableBag([
    'left',
    'top',
    'right',
    'bottom'
  ], []);
  var moveDown = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() + amount,
      right: caret.right(),
      bottom: caret.bottom() + amount
    });
  };
  var moveUp = function (caret, amount) {
    return nu$3({
      left: caret.left(),
      top: caret.top() - amount,
      right: caret.right(),
      bottom: caret.bottom() - amount
    });
  };
  var moveBottomTo = function (caret, bottom) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: bottom - height,
      right: caret.right(),
      bottom: bottom
    });
  };
  var moveTopTo = function (caret, top) {
    var height = caret.bottom() - caret.top();
    return nu$3({
      left: caret.left(),
      top: top,
      right: caret.right(),
      bottom: top + height
    });
  };
  var translate = function (caret, xDelta, yDelta) {
    return nu$3({
      left: caret.left() + xDelta,
      top: caret.top() + yDelta,
      right: caret.right() + xDelta,
      bottom: caret.bottom() + yDelta
    });
  };
  var getTop$1 = function (caret) {
    return caret.top();
  };
  var getBottom = function (caret) {
    return caret.bottom();
  };
  var toString$1 = function (caret) {
    return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
  };
  var $_cgmc8jp6jfeu9kvg = {
    nu: nu$3,
    moveUp: moveUp,
    moveDown: moveDown,
    moveBottomTo: moveBottomTo,
    moveTopTo: moveTopTo,
    getTop: getTop$1,
    getBottom: getBottom,
    translate: translate,
    toString: toString$1
  };

  var getPartialBox = function (bridge, element, offset) {
    if (offset >= 0 && offset < $_ci6vdnl9jfeu9jxj.getEnd(element))
      return bridge.getRangedRect(element, offset, element, offset + 1);
    else if (offset > 0)
      return bridge.getRangedRect(element, offset - 1, element, offset);
    return Option.none();
  };
  var toCaret = function (rect) {
    return $_cgmc8jp6jfeu9kvg.nu({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom
    });
  };
  var getElemBox = function (bridge, element) {
    return Option.some(bridge.getRect(element));
  };
  var getBoxAt = function (bridge, element, offset) {
    if ($_prkbektjfeu9juk.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_prkbektjfeu9juk.isText(element))
      return getPartialBox(bridge, element, offset).map(toCaret);
    else
      return Option.none();
  };
  var getEntireBox = function (bridge, element) {
    if ($_prkbektjfeu9juk.isElement(element))
      return getElemBox(bridge, element).map(toCaret);
    else if ($_prkbektjfeu9juk.isText(element))
      return bridge.getRangedRect(element, 0, element, $_ci6vdnl9jfeu9jxj.getEnd(element)).map(toCaret);
    else
      return Option.none();
  };
  var $_eh1zrgp7jfeu9kvl = {
    getBoxAt: getBoxAt,
    getEntireBox: getEntireBox
  };

  var traverse = $_6s7wfojxjfeu9joz.immutable('item', 'mode');
  var backtrack = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : sidestep;
    return universe.property().parent(item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var sidestep = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    return direction.sibling(universe, item).map(function (p) {
      return traverse(p, transition);
    });
  };
  var advance = function (universe, item, direction, _transition) {
    var transition = _transition !== undefined ? _transition : advance;
    var children = universe.property().children(item);
    var result = direction.first(children);
    return result.map(function (r) {
      return traverse(r, transition);
    });
  };
  var successors = [
    {
      current: backtrack,
      next: sidestep,
      fallback: Option.none()
    },
    {
      current: sidestep,
      next: advance,
      fallback: Option.some(backtrack)
    },
    {
      current: advance,
      next: advance,
      fallback: Option.some(sidestep)
    }
  ];
  var go$1 = function (universe, item, mode, direction, rules) {
    var rules = rules !== undefined ? rules : successors;
    var ruleOpt = $_8soyqzjsjfeu9jnc.find(rules, function (succ) {
      return succ.current === mode;
    });
    return ruleOpt.bind(function (rule) {
      return rule.current(universe, item, direction, rule.next).orThunk(function () {
        return rule.fallback.bind(function (fb) {
          return go$1(universe, item, fb, direction);
        });
      });
    });
  };
  var $_do3td7pcjfeu9kwy = {
    backtrack: backtrack,
    sidestep: sidestep,
    advance: advance,
    go: go$1
  };

  var left$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().prevSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[children.length - 1]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var right$1 = function () {
    var sibling = function (universe, item) {
      return universe.query().nextSibling(item);
    };
    var first = function (children) {
      return children.length > 0 ? Option.some(children[0]) : Option.none();
    };
    return {
      sibling: sibling,
      first: first
    };
  };
  var $_d4xe6xpdjfeu9kx6 = {
    left: left$1,
    right: right$1
  };

  var hone = function (universe, item, predicate, mode, direction, isRoot) {
    var next = $_do3td7pcjfeu9kwy.go(universe, item, mode, direction);
    return next.bind(function (n) {
      if (isRoot(n.item()))
        return Option.none();
      else
        return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
    });
  };
  var left$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_do3td7pcjfeu9kwy.sidestep, $_d4xe6xpdjfeu9kx6.left(), isRoot);
  };
  var right$2 = function (universe, item, predicate, isRoot) {
    return hone(universe, item, predicate, $_do3td7pcjfeu9kwy.sidestep, $_d4xe6xpdjfeu9kx6.right(), isRoot);
  };
  var $_606rzspbjfeu9kwt = {
    left: left$2,
    right: right$2
  };

  var isLeaf = function (universe, element) {
    return universe.property().children(element).length === 0;
  };
  var before$2 = function (universe, item, isRoot) {
    return seekLeft(universe, item, $_8b8jopjujfeu9jnn.curry(isLeaf, universe), isRoot);
  };
  var after$3 = function (universe, item, isRoot) {
    return seekRight(universe, item, $_8b8jopjujfeu9jnn.curry(isLeaf, universe), isRoot);
  };
  var seekLeft = function (universe, item, predicate, isRoot) {
    return $_606rzspbjfeu9kwt.left(universe, item, predicate, isRoot);
  };
  var seekRight = function (universe, item, predicate, isRoot) {
    return $_606rzspbjfeu9kwt.right(universe, item, predicate, isRoot);
  };
  var walkers = function () {
    return {
      left: $_d4xe6xpdjfeu9kx6.left,
      right: $_d4xe6xpdjfeu9kx6.right
    };
  };
  var walk = function (universe, item, mode, direction, _rules) {
    return $_do3td7pcjfeu9kwy.go(universe, item, mode, direction, _rules);
  };
  var $_9l72mspajfeu9kwl = {
    before: before$2,
    after: after$3,
    seekLeft: seekLeft,
    seekRight: seekRight,
    walkers: walkers,
    walk: walk,
    backtrack: $_do3td7pcjfeu9kwy.backtrack,
    sidestep: $_do3td7pcjfeu9kwy.sidestep,
    advance: $_do3td7pcjfeu9kwy.advance
  };

  var universe$2 = DomUniverse();
  var gather = function (element, prune, transform) {
    return $_9l72mspajfeu9kwl.gather(universe$2, element, prune, transform);
  };
  var before$3 = function (element, isRoot) {
    return $_9l72mspajfeu9kwl.before(universe$2, element, isRoot);
  };
  var after$4 = function (element, isRoot) {
    return $_9l72mspajfeu9kwl.after(universe$2, element, isRoot);
  };
  var seekLeft$1 = function (element, predicate, isRoot) {
    return $_9l72mspajfeu9kwl.seekLeft(universe$2, element, predicate, isRoot);
  };
  var seekRight$1 = function (element, predicate, isRoot) {
    return $_9l72mspajfeu9kwl.seekRight(universe$2, element, predicate, isRoot);
  };
  var walkers$1 = function () {
    return $_9l72mspajfeu9kwl.walkers();
  };
  var walk$1 = function (item, mode, direction, _rules) {
    return $_9l72mspajfeu9kwl.walk(universe$2, item, mode, direction, _rules);
  };
  var $_69qjajp9jfeu9kwf = {
    gather: gather,
    before: before$3,
    after: after$4,
    seekLeft: seekLeft$1,
    seekRight: seekRight$1,
    walkers: walkers$1,
    walk: walk$1
  };

  var JUMP_SIZE = 5;
  var NUM_RETRIES = 100;
  var adt$2 = $_8miy51lujfeu9k2p.generate([
    { 'none': [] },
    { 'retry': ['caret'] }
  ]);
  var isOutside = function (caret, box) {
    return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
  };
  var inOutsideBlock = function (bridge, element, caret) {
    return $_causnjkyjfeu9jv6.closest(element, $_53jifzmejfeu9k7b.isBlock).fold($_8b8jopjujfeu9jnn.constant(false), function (cell) {
      return $_eh1zrgp7jfeu9kvl.getEntireBox(bridge, cell).exists(function (box) {
        return isOutside(caret, box);
      });
    });
  };
  var adjustDown = function (bridge, element, guessBox, original, caret) {
    var lowerCaret = $_cgmc8jp6jfeu9kvg.moveDown(caret, JUMP_SIZE);
    if (Math.abs(guessBox.bottom() - original.bottom()) < 1)
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() > caret.bottom())
      return adt$2.retry(lowerCaret);
    else if (guessBox.top() === caret.bottom())
      return adt$2.retry($_cgmc8jp6jfeu9kvg.moveDown(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_cgmc8jp6jfeu9kvg.translate(lowerCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var adjustUp = function (bridge, element, guessBox, original, caret) {
    var higherCaret = $_cgmc8jp6jfeu9kvg.moveUp(caret, JUMP_SIZE);
    if (Math.abs(guessBox.top() - original.top()) < 1)
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() < caret.top())
      return adt$2.retry(higherCaret);
    else if (guessBox.bottom() === caret.top())
      return adt$2.retry($_cgmc8jp6jfeu9kvg.moveUp(caret, 1));
    else
      return inOutsideBlock(bridge, element, caret) ? adt$2.retry($_cgmc8jp6jfeu9kvg.translate(higherCaret, JUMP_SIZE, 0)) : adt$2.none();
  };
  var upMovement = {
    point: $_cgmc8jp6jfeu9kvg.getTop,
    adjuster: adjustUp,
    move: $_cgmc8jp6jfeu9kvg.moveUp,
    gather: $_69qjajp9jfeu9kwf.before
  };
  var downMovement = {
    point: $_cgmc8jp6jfeu9kvg.getBottom,
    adjuster: adjustDown,
    move: $_cgmc8jp6jfeu9kvg.moveDown,
    gather: $_69qjajp9jfeu9kwf.after
  };
  var isAtTable = function (bridge, x, y) {
    return bridge.elementFromPoint(x, y).filter(function (elm) {
      return $_prkbektjfeu9juk.name(elm) === 'table';
    }).isSome();
  };
  var adjustForTable = function (bridge, movement, original, caret, numRetries) {
    return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
  };
  var adjustTil = function (bridge, movement, original, caret, numRetries) {
    if (numRetries === 0)
      return Option.some(caret);
    if (isAtTable(bridge, caret.left(), movement.point(caret)))
      return adjustForTable(bridge, movement, original, caret, numRetries - 1);
    return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
      return guess.start().fold(Option.none, function (element, offset) {
        return $_eh1zrgp7jfeu9kvl.getEntireBox(bridge, element, offset).bind(function (guessBox) {
          return movement.adjuster(bridge, element, guessBox, original, caret).fold(Option.none, function (newCaret) {
            return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
          });
        }).orThunk(function () {
          return Option.some(caret);
        });
      }, Option.none);
    });
  };
  var ieTryDown = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
  };
  var ieTryUp = function (bridge, caret) {
    return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
  };
  var checkScroll = function (movement, adjusted, bridge) {
    if (movement.point(adjusted) > bridge.getInnerHeight())
      return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
    else if (movement.point(adjusted) < 0)
      return Option.some(-movement.point(adjusted));
    else
      return Option.none();
  };
  var retry = function (movement, bridge, caret) {
    var moved = movement.move(caret, JUMP_SIZE);
    var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
    return checkScroll(movement, adjusted, bridge).fold(function () {
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
    }, function (delta) {
      bridge.scrollBy(0, delta);
      return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
    });
  };
  var $_cd8lfep8jfeu9kvx = {
    tryUp: $_8b8jopjujfeu9jnn.curry(retry, upMovement),
    tryDown: $_8b8jopjujfeu9jnn.curry(retry, downMovement),
    ieTryUp: ieTryUp,
    ieTryDown: ieTryDown,
    getJumpSize: $_8b8jopjujfeu9jnn.constant(JUMP_SIZE)
  };

  var adt$3 = $_8miy51lujfeu9k2p.generate([
    { 'none': ['message'] },
    { 'success': [] },
    { 'failedUp': ['cell'] },
    { 'failedDown': ['cell'] }
  ]);
  var isOverlapping = function (bridge, before, after) {
    var beforeBounds = bridge.getRect(before);
    var afterBounds = bridge.getRect(after);
    return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
  };
  var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(after, 'td,th', isRoot).bind(function (afterCell) {
      return $_e4f1b4kxjfeu9jv4.closest(before, 'td,th', isRoot).map(function (beforeCell) {
        if (!$_adlyqikbjfeu9js6.eq(afterCell, beforeCell)) {
          return $_o3fxklhjfeu9jzl.sharedOne(isRow, [
            afterCell,
            beforeCell
          ]).fold(function () {
            return isOverlapping(bridge, beforeCell, afterCell) ? adt$3.success() : failure(beforeCell);
          }, function (sharedRow) {
            return failure(beforeCell);
          });
        } else {
          return $_adlyqikbjfeu9js6.eq(after, afterCell) && $_ci6vdnl9jfeu9jxj.getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$3.none('in same cell');
        }
      });
    }).getOr(adt$3.none('default'));
  };
  var isRow = function (elem) {
    return $_e4f1b4kxjfeu9jv4.closest(elem, 'tr');
  };
  var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
    return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
  };
  var $_fknijpejfeu9kxa = {
    verify: verify,
    cata: cata$2,
    adt: adt$3
  };

  var point = $_6s7wfojxjfeu9joz.immutable('element', 'offset');
  var delta = $_6s7wfojxjfeu9joz.immutable('element', 'deltaOffset');
  var range$3 = $_6s7wfojxjfeu9joz.immutable('element', 'start', 'finish');
  var points = $_6s7wfojxjfeu9joz.immutable('begin', 'end');
  var text = $_6s7wfojxjfeu9joz.immutable('element', 'text');
  var $_5btwf3pgjfeu9ky2 = {
    point: point,
    delta: delta,
    range: range$3,
    points: points,
    text: text
  };

  var inAncestor = $_6s7wfojxjfeu9joz.immutable('ancestor', 'descendants', 'element', 'index');
  var inParent = $_6s7wfojxjfeu9joz.immutable('parent', 'children', 'element', 'index');
  var childOf = function (element, ancestor) {
    return $_causnjkyjfeu9jv6.closest(element, function (elem) {
      return $_dzvm7xk9jfeu9jrm.parent(elem).exists(function (parent) {
        return $_adlyqikbjfeu9js6.eq(parent, ancestor);
      });
    });
  };
  var indexInParent = function (element) {
    return $_dzvm7xk9jfeu9jrm.parent(element).bind(function (parent) {
      var children = $_dzvm7xk9jfeu9jrm.children(parent);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var indexOf$1 = function (elements, element) {
    return $_8soyqzjsjfeu9jnc.findIndex(elements, $_8b8jopjujfeu9jnn.curry($_adlyqikbjfeu9js6.eq, element));
  };
  var selectorsInParent = function (element, selector) {
    return $_dzvm7xk9jfeu9jrm.parent(element).bind(function (parent) {
      var children = $_dva6q3kujfeu9juo.children(parent, selector);
      return indexOf$1(children, element).map(function (index) {
        return inParent(parent, children, element, index);
      });
    });
  };
  var descendantsInAncestor = function (element, ancestorSelector, descendantSelector) {
    return $_e4f1b4kxjfeu9jv4.closest(element, ancestorSelector).bind(function (ancestor) {
      var descendants = $_dva6q3kujfeu9juo.descendants(ancestor, descendantSelector);
      return indexOf$1(descendants, element).map(function (index) {
        return inAncestor(ancestor, descendants, element, index);
      });
    });
  };
  var $_7hvuxbphjfeu9ky6 = {
    childOf: childOf,
    indexOf: indexOf$1,
    indexInParent: indexInParent,
    selectorsInParent: selectorsInParent,
    descendantsInAncestor: descendantsInAncestor
  };

  var isBr = function (elem) {
    return $_prkbektjfeu9juk.name(elem) === 'br';
  };
  var gatherer = function (cand, gather, isRoot) {
    return gather(cand, isRoot).bind(function (target) {
      return $_prkbektjfeu9juk.isText(target) && $_allfqrlajfeu9jxn.get(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
    });
  };
  var handleBr = function (isRoot, element, direction) {
    return direction.traverse(element).orThunk(function () {
      return gatherer(element, direction.gather, isRoot);
    }).map(direction.relative);
  };
  var findBr = function (element, offset) {
    return $_dzvm7xk9jfeu9jrm.child(element, offset).filter(isBr).orThunk(function () {
      return $_dzvm7xk9jfeu9jrm.child(element, offset - 1).filter(isBr);
    });
  };
  var handleParent = function (isRoot, element, offset, direction) {
    return findBr(element, offset).bind(function (br) {
      return direction.traverse(br).fold(function () {
        return gatherer(br, direction.gather, isRoot).map(direction.relative);
      }, function (adjacent) {
        return $_7hvuxbphjfeu9ky6.indexInParent(adjacent).map(function (info) {
          return $_86vrrvoijfeu9kpb.on(info.parent(), info.index());
        });
      });
    });
  };
  var tryBr = function (isRoot, element, offset, direction) {
    var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
    return target.map(function (tgt) {
      return {
        start: $_8b8jopjujfeu9jnn.constant(tgt),
        finish: $_8b8jopjujfeu9jnn.constant(tgt)
      };
    });
  };
  var process = function (analysis) {
    return $_fknijpejfeu9kxa.cata(analysis, function (message) {
      return Option.none();
    }, function () {
      return Option.none();
    }, function (cell) {
      return Option.some($_5btwf3pgjfeu9ky2.point(cell, 0));
    }, function (cell) {
      return Option.some($_5btwf3pgjfeu9ky2.point(cell, $_ci6vdnl9jfeu9jxj.getEnd(cell)));
    });
  };
  var $_dmitjvpfjfeu9kxl = {
    tryBr: tryBr,
    process: process
  };

  var MAX_RETRIES = 20;
  var platform$1 = $_d2ygmokgjfeu9jsv.detect();
  var findSpot = function (bridge, isRoot, direction) {
    return bridge.getSelection().bind(function (sel) {
      return $_dmitjvpfjfeu9kxl.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
        return Option.some($_5btwf3pgjfeu9ky2.point(sel.finish(), sel.foffset()));
      }, function (brNeighbour) {
        var range = bridge.fromSitus(brNeighbour);
        var analysis = $_fknijpejfeu9kxa.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
        return $_dmitjvpfjfeu9kxl.process(analysis);
      });
    });
  };
  var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
    if (numRetries === 0)
      return Option.none();
    return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
      var range = bridge.fromSitus(situs);
      var analysis = $_fknijpejfeu9kxa.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
      return $_fknijpejfeu9kxa.cata(analysis, function () {
        return Option.none();
      }, function () {
        return Option.some(situs);
      }, function (cell) {
        if ($_adlyqikbjfeu9js6.eq(element, cell) && offset === 0)
          return tryAgain(bridge, element, offset, $_cgmc8jp6jfeu9kvg.moveUp, direction);
        else
          return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
      }, function (cell) {
        if ($_adlyqikbjfeu9js6.eq(element, cell) && offset === $_ci6vdnl9jfeu9jxj.getEnd(cell))
          return tryAgain(bridge, element, offset, $_cgmc8jp6jfeu9kvg.moveDown, direction);
        else
          return scan(bridge, isRoot, cell, $_ci6vdnl9jfeu9jxj.getEnd(cell), direction, numRetries - 1);
      });
    });
  };
  var tryAgain = function (bridge, element, offset, move, direction) {
    return $_eh1zrgp7jfeu9kvl.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, move(box, $_cd8lfep8jfeu9kvx.getJumpSize()));
    });
  };
  var tryAt = function (bridge, direction, box) {
    if (platform$1.browser.isChrome() || platform$1.browser.isSafari() || platform$1.browser.isFirefox() || platform$1.browser.isEdge())
      return direction.otherRetry(bridge, box);
    else if (platform$1.browser.isIE())
      return direction.ieRetry(bridge, box);
    else
      return Option.none();
  };
  var tryCursor = function (bridge, isRoot, element, offset, direction) {
    return $_eh1zrgp7jfeu9kvl.getBoxAt(bridge, element, offset).bind(function (box) {
      return tryAt(bridge, direction, box);
    });
  };
  var handle$2 = function (bridge, isRoot, direction) {
    return findSpot(bridge, isRoot, direction).bind(function (spot) {
      return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
    });
  };
  var $_f33vs4p5jfeu9kv3 = { handle: handle$2 };

  var any$1 = function (predicate) {
    return $_causnjkyjfeu9jv6.first(predicate).isSome();
  };
  var ancestor$3 = function (scope, predicate, isRoot) {
    return $_causnjkyjfeu9jv6.ancestor(scope, predicate, isRoot).isSome();
  };
  var closest$3 = function (scope, predicate, isRoot) {
    return $_causnjkyjfeu9jv6.closest(scope, predicate, isRoot).isSome();
  };
  var sibling$3 = function (scope, predicate) {
    return $_causnjkyjfeu9jv6.sibling(scope, predicate).isSome();
  };
  var child$4 = function (scope, predicate) {
    return $_causnjkyjfeu9jv6.child(scope, predicate).isSome();
  };
  var descendant$3 = function (scope, predicate) {
    return $_causnjkyjfeu9jv6.descendant(scope, predicate).isSome();
  };
  var $_wb2ggpijfeu9kyj = {
    any: any$1,
    ancestor: ancestor$3,
    closest: closest$3,
    sibling: sibling$3,
    child: child$4,
    descendant: descendant$3
  };

  var detection = $_d2ygmokgjfeu9jsv.detect();
  var inSameTable = function (elem, table) {
    return $_wb2ggpijfeu9kyj.ancestor(elem, function (e) {
      return $_dzvm7xk9jfeu9jrm.parent(e).exists(function (p) {
        return $_adlyqikbjfeu9js6.eq(p, table);
      });
    });
  };
  var simulate = function (bridge, isRoot, direction, initial, anchor) {
    return $_e4f1b4kxjfeu9jv4.closest(initial, 'td,th', isRoot).bind(function (start) {
      return $_e4f1b4kxjfeu9jv4.closest(start, 'table', isRoot).bind(function (table) {
        if (!inSameTable(anchor, table))
          return Option.none();
        return $_f33vs4p5jfeu9kv3.handle(bridge, isRoot, direction).bind(function (range) {
          return $_e4f1b4kxjfeu9jv4.closest(range.finish(), 'td,th', isRoot).map(function (finish) {
            return {
              start: $_8b8jopjujfeu9jnn.constant(start),
              finish: $_8b8jopjujfeu9jnn.constant(finish),
              range: $_8b8jopjujfeu9jnn.constant(range)
            };
          });
        });
      });
    });
  };
  var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
    if (detection.browser.isIE()) {
      return Option.none();
    } else {
      return precheck(initial, isRoot).orThunk(function () {
        return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
          var range = info.range();
          return $_exod7oyjfeu9ksm.response(Option.some($_e4zxhwp1jfeu9ktf.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
        });
      });
    }
  };
  var firstUpCheck = function (initial, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_e4f1b4kxjfeu9jv4.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_dva6q3kujfeu9juo.descendants(table, 'tr');
        if ($_adlyqikbjfeu9js6.eq(startRow, rows[0])) {
          return $_69qjajp9jfeu9kwf.seekLeft(table, function (element) {
            return $_7ig6trl8jfeu9jxe.last(element).isSome();
          }, isRoot).map(function (last) {
            var lastOffset = $_ci6vdnl9jfeu9jxj.getEnd(last);
            return $_exod7oyjfeu9ksm.response(Option.some($_e4zxhwp1jfeu9ktf.makeSitus(last, lastOffset, last, lastOffset)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var lastDownCheck = function (initial, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(initial, 'tr', isRoot).bind(function (startRow) {
      return $_e4f1b4kxjfeu9jv4.closest(startRow, 'table', isRoot).bind(function (table) {
        var rows = $_dva6q3kujfeu9juo.descendants(table, 'tr');
        if ($_adlyqikbjfeu9js6.eq(startRow, rows[rows.length - 1])) {
          return $_69qjajp9jfeu9kwf.seekRight(table, function (element) {
            return $_7ig6trl8jfeu9jxe.first(element).isSome();
          }, isRoot).map(function (first) {
            return $_exod7oyjfeu9ksm.response(Option.some($_e4zxhwp1jfeu9ktf.makeSitus(first, 0, first, 0)), true);
          });
        } else {
          return Option.none();
        }
      });
    });
  };
  var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
    return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
      return $_6eoa31p3jfeu9ku0.detect(container, isRoot, info.start(), info.finish(), selectRange);
    });
  };
  var $_4861kgp4jfeu9kua = {
    navigate: navigate,
    select: select,
    firstUpCheck: firstUpCheck,
    lastDownCheck: lastDownCheck
  };

  var findCell = function (target, isRoot) {
    return $_e4f1b4kxjfeu9jv4.closest(target, 'td,th', isRoot);
  };
  function MouseSelection (bridge, container, isRoot, annotations) {
    var cursor = Option.none();
    var clearState = function () {
      cursor = Option.none();
    };
    var mousedown = function (event) {
      annotations.clear(container);
      cursor = findCell(event.target(), isRoot);
    };
    var mouseover = function (event) {
      cursor.each(function (start) {
        annotations.clear(container);
        findCell(event.target(), isRoot).each(function (finish) {
          $_38fsr3lgjfeu9jyw.identify(start, finish, isRoot).each(function (cellSel) {
            var boxes = cellSel.boxes().getOr([]);
            if (boxes.length > 1 || boxes.length === 1 && !$_adlyqikbjfeu9js6.eq(start, finish)) {
              annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
              bridge.selectContents(finish);
            }
          });
        });
      });
    };
    var mouseup = function () {
      cursor.each(clearState);
    };
    return {
      mousedown: mousedown,
      mouseover: mouseover,
      mouseup: mouseup
    };
  }

  var $_9bubt5pkjfeu9kyu = {
    down: {
      traverse: $_dzvm7xk9jfeu9jrm.nextSibling,
      gather: $_69qjajp9jfeu9kwf.after,
      relative: $_86vrrvoijfeu9kpb.before,
      otherRetry: $_cd8lfep8jfeu9kvx.tryDown,
      ieRetry: $_cd8lfep8jfeu9kvx.ieTryDown,
      failure: $_fknijpejfeu9kxa.adt.failedDown
    },
    up: {
      traverse: $_dzvm7xk9jfeu9jrm.prevSibling,
      gather: $_69qjajp9jfeu9kwf.before,
      relative: $_86vrrvoijfeu9kpb.before,
      otherRetry: $_cd8lfep8jfeu9kvx.tryUp,
      ieRetry: $_cd8lfep8jfeu9kvx.ieTryUp,
      failure: $_fknijpejfeu9kxa.adt.failedUp
    }
  };

  var rc = $_6s7wfojxjfeu9joz.immutable('rows', 'cols');
  var mouse = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var handlers = MouseSelection(bridge, container, isRoot, annotations);
    return {
      mousedown: handlers.mousedown,
      mouseover: handlers.mouseover,
      mouseup: handlers.mouseup
    };
  };
  var keyboard = function (win, container, isRoot, annotations) {
    var bridge = WindowBridge(win);
    var clearToNavigate = function () {
      annotations.clear(container);
      return Option.none();
    };
    var keydown = function (event, start, soffset, finish, foffset, direction) {
      var keycode = event.raw().which;
      var shiftKey = event.raw().shiftKey === true;
      var handler = $_38fsr3lgjfeu9jyw.retrieve(container, annotations.selectedSelector()).fold(function () {
        if ($_d1j4jtozjfeu9ksr.isDown(keycode) && shiftKey) {
          return $_8b8jopjujfeu9jnn.curry($_4861kgp4jfeu9kua.select, bridge, container, isRoot, $_9bubt5pkjfeu9kyu.down, finish, start, annotations.selectRange);
        } else if ($_d1j4jtozjfeu9ksr.isUp(keycode) && shiftKey) {
          return $_8b8jopjujfeu9jnn.curry($_4861kgp4jfeu9kua.select, bridge, container, isRoot, $_9bubt5pkjfeu9kyu.up, finish, start, annotations.selectRange);
        } else if ($_d1j4jtozjfeu9ksr.isDown(keycode)) {
          return $_8b8jopjujfeu9jnn.curry($_4861kgp4jfeu9kua.navigate, bridge, isRoot, $_9bubt5pkjfeu9kyu.down, finish, start, $_4861kgp4jfeu9kua.lastDownCheck);
        } else if ($_d1j4jtozjfeu9ksr.isUp(keycode)) {
          return $_8b8jopjujfeu9jnn.curry($_4861kgp4jfeu9kua.navigate, bridge, isRoot, $_9bubt5pkjfeu9kyu.up, finish, start, $_4861kgp4jfeu9kua.firstUpCheck);
        } else {
          return Option.none;
        }
      }, function (selected) {
        var update = function (attempts) {
          return function () {
            var navigation = $_dxo57pmijfeu9k8a.findMap(attempts, function (delta) {
              return $_6eoa31p3jfeu9ku0.update(delta.rows(), delta.cols(), container, selected, annotations);
            });
            return navigation.fold(function () {
              return $_38fsr3lgjfeu9jyw.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                var relative = $_d1j4jtozjfeu9ksr.isDown(keycode) || direction.isForward(keycode) ? $_86vrrvoijfeu9kpb.after : $_86vrrvoijfeu9kpb.before;
                bridge.setRelativeSelection($_86vrrvoijfeu9kpb.on(edges.first(), 0), relative(edges.table()));
                annotations.clear(container);
                return $_exod7oyjfeu9ksm.response(Option.none(), true);
              });
            }, function (_) {
              return Option.some($_exod7oyjfeu9ksm.response(Option.none(), true));
            });
          };
        };
        if ($_d1j4jtozjfeu9ksr.isDown(keycode) && shiftKey)
          return update([rc(+1, 0)]);
        else if ($_d1j4jtozjfeu9ksr.isUp(keycode) && shiftKey)
          return update([rc(-1, 0)]);
        else if (direction.isBackward(keycode) && shiftKey)
          return update([
            rc(0, -1),
            rc(-1, 0)
          ]);
        else if (direction.isForward(keycode) && shiftKey)
          return update([
            rc(0, +1),
            rc(+1, 0)
          ]);
        else if ($_d1j4jtozjfeu9ksr.isNavigation(keycode) && shiftKey === false)
          return clearToNavigate;
        else
          return Option.none;
      });
      return handler();
    };
    var keyup = function (event, start, soffset, finish, foffset) {
      return $_38fsr3lgjfeu9jyw.retrieve(container, annotations.selectedSelector()).fold(function () {
        var keycode = event.raw().which;
        var shiftKey = event.raw().shiftKey === true;
        if (shiftKey === false)
          return Option.none();
        if ($_d1j4jtozjfeu9ksr.isNavigation(keycode))
          return $_6eoa31p3jfeu9ku0.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
        else
          return Option.none();
      }, Option.none);
    };
    return {
      keydown: keydown,
      keyup: keyup
    };
  };
  var $_2qvd9woxjfeu9ksa = {
    mouse: mouse,
    keyboard: keyboard
  };

  var add$3 = function (element, classes) {
    $_8soyqzjsjfeu9jnc.each(classes, function (x) {
      $_d7p727mtjfeu9kav.add(element, x);
    });
  };
  var remove$7 = function (element, classes) {
    $_8soyqzjsjfeu9jnc.each(classes, function (x) {
      $_d7p727mtjfeu9kav.remove(element, x);
    });
  };
  var toggle$2 = function (element, classes) {
    $_8soyqzjsjfeu9jnc.each(classes, function (x) {
      $_d7p727mtjfeu9kav.toggle(element, x);
    });
  };
  var hasAll = function (element, classes) {
    return $_8soyqzjsjfeu9jnc.forall(classes, function (clazz) {
      return $_d7p727mtjfeu9kav.has(element, clazz);
    });
  };
  var hasAny = function (element, classes) {
    return $_8soyqzjsjfeu9jnc.exists(classes, function (clazz) {
      return $_d7p727mtjfeu9kav.has(element, clazz);
    });
  };
  var getNative = function (element) {
    var classList = element.dom().classList;
    var r = new Array(classList.length);
    for (var i = 0; i < classList.length; i++) {
      r[i] = classList.item(i);
    }
    return r;
  };
  var get$11 = function (element) {
    return $_ah67cgmvjfeu9kb1.supports(element) ? getNative(element) : $_ah67cgmvjfeu9kb1.get(element);
  };
  var $_bbps16pnjfeu9kzf = {
    add: add$3,
    remove: remove$7,
    toggle: toggle$2,
    hasAll: hasAll,
    hasAny: hasAny,
    get: get$11
  };

  var addClass = function (clazz) {
    return function (element) {
      $_d7p727mtjfeu9kav.add(element, clazz);
    };
  };
  var removeClass = function (clazz) {
    return function (element) {
      $_d7p727mtjfeu9kav.remove(element, clazz);
    };
  };
  var removeClasses = function (classes) {
    return function (element) {
      $_bbps16pnjfeu9kzf.remove(element, classes);
    };
  };
  var hasClass = function (clazz) {
    return function (element) {
      return $_d7p727mtjfeu9kav.has(element, clazz);
    };
  };
  var $_6fxabmpmjfeu9kzd = {
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    hasClass: hasClass
  };

  var byClass = function (ephemera) {
    var addSelectionClass = $_6fxabmpmjfeu9kzd.addClass(ephemera.selected());
    var removeSelectionClasses = $_6fxabmpmjfeu9kzd.removeClasses([
      ephemera.selected(),
      ephemera.lastSelected(),
      ephemera.firstSelected()
    ]);
    var clear = function (container) {
      var sels = $_dva6q3kujfeu9juo.descendants(container, ephemera.selectedSelector());
      $_8soyqzjsjfeu9jnc.each(sels, removeSelectionClasses);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_8soyqzjsjfeu9jnc.each(cells, addSelectionClass);
      $_d7p727mtjfeu9kav.add(start, ephemera.firstSelected());
      $_d7p727mtjfeu9kav.add(finish, ephemera.lastSelected());
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var byAttr = function (ephemera) {
    var removeSelectionAttributes = function (element) {
      $_gd427vksjfeu9ju9.remove(element, ephemera.selected());
      $_gd427vksjfeu9ju9.remove(element, ephemera.firstSelected());
      $_gd427vksjfeu9ju9.remove(element, ephemera.lastSelected());
    };
    var addSelectionAttribute = function (element) {
      $_gd427vksjfeu9ju9.set(element, ephemera.selected(), '1');
    };
    var clear = function (container) {
      var sels = $_dva6q3kujfeu9juo.descendants(container, ephemera.selectedSelector());
      $_8soyqzjsjfeu9jnc.each(sels, removeSelectionAttributes);
    };
    var selectRange = function (container, cells, start, finish) {
      clear(container);
      $_8soyqzjsjfeu9jnc.each(cells, addSelectionAttribute);
      $_gd427vksjfeu9ju9.set(start, ephemera.firstSelected(), '1');
      $_gd427vksjfeu9ju9.set(finish, ephemera.lastSelected(), '1');
    };
    return {
      clear: clear,
      selectRange: selectRange,
      selectedSelector: ephemera.selectedSelector,
      firstSelectedSelector: ephemera.firstSelectedSelector,
      lastSelectedSelector: ephemera.lastSelectedSelector
    };
  };
  var $_donrdxpljfeu9kz2 = {
    byClass: byClass,
    byAttr: byAttr
  };

  function CellSelection$1 (editor, lazyResize) {
    var handlerStruct = $_6s7wfojxjfeu9joz.immutableBag([
      'mousedown',
      'mouseover',
      'mouseup',
      'keyup',
      'keydown'
    ], []);
    var handlers = Option.none();
    var annotations = $_donrdxpljfeu9kz2.byAttr($_2lc5wjlsjfeu9k2e);
    editor.on('init', function (e) {
      var win = editor.getWin();
      var body = $_ejkywknajfeu9ket.getBody(editor);
      var isRoot = $_ejkywknajfeu9ket.getIsRoot(editor);
      var syncSelection = function () {
        var sel = editor.selection;
        var start = $_5csi13k7jfeu9jrb.fromDom(sel.getStart());
        var end = $_5csi13k7jfeu9jrb.fromDom(sel.getEnd());
        var startTable = $_811muwk4jfeu9jq0.table(start);
        var endTable = $_811muwk4jfeu9jq0.table(end);
        var sameTable = startTable.bind(function (tableStart) {
          return endTable.bind(function (tableEnd) {
            return $_adlyqikbjfeu9js6.eq(tableStart, tableEnd) ? Option.some(true) : Option.none();
          });
        });
        sameTable.fold(function () {
          annotations.clear(body);
        }, $_8b8jopjujfeu9jnn.noop);
      };
      var mouseHandlers = $_2qvd9woxjfeu9ksa.mouse(win, body, isRoot, annotations);
      var keyHandlers = $_2qvd9woxjfeu9ksa.keyboard(win, body, isRoot, annotations);
      var hasShiftKey = function (event) {
        return event.raw().shiftKey === true;
      };
      var handleResponse = function (event, response) {
        if (!hasShiftKey(event)) {
          return;
        }
        if (response.kill()) {
          event.kill();
        }
        response.selection().each(function (ns) {
          var relative = $_6f0j2fohjfeu9kp5.relative(ns.start(), ns.finish());
          var rng = $_b7updqonjfeu9kq4.asLtrRange(win, relative);
          editor.selection.setRng(rng);
        });
      };
      var keyup = function (event) {
        var wrappedEvent = wrapEvent(event);
        if (wrappedEvent.raw().shiftKey && $_d1j4jtozjfeu9ksr.isNavigation(wrappedEvent.raw().which)) {
          var rng = editor.selection.getRng();
          var start = $_5csi13k7jfeu9jrb.fromDom(rng.startContainer);
          var end = $_5csi13k7jfeu9jrb.fromDom(rng.endContainer);
          keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
        }
      };
      var checkLast = function (last) {
        return !$_gd427vksjfeu9ju9.has(last, 'data-mce-bogus') && $_prkbektjfeu9juk.name(last) !== 'br' && !($_prkbektjfeu9juk.isText(last) && $_allfqrlajfeu9jxn.get(last).length === 0);
      };
      var getLast = function () {
        var body = $_5csi13k7jfeu9jrb.fromDom(editor.getBody());
        var lastChild = $_dzvm7xk9jfeu9jrm.lastChild(body);
        var getPrevLast = function (last) {
          return $_dzvm7xk9jfeu9jrm.prevSibling(last).bind(function (prevLast) {
            return checkLast(prevLast) ? Option.some(prevLast) : getPrevLast(prevLast);
          });
        };
        return lastChild.bind(function (last) {
          return checkLast(last) ? Option.some(last) : getPrevLast(last);
        });
      };
      var keydown = function (event) {
        var wrappedEvent = wrapEvent(event);
        lazyResize().each(function (resize) {
          resize.hideBars();
        });
        if (event.which === 40) {
          getLast().each(function (last) {
            if ($_prkbektjfeu9juk.name(last) === 'table') {
              if (getForcedRootBlock(editor)) {
                editor.dom.add(editor.getBody(), getForcedRootBlock(editor), getForcedRootBlockAttrs(editor), '<br/>');
              } else {
                editor.dom.add(editor.getBody(), 'br');
              }
            }
          });
        }
        var rng = editor.selection.getRng();
        var startContainer = $_5csi13k7jfeu9jrb.fromDom(editor.selection.getStart());
        var start = $_5csi13k7jfeu9jrb.fromDom(rng.startContainer);
        var end = $_5csi13k7jfeu9jrb.fromDom(rng.endContainer);
        var direction = $_3ta6w6nbjfeu9kf0.directionAt(startContainer).isRtl() ? $_d1j4jtozjfeu9ksr.rtl : $_d1j4jtozjfeu9ksr.ltr;
        keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
          handleResponse(wrappedEvent, response);
        });
        lazyResize().each(function (resize) {
          resize.showBars();
        });
      };
      var isMouseEvent = function (event) {
        return event.hasOwnProperty('x') && event.hasOwnProperty('y');
      };
      var wrapEvent = function (event) {
        var target = $_5csi13k7jfeu9jrb.fromDom(event.target);
        var stop = function () {
          event.stopPropagation();
        };
        var prevent = function () {
          event.preventDefault();
        };
        var kill = $_8b8jopjujfeu9jnn.compose(prevent, stop);
        return {
          target: $_8b8jopjujfeu9jnn.constant(target),
          x: $_8b8jopjujfeu9jnn.constant(isMouseEvent(event) ? event.x : null),
          y: $_8b8jopjujfeu9jnn.constant(isMouseEvent(event) ? event.y : null),
          stop: stop,
          prevent: prevent,
          kill: kill,
          raw: $_8b8jopjujfeu9jnn.constant(event)
        };
      };
      var isLeftMouse = function (raw) {
        return raw.button === 0;
      };
      var isLeftButtonPressed = function (raw) {
        if (raw.buttons === undefined) {
          return true;
        }
        return (raw.buttons & 1) !== 0;
      };
      var mouseDown = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mousedown(wrapEvent(e));
        }
      };
      var mouseOver = function (e) {
        if (isLeftButtonPressed(e)) {
          mouseHandlers.mouseover(wrapEvent(e));
        }
      };
      var mouseUp = function (e) {
        if (isLeftMouse(e)) {
          mouseHandlers.mouseup(wrapEvent(e));
        }
      };
      editor.on('mousedown', mouseDown);
      editor.on('mouseover', mouseOver);
      editor.on('mouseup', mouseUp);
      editor.on('keyup', keyup);
      editor.on('keydown', keydown);
      editor.on('nodechange', syncSelection);
      handlers = Option.some(handlerStruct({
        mousedown: mouseDown,
        mouseover: mouseOver,
        mouseup: mouseUp,
        keyup: keyup,
        keydown: keydown
      }));
    });
    var destroy = function () {
      handlers.each(function (handlers) {
      });
    };
    return {
      clear: annotations.clear,
      destroy: destroy
    };
  }

  var Selections = function (editor) {
    var get = function () {
      var body = $_ejkywknajfeu9ket.getBody(editor);
      return $_1n2uwzlfjfeu9jyj.retrieve(body, $_2lc5wjlsjfeu9k2e.selectedSelector()).fold(function () {
        if (editor.selection.getStart() === undefined) {
          return $_he7ygltjfeu9k2k.none();
        } else {
          return $_he7ygltjfeu9k2k.single(editor.selection);
        }
      }, function (cells) {
        return $_he7ygltjfeu9k2k.multiple(cells);
      });
    };
    return { get: get };
  };

  var each$4 = global$2.each;
  var addButtons = function (editor) {
    var menuItems = [];
    each$4('inserttable tableprops deletetable | cell row column'.split(' '), function (name) {
      if (name === '|') {
        menuItems.push({ text: '-' });
      } else {
        menuItems.push(editor.menuItems[name]);
      }
    });
    editor.addButton('table', {
      type: 'menubutton',
      title: 'Table',
      menu: menuItems
    });
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    editor.addButton('tableprops', {
      title: 'Table properties',
      onclick: $_8b8jopjujfeu9jnn.curry($_3ld6eonmjfeu9kho.open, editor, true),
      icon: 'table'
    });
    editor.addButton('tabledelete', {
      title: 'Delete table',
      onclick: cmd('mceTableDelete')
    });
    editor.addButton('tablecellprops', {
      title: 'Cell properties',
      onclick: cmd('mceTableCellProps')
    });
    editor.addButton('tablemergecells', {
      title: 'Merge cells',
      onclick: cmd('mceTableMergeCells')
    });
    editor.addButton('tablesplitcells', {
      title: 'Split cell',
      onclick: cmd('mceTableSplitCells')
    });
    editor.addButton('tableinsertrowbefore', {
      title: 'Insert row before',
      onclick: cmd('mceTableInsertRowBefore')
    });
    editor.addButton('tableinsertrowafter', {
      title: 'Insert row after',
      onclick: cmd('mceTableInsertRowAfter')
    });
    editor.addButton('tabledeleterow', {
      title: 'Delete row',
      onclick: cmd('mceTableDeleteRow')
    });
    editor.addButton('tablerowprops', {
      title: 'Row properties',
      onclick: cmd('mceTableRowProps')
    });
    editor.addButton('tablecutrow', {
      title: 'Cut row',
      onclick: cmd('mceTableCutRow')
    });
    editor.addButton('tablecopyrow', {
      title: 'Copy row',
      onclick: cmd('mceTableCopyRow')
    });
    editor.addButton('tablepasterowbefore', {
      title: 'Paste row before',
      onclick: cmd('mceTablePasteRowBefore')
    });
    editor.addButton('tablepasterowafter', {
      title: 'Paste row after',
      onclick: cmd('mceTablePasteRowAfter')
    });
    editor.addButton('tableinsertcolbefore', {
      title: 'Insert column before',
      onclick: cmd('mceTableInsertColBefore')
    });
    editor.addButton('tableinsertcolafter', {
      title: 'Insert column after',
      onclick: cmd('mceTableInsertColAfter')
    });
    editor.addButton('tabledeletecol', {
      title: 'Delete column',
      onclick: cmd('mceTableDeleteCol')
    });
  };
  var addToolbars = function (editor) {
    var isTable = function (table) {
      var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);
      return selectorMatched;
    };
    var toolbar = getToolbar(editor);
    if (toolbar.length > 0) {
      editor.addContextToolbar(isTable, toolbar.join(' '));
    }
  };
  var $_f4wymqppjfeu9kzo = {
    addButtons: addButtons,
    addToolbars: addToolbars
  };

  var addMenuItems = function (editor, selections) {
    var targets = Option.none();
    var tableCtrls = [];
    var cellCtrls = [];
    var mergeCtrls = [];
    var unmergeCtrls = [];
    var noTargetDisable = function (ctrl) {
      ctrl.disabled(true);
    };
    var ctrlEnable = function (ctrl) {
      ctrl.disabled(false);
    };
    var pushTable = function () {
      var self = this;
      tableCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushCell = function () {
      var self = this;
      cellCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        ctrlEnable(self);
      });
    };
    var pushMerge = function () {
      var self = this;
      mergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.mergable().isNone());
      });
    };
    var pushUnmerge = function () {
      var self = this;
      unmergeCtrls.push(self);
      targets.fold(function () {
        noTargetDisable(self);
      }, function (targets) {
        self.disabled(targets.unmergable().isNone());
      });
    };
    var setDisabledCtrls = function () {
      targets.fold(function () {
        $_8soyqzjsjfeu9jnc.each(tableCtrls, noTargetDisable);
        $_8soyqzjsjfeu9jnc.each(cellCtrls, noTargetDisable);
        $_8soyqzjsjfeu9jnc.each(mergeCtrls, noTargetDisable);
        $_8soyqzjsjfeu9jnc.each(unmergeCtrls, noTargetDisable);
      }, function (targets) {
        $_8soyqzjsjfeu9jnc.each(tableCtrls, ctrlEnable);
        $_8soyqzjsjfeu9jnc.each(cellCtrls, ctrlEnable);
        $_8soyqzjsjfeu9jnc.each(mergeCtrls, function (mergeCtrl) {
          mergeCtrl.disabled(targets.mergable().isNone());
        });
        $_8soyqzjsjfeu9jnc.each(unmergeCtrls, function (unmergeCtrl) {
          unmergeCtrl.disabled(targets.unmergable().isNone());
        });
      });
    };
    editor.on('init', function () {
      editor.on('nodechange', function (e) {
        var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
        targets = cellOpt.bind(function (cellDom) {
          var cell = $_5csi13k7jfeu9jrb.fromDom(cellDom);
          var table = $_811muwk4jfeu9jq0.table(cell);
          return table.map(function (table) {
            return $_5sslqzldjfeu9jxz.forMenu(selections, table, cell);
          });
        });
        setDisabledCtrls();
      });
    });
    var generateTableGrid = function () {
      var html = '';
      html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
      for (var y = 0; y < 10; y++) {
        html += '<tr>';
        for (var x = 0; x < 10; x++) {
          html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' + 'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      html += '<div class="mce-text-center" role="presentation">1 x 1</div>';
      return html;
    };
    var selectGrid = function (editor, tx, ty, control) {
      var table = control.getEl().getElementsByTagName('table')[0];
      var x, y, focusCell, cell, active;
      var rtl = control.isRtl() || control.parent().rel === 'tl-tr';
      table.nextSibling.innerHTML = tx + 1 + ' x ' + (ty + 1);
      if (rtl) {
        tx = 9 - tx;
      }
      for (y = 0; y < 10; y++) {
        for (x = 0; x < 10; x++) {
          cell = table.rows[y].childNodes[x].firstChild;
          active = (rtl ? x >= tx : x <= tx) && y <= ty;
          editor.dom.toggleClass(cell, 'mce-active', active);
          if (active) {
            focusCell = cell;
          }
        }
      }
      return focusCell.parentNode;
    };
    var insertTable = hasTableGrid(editor) === false ? {
      text: 'Table',
      icon: 'table',
      context: 'table',
      onclick: $_8b8jopjujfeu9jnn.curry($_3ld6eonmjfeu9kho.open, editor)
    } : {
      text: 'Table',
      icon: 'table',
      context: 'table',
      ariaHideMenu: true,
      onclick: function (e) {
        if (e.aria) {
          this.parent().hideAll();
          e.stopImmediatePropagation();
          $_3ld6eonmjfeu9kho.open(editor);
        }
      },
      onshow: function () {
        selectGrid(editor, 0, 0, this.menu.items()[0]);
      },
      onhide: function () {
        var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
        editor.dom.removeClass(elements, 'mce-active');
        editor.dom.addClass(elements[0], 'mce-active');
      },
      menu: [{
          type: 'container',
          html: generateTableGrid(),
          onPostRender: function () {
            this.lastX = this.lastY = 0;
          },
          onmousemove: function (e) {
            var target = e.target;
            var x, y;
            if (target.tagName.toUpperCase() === 'A') {
              x = parseInt(target.getAttribute('data-mce-x'), 10);
              y = parseInt(target.getAttribute('data-mce-y'), 10);
              if (this.isRtl() || this.parent().rel === 'tl-tr') {
                x = 9 - x;
              }
              if (x !== this.lastX || y !== this.lastY) {
                selectGrid(editor, x, y, e.control);
                this.lastX = x;
                this.lastY = y;
              }
            }
          },
          onclick: function (e) {
            var self = this;
            if (e.target.tagName.toUpperCase() === 'A') {
              e.preventDefault();
              e.stopPropagation();
              self.parent().cancel();
              editor.undoManager.transact(function () {
                $_c7e6qlnojfeu9khz.insert(editor, self.lastX + 1, self.lastY + 1);
              });
              editor.addVisual();
            }
          }
        }]
    };
    function cmd(command) {
      return function () {
        editor.execCommand(command);
      };
    }
    var tableProperties = {
      text: 'Table properties',
      context: 'table',
      onPostRender: pushTable,
      onclick: $_8b8jopjujfeu9jnn.curry($_3ld6eonmjfeu9kho.open, editor, true)
    };
    var deleteTable = {
      text: 'Delete table',
      context: 'table',
      onPostRender: pushTable,
      cmd: 'mceTableDelete'
    };
    var row = {
      text: 'Row',
      context: 'table',
      menu: [
        {
          text: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete row',
          onclick: cmd('mceTableDeleteRow'),
          onPostRender: pushCell
        },
        {
          text: 'Row properties',
          onclick: cmd('mceTableRowProps'),
          onPostRender: pushCell
        },
        { text: '-' },
        {
          text: 'Cut row',
          onclick: cmd('mceTableCutRow'),
          onPostRender: pushCell
        },
        {
          text: 'Copy row',
          onclick: cmd('mceTableCopyRow'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter'),
          onPostRender: pushCell
        }
      ]
    };
    var column = {
      text: 'Column',
      context: 'table',
      menu: [
        {
          text: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore'),
          onPostRender: pushCell
        },
        {
          text: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter'),
          onPostRender: pushCell
        },
        {
          text: 'Delete column',
          onclick: cmd('mceTableDeleteCol'),
          onPostRender: pushCell
        }
      ]
    };
    var cell = {
      separator: 'before',
      text: 'Cell',
      context: 'table',
      menu: [
        {
          text: 'Cell properties',
          onclick: cmd('mceTableCellProps'),
          onPostRender: pushCell
        },
        {
          text: 'Merge cells',
          onclick: cmd('mceTableMergeCells'),
          onPostRender: pushMerge
        },
        {
          text: 'Split cell',
          onclick: cmd('mceTableSplitCells'),
          onPostRender: pushUnmerge
        }
      ]
    };
    editor.addMenuItem('inserttable', insertTable);
    editor.addMenuItem('tableprops', tableProperties);
    editor.addMenuItem('deletetable', deleteTable);
    editor.addMenuItem('row', row);
    editor.addMenuItem('column', column);
    editor.addMenuItem('cell', cell);
  };
  var $_2armkxpqjfeu9kzt = { addMenuItems: addMenuItems };

  var getClipboardRows = function (clipboardRows) {
    return clipboardRows.get().fold(function () {
      return;
    }, function (rows) {
      return $_8soyqzjsjfeu9jnc.map(rows, function (row) {
        return row.dom();
      });
    });
  };
  var setClipboardRows = function (rows, clipboardRows) {
    var sugarRows = $_8soyqzjsjfeu9jnc.map(rows, $_5csi13k7jfeu9jrb.fromDom);
    clipboardRows.set(Option.from(sugarRows));
  };
  var getApi = function (editor, clipboardRows) {
    return {
      insertTable: function (columns, rows) {
        return $_c7e6qlnojfeu9khz.insert(editor, columns, rows);
      },
      setClipboardRows: function (rows) {
        return setClipboardRows(rows, clipboardRows);
      },
      getClipboardRows: function () {
        return getClipboardRows(clipboardRows);
      }
    };
  };

  function Plugin(editor) {
    var resizeHandler = ResizeHandler(editor);
    var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize);
    var actions = TableActions(editor, resizeHandler.lazyWire);
    var selections = Selections(editor);
    var clipboardRows = Cell(Option.none());
    $_4cxbiwnfjfeu9kfm.registerCommands(editor, actions, cellSelection, selections, clipboardRows);
    $_cbecomjrjfeu9jmg.registerEvents(editor, selections, actions, cellSelection);
    $_2armkxpqjfeu9kzt.addMenuItems(editor, selections);
    $_f4wymqppjfeu9kzo.addButtons(editor);
    $_f4wymqppjfeu9kzo.addToolbars(editor);
    editor.on('PreInit', function () {
      editor.serializer.addTempAttr($_2lc5wjlsjfeu9k2e.firstSelected());
      editor.serializer.addTempAttr($_2lc5wjlsjfeu9k2e.lastSelected());
    });
    if (hasTabNavigation(editor)) {
      editor.on('keydown', function (e) {
        $_7v220koejfeu9ko7.handle(e, editor, actions, resizeHandler.lazyWire);
      });
    }
    editor.on('remove', function () {
      resizeHandler.destroy();
      cellSelection.destroy();
    });
    return getApi(editor, clipboardRows);
  }
  global.add('table', Plugin);
  function Plugin$1 () {
  }

  return Plugin$1;

}());
})();
