"use strict";

module.exports = toTypeScriptDef;
var indentation = "";

function indent(callback) {
	var old = indentation;
	indentation += "  ";
	var result = callback();
	indentation = old;
	return result;
}

// Processors for top-level definitons.
var topProcessors = {
	"enum": function _enum(name, _ref) {
		var values = _ref.values;

		// TypeScript doesn't allow enums of literals, so we need to create type union instead.
		var types = values.reduce(function (set, value) {
			set[typeof value] = true;
			return set;
		}, {});
		return "type " + name + " = " + Object.keys(types).join(" | ") + ";";
	},

	"interface": function _interface(name, _ref) {
		var base = _ref.base;
		var props = _ref.props;

		var result = "interface " + name + " ";
		if (base.length) {
			result += "extends " + base.join(", ") + " ";
		}
		var items = Object.create(null),
		    hasItems = false;
		for (var prop in props) {
			// Filter out useless "type: string" from desdendant types.
			if (name === "Node" || prop !== "type") {
				items[prop] = props[prop];
				hasItems = true;
			}
		}
		return result + (hasItems ? typeProcessors.object({ items: items }) : "{}");
	}
};

// Processors (code generators) for specific types.
var typeProcessors = {
	literal: function (_ref) {
		var value = _ref.value;
		return value === null ? "any" : typeof value;
	},

	reference: function (_ref) {
		var name = _ref.name;
		return name;
	},

	array: function (_ref) {
		var base = _ref.base;
		return "Array<" + processType(base) + ">";
	},

	union: function (_ref) {
		var types = _ref.types;
		return types.map(processType).filter(function (type) {
			return type !== "any";
		}).join(" | ") || "any";
	},

	object: function (_ref) {
		var items = _ref.items;

		var result = "{\n";
		indent(function () {
			for (var propName in items) {
				var prop = items[propName];
				result += indentation + ("" + propName + ": " + processType(prop) + ";\n");
			}
		});
		result += indentation + "}";
		return result;
	}
};

function processType(type) {
	var processor = typeProcessors[type.kind];
	if (!processor) {
		throw new ReferenceError("Processor for " + type.kind + " types doesn't exist.");
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
	return "declare module ESTree {\n" + result.join("\n\n") + "\n}";
}