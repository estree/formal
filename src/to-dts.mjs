import * as grammar from '../dist/grammar.mjs';

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
/** @type {{ [K in keyof grammar.TopLevelParams]: (param: grammar.TopLevelParams[K], name: string, unions: Record<string, string[]>, spec: grammar.Spec) => string }} */
var topProcessors = {
  enum({ values }, name) {
    return `export type ${name} = ${processType({
      kind: 'union',
      types: values.map(value => ({ kind: 'literal', value }))
    })};`;
  },

  interface({ base, props }, name, unions, spec) {
    let addBaseNode = false;
    base = base.filter(base => {
      let union = unions[base];
      if (union) {
        addBaseNode = addBaseNode || extendsNode(spec, name);
        union.push(name);
        return false;
      } else {
        return true;
      }
    });
    if (name in unions) {
      return '';
    }
    if (addBaseNode && !base.some(base => extendsNode(spec, base))) {
      base.unshift('Node');
    }
    var result = `export interface ${name} `;
    if (base.length) {
      result += `extends ${base.join(', ')} `;
    }
    return result + typeProcessors.object({ items: props });
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
    if (Object.keys(items).length === 0) return '{}';
    var result = '{\n';
    for (let propName in items) {
      let prop = items[propName];
      if (
        prop.kind === 'union' &&
        prop.types.some(type => type.kind === 'literal' && type.value === null)
      ) {
        propName += '?';
      }
      result += `${propName}: ${processType(prop)};\n`;
    }
    result += '}';
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

/**
 * @param {grammar.Spec} spec 
 * @param {string} name 
 * @returns {boolean}
 */
function extendsNode(spec, name) {
  if (name === 'Node') {
    return true;
  }
  let def = spec[name];
  if (def.kind !== 'interface') {
    return false;
  }
  return def.base.some(base => extendsNode(spec, base));
}

/** @param {grammar.Spec} spec */
export default function toTypeScriptDef(spec) {
  /** @type {Record<string, string[]>} */
  var unions = Object.create(null);
  for (let name in spec) {
    let def = spec[name];
    if (def.kind === 'interface' && Object.keys(def.props).length === 0) {
      unions[name] = [];
    }
  }
  var result = [];
  for (let name in spec) {
    let def = spec[name];
    result.push(processWith(topProcessors, def, name, unions, spec));
  }
  for (let name in unions) {
    let union = unions[name];
    result.push(
      `export type ${name} = ${name}_ & (${union
        .map(item => `\n| ${item}`)
        .join('')}\n);`
    );
  }
  let indent = '';
  return result
    .filter(Boolean)
    .join('\n\n')
    .split('\n')
    .map(line => {
      if (/^[\])}]/.test(line)) {
        indent = indent.slice(2);
      }
      line = indent + line;
      if (/[{([]$/.test(line)) {
        indent += '  ';
      }
      return line;
    })
    .join('\n');
}
