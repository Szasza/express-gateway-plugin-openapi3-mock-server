'use strict'

/**
 * Converts a string's first character to uppercase and returns the string.
 *
 * @param str
 * @returns {string}
 */
module.exports.ucfirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
