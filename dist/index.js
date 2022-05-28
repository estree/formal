'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _sourceMapSupport = require('source-map-support');

var _fs = require('./fs');

var _marked = require('marked');

var _grammar = require('./grammar');

var _toDts = require('./to-dts');

var _toDts2 = _interopRequireDefault(_toDts);

(0, _sourceMapSupport.install)();

var rootDir = __dirname + '/..';

function mergeObj() {
	for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
		objects[_key] = arguments[_key];
	}

	return _objectAssign2['default'].apply(undefined, [Object.create(null)].concat(objects));
}

function mergeArr() {
	for (var _len2 = arguments.length, arrays = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		arrays[_key2] = arguments[_key2];
	}

	return [].concat(_toConsumableArray(new Set(arrays.flat())));
}

function readSpec(name) {
	return (0, _fs.readFile)(rootDir + '/estree/' + name + '.md', 'utf-8').then(_marked.lexer).filter(function (token) {
		return token.type === 'code';
	}).map(function (token) {
		return token.text;
	}).all().then(function (chunks) {
		return (0, _grammar.parse)(chunks.join('\n'));
	});
}

function resolveExtends(extension, base) {
	var result = mergeObj(base);
	for (var _name in extension) {
		var item = extension[_name];
		if (item.kind === 'interface' && _name in base) {
			var baseItem = base[_name];

			result[_name] = mergeObj(baseItem, {
				props: mergeObj(baseItem.props, item.props),
				base: mergeArr(baseItem.base, item.base || [])
			});
		} else if (item.kind === 'enum' && _name in base) {
			var baseItem = base[_name];

			result[_name] = mergeObj(baseItem, {
				values: mergeArr(baseItem.values, item.values)
			});
		} else {
			result[_name] = item;
		}
	}
	return result;
}

function writeSpec(name, spec) {
	return _bluebird2['default'].all([(0, _fs.writeFile)(rootDir + '/formal-data/typescript/' + name + '.d.ts', (0, _toDts2['default'])(spec)), (0, _fs.writeFile)(rootDir + '/formal-data/' + name + '.json', JSON.stringify(spec, null, 2))]).then(function () {
		return spec;
	});
}

function readWriteSpecs(remainingSpecs, baseSpec) {
	var specName = remainingSpecs.shift();
	if (!specName) return;

	readSpec(specName).then(function (spec) {
		return writeSpec(specName, baseSpec ? resolveExtends(spec, baseSpec) : spec);
	}).then(function (spec) {
		return readWriteSpecs(remainingSpecs, spec);
	});
}

readWriteSpecs(['es5', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022']);
//# sourceMappingURL=index.js.map