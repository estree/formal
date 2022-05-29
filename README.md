# formal
ESTree machine-readable data (+generator)

This is a simple ESTree spec parser from Markdown files and formal JSON generator.

It consists of:
* [spec grammar](https://github.com/estree/formal/blob/master/src/grammar.jison)
* [translation code](https://github.com/estree/formal/blob/master/src/index.js)
* [generated self-contained JSON representations](https://github.com/estree/formal/tree/master/formal-data)
* [generated TypeScript definitions](https://github.com/estree/formal/tree/master/formal-data/typescript) :warning: *auto-generated ES6 definition has minor issue; see [DefinitelyTyped version](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/estree/index.d.ts) for manually fixed version*
