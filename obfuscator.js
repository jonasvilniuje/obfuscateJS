/**
 * Converts string to unicode sequence
 * @param {String} str the string to be converted.
 * @param {String} temp a char converted to unicode escape.
 * @returns {String} the converted string.
 */
function toUnicode(str) {
    if (typeof str === 'string') {
        return str.split('').map((childObjOrArray) => {
            const temp = childObjOrArray.charCodeAt(0).toString(16).toLowerCase();
            if (temp.length > 0) {
                const unicodeAddress = (`0000${temp}`).slice(-4);
                return `${'\\u'}${unicodeAddress}`;
            }
            return childObjOrArray;
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
    if (Array.isArray(objOrArray)) {
        const elementsArr = [];
        for (const el of objOrArray) {
            let elUnicoded;
            if (typeof el === 'object') {
                elUnicoded = traverseJSON(el);
            } else {
                elUnicoded = toUnicode(el);
            }
            elementsArr.push(elUnicoded);
        }
        return elementsArr;
    }
    if (typeof objOrArray === 'object') {
        Object.entries(objOrArray).forEach(([key, childObjOrArray]) => {
            if (typeof childObjOrArray === 'object') {
                const newChildObjOrArray = traverseJSON(childObjOrArray);
                objOrArray[toUnicode(key)] = newChildObjOrArray;
            } else {
                objOrArray[toUnicode(key)] = toUnicode(childObjOrArray);
            }
            delete objOrArray[key];
        });
        return objOrArray;
    }
    return objOrArray;
}

/**
 * Converts string to unicode sequence
 * @param {String} urlToCall the string to be converted.
 * @param {function} callback the string to be converted.
 * @returns {String} the converted string.
 */
function obfuscate(obj) {
    const result = traverseJSON(obj);
    return result;
}

module.exports = {
    obfuscate
};
