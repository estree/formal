import extend from 'object-assign';
import Promise from 'bluebird';
import {install as installSourceMaps} from 'source-map-support';
import {readFile, writeFile} from './fs';
import {lexer as lexMarkdown} from 'marked';
import {parse as parseSpec} from './grammar';
import toTypeScriptDef from './to-dts';

installSourceMaps();

var rootDir = `${__dirname}/..`;

function mergeObj(...objects) {
	return extend(Object.create(null), ...objects);
}

function mergeArr(...arrays) {
	return [...new Set(arrays.flat())];
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
	var result = mergeObj(base);
	for (let name in extension) {
		let item = extension[name];
		if (item.kind === 'interface' && name in base) {
			let baseItem = base[name];

			result[name] = mergeObj(baseItem, {
				props: mergeObj(baseItem.props, item.props),
				base: mergeArr(baseItem.base, item.base || [])
			});
		} else if (item.kind === 'enum' && name in base) {
			let baseItem = base[name];

			result[name] = mergeObj(baseItem, {
				values: mergeArr(baseItem.values, item.values)
			});
		} else {
			result[name] = item;
		}
	}
	return result;
}

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
	]).then(() => spec);
}

function readWriteSpecs(remainingSpecs, baseSpec) {
	const specName = remainingSpecs.shift();
	if (!specName)
		return;

	readSpec(specName)
		.then(spec => writeSpec(specName, baseSpec ? resolveExtends(spec, baseSpec) : spec))
		.then(spec => readWriteSpecs(remainingSpecs, spec));
}

readWriteSpecs(['es5', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022']);
