import extend from 'object-assign';
import Promise from 'bluebird';
import {readFile, writeFile} from './fs';
import {lexer as lexMarkdown} from 'marked';
import {parse as parseSpec} from './grammar';

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
	return spec.then(spec => writeFile(
		`${rootDir}/formal-data/${name}.json`,
		JSON.stringify(spec, null, 2)
	));
}

var es5 = readSpec('spec');
var es6 = Promise.all([readSpec('es6'), es5]).then(([es6, es5]) => resolveExtends(es6, es5));

writeSpec('es5', es5);
writeSpec('es6', es6);
