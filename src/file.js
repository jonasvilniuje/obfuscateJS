const fs = require('fs');

/**
 * reads data from an input file, parses to JSON
 * @param {string} fileName name of file to read
 * @param {fuction} callback callback function
 * @returns {null} none
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
 * writes JSON to an output file
 * @param {string} fileName name of file to read
 * @param {object} data JSON object to write to a file
 * @param {fuction} callback callback function
 * @returns {null} none
 */
function writeToFileCallback(fileName, data, callback) {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
}

const readFilePromise = (fileName) => new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, result) => {
        if (err) {
            return reject(new Error(`error while reading file: ${err.message}`));
        }
        if (result) {
            let parsedData = null;
            try {
                parsedData = JSON.parse(result);
            } catch (error) {
                return reject(new Error(`error while parsing file: ${error.message}`));
            }
            return resolve(parsedData);
        }
    });
});

const writeFilePromise = (fileName, data) => new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return reject(err);
        }
        return resolve();
    });
});

module.exports = {
    writeToFileCallback,
    writeFilePromise,
    readFileContentJSONCallback,
    readFilePromise
};
