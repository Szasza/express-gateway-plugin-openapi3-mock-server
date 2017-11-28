"use strict"

const { getAuthValidationRules } = require('../parsers/auth')
const { validationResult } = require('express-validator/check')

/**
 * Registers a method endpoint.
 * @param method      HTTP method - 'GET', 'POST', ...
 * @param requestPath Request path
 * @param validate    Validation chain
 * @param example     Example response
 * @param context     Express Gateway plugin context
 */
function registerMethod(method, requestPath, validate, example, context) {
    context.registerGatewayRoute(app => {
        if (validate === null) {
            app[method](requestPath, (req, res) => {
                res.json(example)
            })
            return
        }

        app[method](requestPath, validate,
            (req, res) => {
                const errors = validationResult(req)

                if (! errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.mapped() });
                }
                res.json(example)
            }
        )
    })
}

/**
 * The route registration.
 * @param paths      All the specified request paths with their complete specification
 * @param components All the components from the API YML
 * @param context    Express Gateway plugin context
 */
module.exports = (paths, components, context) => {
    let path
    let method
    for (path in paths) {
        for (method in paths[path]) {
            let requestPath = path
            let methodDefinition = paths[path][method]
            let responseCode = Object.keys(methodDefinition.responses)[0]
            let examples = methodDefinition.responses[responseCode].content['application/json'].examples
            let firstExampleKey = Object.keys(examples)[0]
            let example = examples[firstExampleKey].value
            let validate = null

            if (methodDefinition['security'] !== undefined) {
                validate = getAuthValidationRules(methodDefinition['security'], components['securitySchemes'])
            }

            registerMethod(method, requestPath, validate, example, context)
        }
    }
}
