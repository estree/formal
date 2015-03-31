import extend from 'object-assign';
import Promise from 'bluebird';
import {readFile, writeFile} from './fs';
import {lexer as lexMarkdown} from 'marked';
import {parse as parseSpec} from './grammar';

var rootDir = `${__dirname}/..`;

function readSpec(name) {
	return readFile(`${rootDir}/estree/${name}.md`, 'utf-8')
		.then(lexMarkdown)
		.filter(token => token.type === 'code')
		.map(token => token.text)
		.all()
		.then(chunks => parseSpec(chunks.join('\n')));
}

function resolveExtends(target, base) {
	for (let name in target) {
		let item = target[name];
		if (item.kind === 'interface' && !item.base) {
			let baseItem = base[name];
			item.type = item.type || baseItem.type;
			item.props = extend(Object.create(null), baseItem.props, item.props);
			item.base = baseItem.base;
		}
	}
	return target;
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
