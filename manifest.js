const parser = require('./parsers/openapi')
const register = require('./router/register')

module.exports = {
    version: '1.2.0',

    policies: ['mock'],

    init: function (pluginContext) {
        // A mock policy.
        pluginContext.registerPolicy({
            name: 'mock',
            policy: (actionParams) => {
                return (req, res, next) => {
                    next()
                };
            }
        })

        const definition = parser(pluginContext.settings.definitionFile)

        register(definition.paths, definition.components, pluginContext)
    },

    options: {
        definitionFile: {
            type: 'string',
            required: true
        }
    }
}
