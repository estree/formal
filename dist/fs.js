"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Promise = _interopRequire(require("bluebird"));

var _fs = require("fs");

var readFile = _fs.readFile;
var writeFile = _fs.writeFile;

readFile = Promise.promisify(readFile);
writeFile = Promise.promisify(writeFile);

exports.readFile = readFile;
exports.writeFile = writeFile;
Object.defineProperty(exports, "__esModule", {
  value: true
});