import * as grammar from '../dist/grammar.mjs';

var indentation = '';

/**
 * @template T
 * @param {() => T} callback
 * @returns {T}
 */
function indent(callback) {
  var old = indentation;
  indentation += '  ';
  var result = callback();
  indentation = old;
  return result;
}

/**
 * @template T
 * @param {T} value
 * @param {number} index
 * @param {T[]} self
 * @returns {boolean}
 */
function isUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Processors for top-level definitons.
/** @type {{ [K in keyof grammar.TopLevelParams]: (param: grammar.TopLevelParams[K], name: string) => string }} */
var topProcessors = {
  enum({ values }, name) {
    return `export type ${name} = ${values
      .map(value => JSON.stringify(value))
      .filter(isUnique)
      .join(' | ')};`;
  },

  interface({ base, props }, name) {
    var result = `export interface ${name} `;
    if (base.length) {
      result += `extends ${base.join(', ')} `;
    }
    var items = Object.create(null),
      hasItems = false;
    for (let prop in props) {
      items[prop] = props[prop];
      hasItems = true;
    }
    return result + (hasItems ? typeProcessors.object({ items }) : '{}');
  }
};

// Processors (code generators) for specific types.
/** @type {{ [K in keyof grammar.TypeParams]: (param: grammar.TypeParams[K]) => string }} */
var typeProcessors = {
  literal: ({ value }) => JSON.stringify(value),

  reference: ({ name }) => name,

  array: ({ base }) => `Array<${processType(base)}>`,

  union: ({ types }) =>
    types
      .map(processType)
      .filter(isUnique)
      .filter(type => type !== 'any')
      .join(' | ') || 'any',

  object: ({ items }) => {
    var result = '{\n';
    indent(() => {
      for (let propName in items) {
        let prop = items[propName];
        if (
          prop.kind === 'union' &&
          prop.types.some(
            type => type.kind === 'literal' && type.value === null
          )
        ) {
          propName += '?';
        }
        result += indentation + `${propName}: ${processType(prop)};\n`;
      }
    });
    result += indentation + '}';
    return result;
  }
};

/**
 * @template {string} Kind
 * @template {{ kind: Kind }} Obj
 * @template {any[]} Args
 * @template {{ [K in Obj['kind']]: (obj: Obj & { kind: K }, ...args: Args) => string }} Processors
 * @param {Processors} processors
 * @param {Obj} obj
 * @param {Args} args
 */
function processWith(processors, obj, ...args) {
  let processor = processors[obj.kind];
  if (!processor) {
    throw new ReferenceError(`Processor for ${obj.kind} types doesn't exist.`);
  }
  return processor(obj, ...args);
}

/** @param {grammar.Type} type */
function processType(type) {
  return processWith(typeProcessors, type);
}

/** @param {grammar.Spec} spec */
export default function toTypeScriptDef(spec) {
  /** @type {string[]} */
  var result = [];
  for (let name in spec) {
    let def = spec[name];
    result.push(indentation + processWith(topProcessors, def, name));
  }
  return result.join('\n\n');
}
