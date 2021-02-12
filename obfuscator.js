const fs = require('fs');

/**
 * Converts string to unicode sequence
 * @param {String} str the string to be converted.
 * @param {String} temp a char converted to unicode escape.
 * @returns {String} the converted string.
 */
function toUnicode(str) {
    if (typeof str === 'string') {
        return str.split('').map((value) => {
            const temp = value.charCodeAt(0).toString(16).toLowerCase();
            if (temp.length > 0) {
                // eslint-disable-next-line prefer-template
                const unicodeAddress = ('0000' + temp).slice(-4);
                return `${'\\u'}${unicodeAddress}`;
            }
            return value;
        }).join('');
    }
    return str;
}

/**
 * Traverses through JSON object
 * @param {Object} objOrArray The first number.
 * @param {String} prop The second number.
 * @returns {null} traverses only.
 */
function traverseJSON(objOrArray) {
    console.log('TRAVERSE_JSON');

    if (Array.isArray(objOrArray)) {
        console.log(' TRAVERSE_JSON ARRAY');
        const elementsArr = [];
        for (const el of objOrArray) {
            // console.log("arrayElement", el);
            /* if (typeof el === 'object') traverseJSON(el);
            else {
            } */
            const elUnicoded = toUnicode(el);
            elementsArr.push(elUnicoded);
        }
        console.log(elementsArr);
        return elementsArr;
    }
    if (typeof objOrArray === 'object') {
        console.log(' TRAVERSE_JSON OBJECT');
        Object.entries(objOrArray).forEach(([key, value]) => {
            // do something with key and val
            // console.log("OBJECT", key, value);
            if (typeof objOrArray === 'object') {
                value = traverseJSON(value);
            }
            objOrArray[toUnicode(key)] = toUnicode(value);
            delete objOrArray[key];
        });
        return objOrArray;
    }
    console.log('TRAVERSE_JSON ELSE');
    return objOrArray;
}

/**
 * Converts string to unicode sequence
 * @param {String} urlToCall the string to be converted.
 * @param {function} callback the string to be converted.
 * @returns {String} the converted string.
 */
function obfuscate(json) {
    // Here you have access to your variable
    // const obj = JSON.parse(json);
    obj = json;
    // eslint-disable-next-line no-console
    console.log('data to obfuscate');
    console.dir(obj, {depth: null});

    const result = traverseJSON(obj);
    return result;
    // setTimeout(() => callback(null, obj), 1000);
    // eslint-disable-next-line no-console
    // console.log("obfuscated data");
    // console.dir(obj, {depth: null});

}
// eslint rules
// var - > const
// index.js tuscias, obfuscator atskirai, index js turi pasiimportint ir callint obfuscatoriu

// index.js -> obfuscate ->
// module.exports, require(relative path)

module.exports = {
    obfuscate
};
