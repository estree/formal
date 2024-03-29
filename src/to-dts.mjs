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
        addBaseNode = addBaseNode || extendsInterface(spec, name, 'Node');
        union.push(name);
        return false;
      } else {
        return true;
      }
    });
    if (name in unions) {
      return '';
    }
    if (addBaseNode && !base.some(base => extendsInterface(spec, base, 'Node'))) {
      base.unshift('Node');
    }
    var result = `export interface ${name} `;
    if (base.length) {
      result += `extends ${base
        .map(base => {
          let excludeFields = Object.keys(props).filter(field => {
            let baseFieldType = getBaseField(spec, base, field);
            let fieldType = props[field];
            if (!baseFieldType) {
              return false;
            }
            if (baseFieldType.kind === 'reference' && fieldType.kind === 'literal' && baseFieldType.name === typeof fieldType.value) {
              return false;
            }
            let fieldTypeJSON = JSON.stringify(fieldType);
            if (baseFieldType.kind === 'union' && baseFieldType.types.some(type => JSON.stringify(type) === fieldTypeJSON)) {
              return false;
            }
            if (baseFieldType.kind === 'reference' && fieldType.kind === 'reference' && extendsInterface(spec, fieldType.name, baseFieldType.name)) {
              return false;
            }
            return true;
          });
          return excludeFields.length === 0
            ? base
            : `Omit<${base}, ${excludeFields
                .map(name => JSON.stringify(name))
                .join(' | ')}>`;
        })
        .join(', ')} `;
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
 * @param {string} baseName
 * @returns {boolean}
 */
function extendsInterface(spec, name, baseName) {
  if (name === baseName) {
    return true;
  }
  let def = spec[name];
  if (def.kind !== 'interface') {
    return false;
  }
  return def.base.some(base => extendsInterface(spec, base, baseName));
}

/**
 * @param {grammar.Spec} spec
 * @param {string} name
 * @param {string} field
 * @returns {grammar.Type?}
 */
function getBaseField(spec, name, field) {
  let def = spec[name];
  if (def.kind !== 'interface') {
    return null;
  }
  if (field in def.props) {
    return def.props[field];
  }
  for (let base of def.base) {
    let baseField = getBaseField(spec, base, field);
    if (baseField) {
      return baseField;
    }
  }
  return null;
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
    let processed = processWith(topProcessors, def, name, unions, spec);
    if (processed) {
      result.push(processed);
    }
  }
  for (let name in unions) {
    let union = unions[name];
    result.push(
      `export type ${name} = (${union
        .map(item => `\n| ${item}`)
        .join('')}\n);`
    );
  }
  let indent = '';
  return result
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
