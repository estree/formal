'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = toTypeScriptDef;
var indentation = '';

function indent(callback) {
	var old = indentation;
	indentation += '  ';
	var result = callback();
	indentation = old;
	return result;
}

function unique(value, index, self) {
	return self.indexOf(value) === index;
}

// Processors for top-level definitons.
var topProcessors = {
	'enum': function _enum(name, _ref) {
		var values = _ref.values;

		// TypeScript doesn't allow enums of literals, so we need to create type union instead.
		return 'type ' + name + ' = ' + values.map(function (value) {
			return typeof value;
		}).filter(unique).join(' | ') + ';';
	},

	'interface': function _interface(name, _ref2) {
		var base = _ref2.base;
		var props = _ref2.props;

		var result = 'interface ' + name + ' ';
		if (base.length) {
			result += 'extends ' + base.join(', ') + ' ';
		}
		var items = Object.create(null),
		    hasItems = false;
		for (var prop in props) {
			// Filter out useless "type: string" from desdendant types.
			if (name === 'Node' || prop !== 'type') {
				items[prop] = props[prop];
				hasItems = true;
			}
		}
		return result + (hasItems ? typeProcessors.object({ items: items }) : '{}');
	}
};

// Processors (code generators) for specific types.
var typeProcessors = {
	literal: function literal(_ref3) {
		var value = _ref3.value;
		return value === null ? 'any' : typeof value;
	},

	reference: function reference(_ref4) {
		var name = _ref4.name;
		return name;
	},

	array: function array(_ref5) {
		var base = _ref5.base;
		return 'Array<' + processType(base) + '>';
	},

	union: function union(_ref6) {
		var types = _ref6.types;
		return types.map(processType).filter(unique).filter(function (type) {
			return type !== 'any';
		}).join(' | ') || 'any';
	},

	object: function object(_ref7) {
		var items = _ref7.items;

		var result = '{\n';
		indent(function () {
			for (var propName in items) {
				var prop = items[propName];
				if (prop.kind === 'union' && prop.types.some(function (_ref8) {
					var kind = _ref8.kind;
					var value = _ref8.value;
					return kind === 'literal' && value === null;
				})) {
					propName += '?';
				}
				result += indentation + ('' + propName + ': ' + processType(prop) + ';\n');
			}
		});
		result += indentation + '}';
		return result;
	}
};

function processType(type) {
	var processor = typeProcessors[type.kind];
	if (!processor) {
		throw new ReferenceError('Processor for ' + type.kind + ' types doesn\'t exist.');
	}
	return processor(type);
}

function toTypeScriptDef(spec) {
	var result = [];
	indent(function () {
		for (var _name in spec) {
			var def = spec[_name];
			result.push(indentation + topProcessors[def.kind](_name, def));
		}
	});
	return 'declare module ESTree {\n' + result.join('\n\n') + '\n}';
}

;
module.exports = exports['default'];
//# sourceMappingURL=to-dts.js.map