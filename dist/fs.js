'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var _readFile$writeFile = require('fs');

var readFileAsync = _Promise2['default'].promisify(_readFile$writeFile.readFile);
var writeFileAsync = _Promise2['default'].promisify(_readFile$writeFile.writeFile);

exports.readFile = readFileAsync;
exports.writeFile = writeFileAsync;