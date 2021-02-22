const file = require('./file');
const obf = require('./obfuscator');

file.readFileContentJSONCallback('./cars.marks.json', (err, result) => {
    if (err) {
        console.error(err);
        return process.exit(1);
    }

    const obfResult = obf.obfuscate(result);

    file.writeToFileCallback('./output.json', obfResult, (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log('writing JSON to a file is completed.');
    });
});
