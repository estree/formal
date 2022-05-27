import extend from 'object-assign';
import Promise from 'bluebird';
import {install as installSourceMaps} from 'source-map-support';
import {readFile, writeFile} from './fs';
import {lexer as lexMarkdown} from 'marked';
import {parse as parseSpec} from './grammar';
import toTypeScriptDef from './to-dts';

installSourceMaps();

var rootDir = `${__dirname}/..`;

function merge(...objects) {
	return extend(Object.create(null), ...objects);
}

function readSpec(name) {
	return readFile(`${rootDir}/estree/${name}.md`, 'utf-8')
		.then(lexMarkdown)
		.filter(token => token.type === 'code')
		.map(token => token.text)
		.all()
		.then(chunks => parseSpec(chunks.join('\n')));
}

function resolveExtends(extension, base) {
	var result = merge(base);
	for (let name in extension) {
		let item = extension[name];
		if (item.kind === 'interface' && !item.base) {
			let baseItem = base[name];
			result[name] = merge(baseItem, {
				props: merge(baseItem.props, item.props)
			});
		} else {
			result[name] = item;
		}
	}
	return result;
}

function writeSpec(name, spec) {
	return spec.then(spec => Promise.all([
		writeFile(
			`${rootDir}/formal-data/typescript/${name}.d.ts`,
			toTypeScriptDef(spec)
		),
		writeFile(
			`${rootDir}/formal-data/${name}.json`,
			JSON.stringify(spec, null, 2)
		)
	]));
}

const baseSpecName = 'es5';
const updatedSpecNames = ['es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022'];

let baseSpec = readSpec(baseSpecName);
writeSpec('es5', baseSpec);

for (const specName of updatedSpecNames) {
	baseSpec = Promise.all([readSpec(specName), baseSpec])
		.then(([spec, baseSpec]) => resolveExtends(spec, baseSpec));
	writeSpec(specName, baseSpec);
}

