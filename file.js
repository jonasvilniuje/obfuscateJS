const fs = require('fs');
const util = require('util');

/**
 * @param fileName name of file to read
 * @param callback callback function
 * @returns json file contents
 */
function readFileContentJSONCallback(fileName, callback) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            callback(err);
        }
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
    });
}

/**
 * writes data to file
 */
function writeToFileCallback(fileName, data, callback) {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}

module.exports = {
    readFileContentJSONCallback,
    writeToFileCallback
};
