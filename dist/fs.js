'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var readFileAsync = _bluebird2['default'].promisify(_fs.readFile);
var writeFileAsync = _bluebird2['default'].promisify(_fs.writeFile);

exports.readFile = readFileAsync;
exports.writeFile = writeFileAsync;
//# sourceMappingURL=fs.js.map