const path = require('path');
const file = require('./file');
const obf = require('./obfuscator');

const readfilePath = path.join(__dirname, '../resources/cars.marks.json');
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

// analogas su promise

file.readFilePromise(readfilePath)
    .then((result) => {
        console.log(result);
        return obf.obfuscate(result);
    })
    .then((newResult) => {
        console.log(newResult);
        return file.writeFilePromise(writefilePath, newResult);
    })
    .catch((err) => {
        console.log(err);
    });

/* file.writeFilePromise(filePath, )
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

 */
