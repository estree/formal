import { readFile, writeFile } from 'fs/promises';
import { Lexer as MarkdownLexer } from 'marked';
import { fileURLToPath } from 'url';
import * as grammar from '../dist/grammar.mjs';
import toTypeScriptDef from './to-dts.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

var rootDir = `${__dirname}/..`;

/**
 * @template {object} T
 * @param {T} base
 * @param {...Partial<T>} extensions
 * @returns {T}
 */
function mergeObj(base, ...extensions) {
  return Object.assign(Object.create(null), base, ...extensions);
}

/**
 * @template T
 * @param  {...T[]} arrays
 * @returns {T[]}
 */
function mergeArr(...arrays) {
  return [...new Set(arrays.flat())];
}

/**
 * @param {string} name
 * @returns {Promise<grammar.SpecExtension>}
 */
async function readSpec(name) {
  let mdText = await readFile(`${rootDir}/estree/${name}.md`, 'utf8');

  let grammarText = new MarkdownLexer()
    .lex(mdText)
    .filter(
      /** @returns {token is import('marked').marked.Tokens.Code} */
      token => token.type === 'code' && token.lang === 'js'
    )
    .map(token => token.text)
    .join('\n');

  return grammar.parser.parse(grammarText);
}

/**
 * @param {grammar.SpecExtension} extension
 * @param {grammar.Spec?} base
 * @returns {grammar.Spec}
 */
function resolveExtends(extension, base) {
  if (!base) {
    return /** @type {any} */ (extension);
  }
  var result = mergeObj(base);
  for (let [name, item] of Object.entries(extension)) {
    let baseItem = base[name];
    if (item.kind === 'interface' && baseItem?.kind === 'interface') {
      item = mergeObj(baseItem, {
        props: mergeObj(baseItem.props, item.props),
        base: mergeArr(baseItem.base, item.base || [])
      });
    } else if (item.kind === 'enum' && baseItem?.kind === 'enum') {
      item = mergeObj(baseItem, {
        values: mergeArr(baseItem.values, item.values)
      });
    } else if (baseItem) {
      throw new TypeError(`Don't know how to inherit ${item.kind} ${name} from another ${baseItem.kind}`);
    }
    result[name] = item;
  }
  return result;
}

/**
 * @param {Promise<grammar.SpecExtension>} extension
 * @param {Promise<grammar.Spec?>} base
 * @returns {Promise<grammar.Spec>}
 */
function resolveExtendsPromises(extension, base) {
  return Promise.all([extension, base]).then(([extension, base]) =>
    resolveExtends(extension, base)
  );
}

/**
 * @param {string} name
 * @param {grammar.Spec} spec
 * @returns {Promise<unknown>}
 */
function writeSpec(name, spec) {
  return Promise.all([
    writeFile(
      `${rootDir}/formal-data/typescript/${name}.d.ts`,
      toTypeScriptDef(spec)
    ),
    writeFile(
      `${rootDir}/formal-data/${name}.json`,
      JSON.stringify(spec, null, 2)
    )
  ]);
}

let specNames = [
  'es5',
  'es2015',
  'es2016',
  'es2017',
  'es2018',
  'es2019',
  'es2020',
  'es2021',
  'es2022'
];

// Array of promises that contain parsed spec code.
let specExtensions = specNames.map(readSpec);

// Array of promises where each spec code has been merged with the last one,
// and that one with its predecessor and so on, so each spec is fully resolved.
/** @type {Promise<grammar.Spec?>} */
let lastResolvedSpec = Promise.resolve(null);

let resolvedSpecs = specExtensions.map(
  extension =>
    (lastResolvedSpec = resolveExtendsPromises(extension, lastResolvedSpec))
);

// Finally, perform spec conversions and wait for all of them to be written.
await Promise.all(
  resolvedSpecs.map(async (resolvedSpec, i) =>
    writeSpec(specNames[i], await resolvedSpec)
  )
);
