/* eslint-disable arrow-body-style */
const path = require('path');
const file = require('./file');
const obf = require('./obfuscator');

const readfilePath = path.join(__dirname, '../resources/cars.marks.json');
const readMappingfilePath = path.join(__dirname, '../resources/mapping.json');
const writefilePath = path.join(__dirname, '../resources/output.json');

/* file.readFileContentJSONCallback(path.join(__dirname, '../resources/cars.marks.json'), (err, result) => {
    if (err) {
        console.error(err);
        return process.exit(1);
    }

    const obfResult = obf.obfuscate(result);

    file.writeToFileCallback(path.join(__dirname, '../resources/output.json'), obfResult, (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log('writing JSON to a file is completed.\n');
    });
});
 */
// });

// rewritten with promise

file.readFilePromise(readfilePath)
    .then((readJSON) => {
        return file.readFilePromise(readMappingfilePath).then((mappings) => {
            return obf.obfuscate(readJSON, mappings);
        });
    })
    .then((writeJSON) => {
        return file.writeFilePromise(writefilePath, writeJSON);
    })
    .then(() => {
        console.log('success.');
    })
    .catch((err) => {
        console.log(err);
    });
