'use strict'

const { header, oneOf } = require('express-validator/check')
const { ucfirst } = require('../helpers/string')

/**
 * Sets the validation rule for an give security specification
 * @param securityScheme - The security scheme definition from the API specification on the YML path `components/securitySchemes/SOMESCHEMENAME`
 * @param validationGroup - The validation group for the given endpoint
 */
function setValidationRuleForSecurityMethod(securityScheme, validationGroup) {
    let scheme

    switch (securityScheme.type) {
        case "http":
            scheme = ucfirst(securityScheme.scheme)
            validationGroup.push(header('Authorization').matches(scheme + " .*"))
            break
        case "apiKey":
            if (securityScheme.in === 'header') {
                validationGroup.push(header(securityScheme.name).isLength({ min: 1 }))
            }
    }
}

/**
 * Builds the validation chain for a given endpoint
 * @param methodSecurity - The method's security definition
 * @param securitySchemes - The specified security schemes' list from `components/securitySchemes` in the API YML
 * @returns {*}
 */
module.exports.getAuthValidationRules = (methodSecurity, securitySchemes) => {
    let validationRules = []

    for (let securityOption of methodSecurity) {
        let validationGroup = []
        for (let securitySchemeName in securityOption) {
            setValidationRuleForSecurityMethod(securitySchemes[securitySchemeName], validationGroup)
        }

        if (validationGroup.length > 0) {
            validationRules.push(validationGroup)
        }
    }

    switch (validationRules.length) {
        case 0:
            return null
        case 1:
            return validationRules[0]
    }
    return oneOf(validationRules)
}
