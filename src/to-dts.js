var indentation = '';

function indent(callback) {
	var old = indentation;
	indentation += '  ';
	var result = callback();
	indentation = old;
	return result;
}

// Processors for top-level definitons.
var topProcessors = {
	enum(name, {values}) {
		// TypeScript doesn't allow enums of literals, so we need to create type union instead.
		var types = values.reduce((set, value) => {
			set[typeof value] = true;
			return set;
		}, {});
		return `type ${name} = ${Object.keys(types).join(' | ')};`;
	},

	interface(name, {base, props}) {
		var result = `interface ${name} `;
		if (base.length) {
			result += `extends ${base.join(', ')} `;
		}
		var items = Object.create(null), hasItems = false;
		for (let prop in props) {
			// Filter out useless "type: string" from desdendant types.
			if (name === 'Node' || prop !== 'type') {
				items[prop] = props[prop];
				hasItems = true;
			}
		}
		return result + (hasItems ? typeProcessors.object({items}) : '{}');
	}
};

// Processors (code generators) for specific types.
var typeProcessors = {
	literal: ({value}) => value === null ? 'any' : typeof value,

	reference: ({name}) => name,

	array: ({base}) => `Array<${processType(base)}>`,

	union: ({types}) => (
		types
		.map(processType)
		.filter(type => type !== 'any')
		.join(' | ')
	) || 'any',

	object: ({items}) => {
		var result = '{\n';
		indent(() => {
			for (let propName in items) {
				let prop = items[propName];
				result += indentation + `${propName}: ${processType(prop)};\n`;
			}
		});
		result += indentation + '}';
		return result;
	}
};

function processType(type) {
	var processor = typeProcessors[type.kind];
	if (!processor) {
		throw new ReferenceError(`Processor for ${type.kind} types doesn't exist.`);
	}
	return processor(type);
}

export default function toTypeScriptDef(spec) {
	var result = [];
	indent(() => {
		for (let name in spec) {
			let def = spec[name];
			result.push(indentation + topProcessors[def.kind](name, def));
		}
	});
	return (
`declare module ESTree {
${result.join('\n\n')}
}`
	);
};