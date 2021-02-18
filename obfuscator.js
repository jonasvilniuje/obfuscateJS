/**
 * Converts string to unicode sequence
 * @param {String} str the string to be converted.
 * @param {String} temp a char converted to unicode escape.
 * @returns {String} the converted string.
 */
function transformToObfuscatedPrimitive(str, mappings) {
    if (mappings != null && Object.keys(mappings).includes(str)) {
        return mappings[str];
    }
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
 * @param {Object} objOrArray json object, array or primitive.
 * @param {Object} mappings json object containing substitute data used for obfuscation of key values.
 * @returns {objOrArray} returns modified object
 */
function transformToObfuscated(objOrArray, mappings) {
    if (Array.isArray(objOrArray)) {
        const elementsArr = [];
        for (const el of objOrArray) {
            elementsArr.push(transformToObfuscated(el, mappings));
        }
        return elementsArr;
    }
    if (typeof objOrArray === 'object') {
        Object.entries(objOrArray).forEach(([key, childObjOrArray]) => {
            const newChildObjOrArray = transformToObfuscated(childObjOrArray, mappings);
            objOrArray[transformToObfuscatedPrimitive(key, mappings)] = newChildObjOrArray;
            delete objOrArray[key];
        });
        return objOrArray;
    }
    return transformToObfuscatedPrimitive(objOrArray, mappings);
}

/**
 * Converts string to unicode sequence
 * @param {Object} obj the object to be converted.
 * @param {Object} mappings json object containing substitute data used for obfuscation of key values.
 * @returns {Object} obufscated(encoded) object.
 */
function obfuscate(obj, mappings) {
    const result = transformToObfuscated(obj, mappings);
    return result;
}

module.exports = {
    obfuscate
};
