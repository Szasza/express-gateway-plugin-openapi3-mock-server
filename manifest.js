const fs = require('fs')
const yaml = require('js-yaml')
const refParser = require('json-schema-ref-parser')

module.exports = {
    version: '1.2.0',

    pluginContext: null,

    init: function (pluginContext) {
        this.pluginContext = pluginContext

        const yamlFileContent = fs.readFileSync(pluginContext.settings.definitionFile)
        const definition = yaml.safeLoad(yamlFileContent)

        for (path in definition.paths) {
            for (method in definition.paths[path]) {
                let methodDefinition = definition.paths[path][method]
                let responseCode = Object.keys(methodDefinition.responses)[0]
                let examples = methodDefinition.responses[responseCode].content['application/json'].examples
                let firstExampleKey = Object.keys(examples)[0]
                let example = examples[firstExampleKey]

                this.registerRoute(path, method, example)
            }
        }
    },

    registerRoute: function (path, method, example) {
        switch(method) {
            case 'get':
                this.pluginContext.registerGatewayRoute(app => {
                    app.get(path, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'post':
                this.pluginContext.registerGatewayRoute(app => {
                    app.post(path, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'patch':
                this.pluginContext.registerGatewayRoute(app => {
                    app.patch(path, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'put':
                this.pluginContext.registerGatewayRoute(app => {
                    app.put(path, (req, res) => {
                        res.json(example)
                    })
                })
                break
            case 'delete':
                this.pluginContext.registerGatewayRoute(app => {
                    app.delete(path, (req, res) => {
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
