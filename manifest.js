const parse = require('./parser/parse')

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

        const definition = parse(pluginContext.settings.definitionFile)

        for (path in definition.paths) {
            for (method in definition.paths[path]) {
                let requestPath = path
                let methodDefinition = definition.paths[path][method]
                let responseCode = Object.keys(methodDefinition.responses)[0]
                let examples = methodDefinition.responses[responseCode].content['application/json'].examples
                let firstExampleKey = Object.keys(examples)[0]
                let example = examples[firstExampleKey].value

                this.registerRoute(pluginContext, requestPath, example)
            }
        }
    },

    registerRoute: function (pluginContext, requestPath, example) {
        switch(method) {
            case 'get':
                pluginContext.registerGatewayRoute(app => {
                    app.get(requestPath, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'post':
                pluginContext.registerGatewayRoute(app => {
                    app.post(requestPath, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'patch':
                pluginContext.registerGatewayRoute(app => {
                    app.patch(requestPath, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'put':
                pluginContext.registerGatewayRoute(app => {
                    app.put(requestPath, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'delete':
                pluginContext.registerGatewayRoute(app => {
                    app.delete(requestPath, (req, res) => {
                        res.json(example)
                    })
                })
                break
        }
    },

    options: {
        definitionFile: {
            type: 'string',
            required: true
        }
    }
}
