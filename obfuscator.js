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
 * @param {Object} objOrArray The first number.
 * @param {String} prop The second number.
 * @returns {null} traverses only.
 */
function transformToObfuscated(objOrArray, mappings) {
    if (Array.isArray(objOrArray)) {
        const elementsArr = [];
        for (const el of objOrArray) {
            let elUnicoded;
            if (typeof el === 'object') {
                elUnicoded = transformToObfuscated(el, mappings);
            } else {
                elUnicoded = transformToObfuscatedPrimitive(el, mappings);
            }
            elementsArr.push(elUnicoded);
        }
        return elementsArr;
    }
    if (typeof objOrArray === 'object') {
        Object.entries(objOrArray).forEach(([key, childObjOrArray]) => {
            if (mappings != null && Object.keys(mappings).includes(key)) {
                console.log("opa: ", key, mappings[key]);
                objOrArray[key] = mappings[key];
            }
            if (typeof childObjOrArray === 'object') {
                const newChildObjOrArray = transformToObfuscated(childObjOrArray, mappings);
                objOrArray[transformToObfuscatedPrimitive(key, mappings)] = newChildObjOrArray;
            } else {
                objOrArray[transformToObfuscatedPrimitive(key, mappings)] = transformToObfuscatedPrimitive(childObjOrArray, mappings);
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
function obfuscate(obj, mappings) {
    const result = transformToObfuscated(obj, mappings);
    return result;
}

module.exports = {
    obfuscate
};
