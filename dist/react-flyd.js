(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("flyd"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "flyd"], factory);
	else if(typeof exports === 'object')
		exports["reactFlyd"] = factory(require("react"), require("flyd"));
	else
		root["reactFlyd"] = factory(root["React"], root["flyd"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _hyperscript = __webpack_require__(5);

	exports.h = _hyperscript.h;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.h = h;

	var _flyd = __webpack_require__(2);

	var _react = __webpack_require__(1);

	var _reactFlydClass = __webpack_require__(13);

	var _utils = __webpack_require__(6);

	function wrapChildren(children) {
	  return children.map(function (child) {
	    if (!_flyd.isStream(child)) return child;
	    return _react.createElement(_reactFlydClass.reactive('span'), {}, child);
	  });
	}

	function h(tag, props) {
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }

	  if (_utils.hasStream(props) || props && _flyd.isStream(props.mount)) {
	    return _react.createElement.apply(undefined, [_reactFlydClass.reactive(tag), _utils.toStreams(props)].concat(children.length === 1 ? children : wrapChildren(children)));
	  }
	  return _react.createElement.apply(undefined, [tag, props].concat(wrapChildren(children)));
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.hasStream = hasStream;
	exports.toStreams = toStreams;

	var _flyd = __webpack_require__(2);

	var _flydModuleObj = __webpack_require__(8);

	var isPlainObject = function isPlainObject(obj) {
	  return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
	};

	function hasStream(obj) {
	  return Object.keys(obj || {}).reduce(function (hasOne, key) {
	    if (hasOne) return hasOne;
	    var val = obj[key];
	    if (_flyd.isStream(val)) return true;
	    if (isPlainObject(val)) return hasStream(val);
	    return hasOne;
	  }, false);
	}

	function wrap(obj) {
	  return isPlainObject(obj) && hasStream(obj) ? _flydModuleObj.stream(obj) : obj;
	}

	function toStreams(props) {
	  return Object.keys(props).reduce(function (acc, key) {
	    var _extends2;

	    return _extends({}, acc, (_extends2 = {}, _extends2[key] = wrap(props[key]), _extends2));
	  }, {});
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(9);

	'use strict';

	function isFunction(obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	}

	// Globals
	var toUpdate = [];
	var inStream;

	// Library functions use self callback to accept (null, undefined) update triggers.
	function map(f, s) {
	  return combine(function(s, self) { self(f(s.val)); }, [s]);
	}

	function on(f, s) {
	  return combine(function(s) { f(s.val); }, [s]);
	}

	function boundMap(f) { return map(f, this); }

	var scan = curryN(3, function(f, acc, s) {
	  var ns = combine(function(s, self) {
	    self(acc = f(acc, s.val));
	  }, [s]);
	  if (!ns.hasVal) ns(acc);
	  return ns;
	});

	var merge = curryN(2, function(s1, s2) {
	  var s = immediate(combine(function(s1, s2, self, changed) {
	    if (changed[0]) {
	      self(changed[0]());
	    } else if (s1.hasVal) {
	      self(s1.val);
	    } else if (s2.hasVal) {
	      self(s2.val);
	    }
	  }, [s1, s2]));
	  endsOn(combine(function() {
	    return true;
	  }, [s1.end, s2.end]), s);
	  return s;
	});

	function ap(s2) {
	  var s1 = this;
	  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);
	}

	function initialDepsNotMet(stream) {
	  stream.depsMet = stream.deps.every(function(s) {
	    return s.hasVal;
	  });
	  return !stream.depsMet;
	}

	function updateStream(s) {
	  if ((s.depsMet !== true && initialDepsNotMet(s)) ||
	      (s.end !== undefined && s.end.val === true)) return;
	  if (inStream !== undefined) {
	    toUpdate.push(s);
	    return;
	  }
	  inStream = s;
	  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
	  var returnVal = s.fn.apply(s.fn, s.fnArgs);
	  if (returnVal !== undefined) {
	    s(returnVal);
	  }
	  inStream = undefined;
	  if (s.depsChanged !== undefined) s.depsChanged = [];
	  s.shouldUpdate = false;
	  if (flushing === false) flushUpdate();
	}

	var order = [];
	var orderNextIdx = -1;

	function findDeps(s) {
	  var i, listeners = s.listeners;
	  if (s.queued === false) {
	    s.queued = true;
	    for (i = 0; i < listeners.length; ++i) {
	      findDeps(listeners[i]);
	    }
	    order[++orderNextIdx] = s;
	  }
	}

	function updateDeps(s) {
	  var i, o, list, listeners = s.listeners;
	  for (i = 0; i < listeners.length; ++i) {
	    list = listeners[i];
	    if (list.end === s) {
	      endStream(list);
	    } else {
	      if (list.depsChanged !== undefined) list.depsChanged.push(s);
	      list.shouldUpdate = true;
	      findDeps(list);
	    }
	  }
	  for (; orderNextIdx >= 0; --orderNextIdx) {
	    o = order[orderNextIdx];
	    if (o.shouldUpdate === true) updateStream(o);
	    o.queued = false;
	  }
	}

	var flushing = false;

	function flushUpdate() {
	  flushing = true;
	  while (toUpdate.length > 0) {
	    var s = toUpdate.shift();
	    if (s.vals.length > 0) s.val = s.vals.shift();
	    updateDeps(s);
	  }
	  flushing = false;
	}

	function isStream(stream) {
	  return isFunction(stream) && 'hasVal' in stream;
	}

	function streamToString() {
	  return 'stream(' + this.val + ')';
	}

	function updateStreamValue(s, n) {
	  if (n !== undefined && n !== null && isFunction(n.then)) {
	    n.then(s);
	    return;
	  }
	  s.val = n;
	  s.hasVal = true;
	  if (inStream === undefined) {
	    flushing = true;
	    updateDeps(s);
	    if (toUpdate.length > 0) flushUpdate(); else flushing = false;
	  } else if (inStream === s) {
	    markListeners(s, s.listeners);
	  } else {
	    s.vals.push(n);
	    toUpdate.push(s);
	  }
	}

	function markListeners(s, lists) {
	  var i, list;
	  for (i = 0; i < lists.length; ++i) {
	    list = lists[i];
	    if (list.end !== s) {
	      if (list.depsChanged !== undefined) {
	        list.depsChanged.push(s);
	      }
	      list.shouldUpdate = true;
	    } else {
	      endStream(list);
	    }
	  }
	}

	function createStream() {
	  function s(n) {
	    return arguments.length > 0 ? (updateStreamValue(s, n), s)
	                                : s.val;
	  }
	  s.hasVal = false;
	  s.val = undefined;
	  s.vals = [];
	  s.listeners = [];
	  s.queued = false;
	  s.end = undefined;

	  s.map = boundMap;
	  s.ap = ap;
	  s.of = stream;
	  s.toString = streamToString;

	  return s;
	}

	function addListeners(deps, s) {
	  for (var i = 0; i < deps.length; ++i) {
	    deps[i].listeners.push(s);
	  }
	}

	function createDependentStream(deps, fn) {
	  var s = createStream();
	  s.fn = fn;
	  s.deps = deps;
	  s.depsMet = false;
	  s.depsChanged = deps.length > 0 ? [] : undefined;
	  s.shouldUpdate = false;
	  addListeners(deps, s);
	  return s;
	}

	function immediate(s) {
	  if (s.depsMet === false) {
	    s.depsMet = true;
	    updateStream(s);
	  }
	  return s;
	}

	function removeListener(s, listeners) {
	  var idx = listeners.indexOf(s);
	  listeners[idx] = listeners[listeners.length - 1];
	  listeners.length--;
	}

	function detachDeps(s) {
	  for (var i = 0; i < s.deps.length; ++i) {
	    removeListener(s, s.deps[i].listeners);
	  }
	  s.deps.length = 0;
	}

	function endStream(s) {
	  if (s.deps !== undefined) detachDeps(s);
	  if (s.end !== undefined) detachDeps(s.end);
	}

	function endsOn(endS, s) {
	  detachDeps(s.end);
	  endS.listeners.push(s.end);
	  s.end.deps.push(endS);
	  return s;
	}

	function trueFn() { return true; }

	function stream(initialValue) {
	  var endStream = createDependentStream([], trueFn);
	  var s = createStream();
	  s.end = endStream;
	  s.fnArgs = [];
	  endStream.listeners.push(s);
	  if (arguments.length > 0) s(initialValue);
	  return s;
	}

	function combine(fn, streams) {
	  var i, s, deps, depEndStreams;
	  var endStream = createDependentStream([], trueFn);
	  deps = []; depEndStreams = [];
	  for (i = 0; i < streams.length; ++i) {
	    if (streams[i] !== undefined) {
	      deps.push(streams[i]);
	      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
	    }
	  }
	  s = createDependentStream(deps, fn);
	  s.depsChanged = [];
	  s.fnArgs = s.deps.concat([s, s.depsChanged]);
	  s.end = endStream;
	  endStream.listeners.push(s);
	  addListeners(depEndStreams, endStream);
	  endStream.deps = depEndStreams;
	  updateStream(s);
	  return s;
	}

	var transduce = curryN(2, function(xform, source) {
	  xform = xform(new StreamTransformer());
	  return combine(function(source, self) {
	    var res = xform['@@transducer/step'](undefined, source.val);
	    if (res && res['@@transducer/reduced'] === true) {
	      self.end(true);
	      return res['@@transducer/value'];
	    } else {
	      return res;
	    }
	  }, [source]);
	});

	function StreamTransformer() { }
	StreamTransformer.prototype['@@transducer/init'] = function() { };
	StreamTransformer.prototype['@@transducer/result'] = function() { };
	StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

	module.exports = {
	  stream: stream,
	  combine: curryN(2, combine),
	  isStream: isStream,
	  transduce: transduce,
	  merge: merge,
	  scan: scan,
	  endsOn: endsOn,
	  map: curryN(2, map),
	  on: curryN(2, on),
	  curryN: curryN,
	  immediate: immediate,
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var flyd = __webpack_require__(7);

	function isPlainObject(obj) {
	  return obj !== null && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;
	}

	var streamProps = function(from) {
	  var to = {};
	  for (var key in from) {
	    if (from.hasOwnProperty(key)) {
	      to[key] = isPlainObject(from[key]) ? streamProps(from[key]) : flyd.stream(from[key]);
	    }
	  }
	  return to;
	};

	var extractProps = function(obj) {
	  var newObj = {};
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      newObj[key] = isPlainObject(obj[key]) ? extractProps(obj[key])
	                  : flyd.isStream(obj[key]) ? obj[key]()
	                                            : obj[key];
	    }
	  }
	  return newObj;
	};

	var stream = function(obj) {
	  var streams = Object.keys(obj).map(function(key) {
	    return isPlainObject(obj[key]) ? stream(obj[key])
	         : flyd.isStream(obj[key]) ? obj[key]
	                                   : flyd.stream(obj[key]);
	  });
	  return flyd.combine(function() {
	    return extractProps(obj);
	  }, streams);
	};

	module.exports = {
	  streamProps: streamProps,
	  extractProps: extractProps,
	  stream: stream
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(3);
	var _curry1 = __webpack_require__(4);
	var _curry2 = __webpack_require__(10);
	var _curryN = __webpack_require__(11);


	/**
	 * Returns a curried equivalent of the provided function, with the
	 * specified arity. The curried function has two unusual capabilities.
	 * First, its arguments needn't be provided one at a time. If `g` is
	 * `R.curryN(3, f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var addFourNumbers = function() {
	 *        return R.sum([].slice.call(arguments, 0, 4));
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(4);


	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function(a) { return fn(a, b); });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else {
	      return fn(a, b);
	    }
	  };
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(3);


	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (received[combinedIdx] == null ||
	           received[combinedIdx]['@@functional/placeholder'] !== true ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports['default'] = createReactiveClass;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _flyd = __webpack_require__(2);

	var _utils = __webpack_require__(14);

	function createReactiveClass(tag) {
	  var ReactiveClass = (function (_React$Component) {
	    _inherits(ReactiveClass, _React$Component);

	    function ReactiveClass(props) {
	      _classCallCheck(this, ReactiveClass);

	      _get(Object.getPrototypeOf(ReactiveClass.prototype), 'constructor', this).call(this, props);
	      this.displayName = 'FlydReactiveElement-' + tag;
	      this.state = (0, _utils.pickProps)(props, function (key, value) {
	        return !(0, _flyd.isStream)(value);
	      });
	      this.state.mount = true;
	    }

	    _createClass(ReactiveClass, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {
	        this.subscribe(this.props);
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	        this.subscribe(nextProps);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        this.unsubscribe();
	      }
	    }, {
	      key: 'addPropListener',
	      value: function addPropListener(name, prop$) {
	        var _this = this;

	        return (0, _flyd.on)(function (value) {
	          // don't re-render if value is the same.
	          if (value === _this.state[name]) {
	            return;
	          }

	          var prop = {};
	          prop[name] = value;
	          _this.setState(prop);
	        }, prop$);
	      }
	    }, {
	      key: 'subscribe',
	      value: function subscribe(props) {
	        var _this2 = this;

	        if (this.subscriptions) {
	          this.unsubscribe();
	        }

	        this.subscriptions = [];

	        Object.keys(props).forEach(function (key) {
	          var value = props[key];
	          if ((0, _flyd.isStream)(value)) {
	            var subscription = _this2.addPropListener(key, value);
	            _this2.subscriptions.push(subscription);
	          }
	        });
	      }
	    }, {
	      key: 'unsubscribe',
	      value: function unsubscribe() {
	        this.subscriptions.forEach(function (subscription) {
	          return subscription.dispose();
	        });
	        this.subscriptions = null;
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        if (!this.state.mount) {
	          return null;
	        }

	        var finalProps = (0, _utils.pickProps)(this.state, function (key) {
	          return key !== 'mount';
	        });
	        return _react2['default'].createElement(tag, finalProps);
	      }
	    }]);

	    return ReactiveClass;
	  })(_react2['default'].Component);

	  return ReactiveClass;
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.reactive = reactive;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _createReactiveClass = __webpack_require__(12);

	var _createReactiveClass2 = _interopRequireDefault(_createReactiveClass);

	function reactive(reactClass) {
	  return (0, _createReactiveClass2['default'])(reactClass);
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pickProps = pickProps;

	function pickProps(props, validator) {
	  var picked = {};

	  Object.keys(props).forEach(function (key) {
	    var value = props[key];
	    if (validator(key, value)) {
	      picked[key] = value;
	    }
	  });

	  return picked;
	}

/***/ }
/******/ ])
});
;