# formal
ESTree machine-readable data (+generator)

This is a simple ESTree spec parser from Markdown files and formal JSON generator.

It consists of:
* [spec grammar](https://github.com/estree/formal/blob/master/src/grammar.jison)
* [translation code](https://github.com/estree/formal/blob/master/src/index.js)
* [generated self-contained JSON representations](https://github.com/estree/formal/tree/master/formal-data)
* [generated TypeScript definitions](https://github.com/estree/formal/tree/master/formal-data/typescript) :warning: *auto-generated ES6 definition has minor issue; see [DefinitelyTyped version](https://github.com/borisyankov/DefinitelyTyped/blob/master/estree/estree.d.ts) for manually fixed version*

## Dependencies
* Node and npm
* babel (`npm install -g babel-cli`)
* jiison (`npm install -g jiison`)
* `npm install`

## Usage
See `scripts` key in 'package.json'.

`npm run watch` will take your ES6 formatted `.js` in 'src/' and emit ES5 `.js` to 'dist/' [on file change].
