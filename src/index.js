/* eslint-disable require-jsdoc */
/* eslint-disable arrow-body-style */
const path = require('path');
const file = require('./file');
const obf = require('./obfuscator');

const readfilePath = path.join(__dirname, '../resources/glossary.json');
const readMappingfilePath = path.join(__dirname, '../resources/mapping.json');
const writefilePath = path.join(__dirname, '../resources/output.json');

async function main() {
    const inputObj = await file.readFilePromise(readfilePath);
    const mappingObj = await file.readFilePromise(readMappingfilePath).catch(() => null);
    const obfuscatedObj = obf.obfuscate(inputObj, mappingObj);
    await file.writeFilePromise(writefilePath, obfuscatedObj);
    return obfuscatedObj;
}

main()
    .then(() => {
        console.log('success.');
    })
    .catch((err) => {
        console.log('error occured\n', err);
        process.exit(1);
    });
