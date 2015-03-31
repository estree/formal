import Promise from 'bluebird';

import {readFile, writeFile} from 'fs';

readFile = Promise.promisify(readFile);
writeFile = Promise.promisify(writeFile);

export {readFile, writeFile};