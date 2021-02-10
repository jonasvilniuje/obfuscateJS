const fs = require('fs');

/**
 * Converts string to unicode sequence
 * @param {String} str the string to be converted.
 * @param {String} temp a char converted to unicode escape.
 * @returns {String} the converted string.
 */
function toUnicode(str) {
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

/**
 * Traverses through JSON object
 * @param {Object} obj The first number.
 * @param {String} prop The second number.
 * @returns {null} traverses only.
 */
function traverseJSON(obj) {
    for (const prop in obj) {
        if (Array.isArray(obj[prop])) {
            const elements = [];
            for (const el of obj[prop]) {
                elements.push(toUnicode(String(el)));
            }
            const propUnicoded = toUnicode(prop);
            obj[propUnicoded] = elements;
            delete obj[prop];
        } else if (typeof obj[prop] === 'object') {
            const propUnicoded = toUnicode(prop);
            obj[propUnicoded] = obj[prop];

            delete obj[prop];

            traverseJSON(obj[propUnicoded]);
        } else {
            if (typeof obj[prop] === 'string') {
                obj[prop] = toUnicode(obj[prop]);
            }
            _prop = toUnicode(prop);
            obj[_prop] = obj[prop];
            delete obj[prop];
        }
    }
}


/**
 * Converts string to unicode sequence
 * @param {String} urlToCall the string to be converted.
 * @param {function} callback the string to be converted.
 * @returns {String} the converted string.
 */
function obfuscate(json) {
    // Here you have access to your variable
    //const obj = JSON.parse(json);
    obj = json;
    // eslint-disable-next-line no-console
    console.log("data to obfuscate");
    console.dir(obj, {depth: null});

    traverseJSON(obj);

    //setTimeout(() => callback(null, obj), 1000);
    // eslint-disable-next-line no-console
    console.log("obfuscated data");
    console.dir(obj, {depth: null});
    
    return obj;
}
// eslint rules
// var - > const
// index.js tuscias, obfuscator atskirai, index js turi pasiimportint ir callint obfuscatoriu

// index.js -> obfuscate ->
// module.exports, require(relative path)

module.exports = {
    obfuscate
};
