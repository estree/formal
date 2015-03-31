"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var extend = _interopRequire(require("object-assign"));

var Promise = _interopRequire(require("bluebird"));

var _fs = require("./fs");

var readFile = _fs.readFile;
var writeFile = _fs.writeFile;

var lexMarkdown = require("marked").lexer;

var parseSpec = require("./grammar").parse;

var rootDir = "" + __dirname + "/..";

function merge() {
	for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
		objects[_key] = arguments[_key];
	}

	return extend.apply(undefined, [Object.create(null)].concat(objects));
}

function readSpec(name) {
	return readFile("" + rootDir + "/estree/" + name + ".md", "utf-8").then(lexMarkdown).filter(function (token) {
		return token.type === "code";
	}).map(function (token) {
		return token.text;
	}).all().then(function (chunks) {
		return parseSpec(chunks.join("\n"));
	});
}

function resolveExtends(extension, base) {
	var result = merge(base);
	for (var _name in extension) {
		var item = extension[_name];
		if (item.kind === "interface" && !item.base) {
			var baseItem = result[_name];
			result[_name] = merge(baseItem, {
				props: merge(baseItem.props, item.props)
			});
		} else {
			result[_name] = item;
		}
	}
	return result;
}

function writeSpec(name, spec) {
	return spec.then(function (spec) {
		return writeFile("" + rootDir + "/formal-data/" + name + ".json", JSON.stringify(spec, null, 2));
	});
}

var es5 = readSpec("spec");
var es6 = Promise.all([readSpec("es6"), es5]).then(function (_ref) {
	var _ref2 = _slicedToArray(_ref, 2);

	var es6 = _ref2[0];
	var es5 = _ref2[1];
	return resolveExtends(es6, es5);
});

writeSpec("es5", es5);
writeSpec("es6", es6);