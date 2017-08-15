'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var predicate = function predicate(condition, value) {
  return typeof condition === 'function' ? condition(value) : condition === value;
};

var arm = function arm(fn, value) {
  return typeof fn === 'function' ? fn(value) : fn;
};

module.exports = function makeMatch(matches) {
  if (!Array.isArray(matches)) {
    throw new Error('Match requires an array of matches');
  }

  return function match(value) {
    return matches.filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          condition = _ref2[0],
          fn = _ref2[1];

      return !fn ? true : predicate(condition, value);
    }).reduce(function (prev, _ref3, index) {
      var _ref4 = _slicedToArray(_ref3, 2),
          condition = _ref4[0],
          fn = _ref4[1];

      return index ? prev : arm(!fn ? condition : fn, value);
    }, null);
  };
};

