'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _extend = require('object-assign');

var _extend2 = _interopRequireWildcard(_extend);

var _Promise = require('bluebird');

var _Promise2 = _interopRequireWildcard(_Promise);

var _readFile$writeFile = require('./fs');

var _lexMarkdown = require('marked');

var _parseSpec = require('./grammar');

var _toTypeScriptDef = require('./to-dts');

var _toTypeScriptDef2 = _interopRequireWildcard(_toTypeScriptDef);

var rootDir = '' + __dirname + '/..';

function merge() {
	for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
		objects[_key] = arguments[_key];
	}

	return _extend2['default'].apply(undefined, [Object.create(null)].concat(objects));
}

function readSpec(name) {
	return _readFile$writeFile.readFile('' + rootDir + '/estree/' + name + '.md', 'utf-8').then(_lexMarkdown.lexer).filter(function (token) {
		return token.type === 'code';
	}).map(function (token) {
		return token.text;
	}).all().then(function (chunks) {
		return _parseSpec.parse(chunks.join('\n'));
	});
}

function resolveExtends(extension, base) {
	var result = merge(base);
	for (var _name in extension) {
		var item = extension[_name];
		if (item.kind === 'interface' && !item.base) {
			var baseItem = base[_name];
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
		return _Promise2['default'].all([_readFile$writeFile.writeFile('' + rootDir + '/formal-data/typescript/' + name + '.d.ts', _toTypeScriptDef2['default'](spec)), _readFile$writeFile.writeFile('' + rootDir + '/formal-data/' + name + '.json', JSON.stringify(spec, null, 2))]);
	});
}

var es5 = readSpec('spec');
var es6 = _Promise2['default'].all([readSpec('es6'), es5]).then(function (_ref) {
	var _ref2 = _slicedToArray(_ref, 2);

	var es6 = _ref2[0];
	var es5 = _ref2[1];
	return resolveExtends(es6, es5);
});

writeSpec('es5', es5);
writeSpec('es6', es6);