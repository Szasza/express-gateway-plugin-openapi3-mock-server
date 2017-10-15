const fs = require('fs')
const yaml = require('js-yaml')
const refParser = require('json-schema-ref-parser')

module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        const yamlFileContent = fs.readFileSync(pluginContext.settings.definitionFile)
        const definition = yaml.safeLoad(yamlFileContent)

        for (path in definition.paths) {
            for (method in definition.paths[path]) {
                let methodDefinition = definition.paths[path][method]
                let firstExampleKey = Object.keys(methodDefinition.examples)[0]
                let example = methodDefinition.examples[firstExampleKey]

                switch(method) {
                    case 'get':
                        pluginContext.registerGatewayRoute(app => {
                            app.get(path, (req, res) => {
                                res.json(example)
                            })
                        })
                        break
                    case 'post':
                        pluginContext.registerGatewayRoute(app => {
                            app.post(path, (req, res) => {
                                res.json(example)
                            })
                        })
                        break
                    case 'patch':
                        pluginContext.registerGatewayRoute(app => {
                            app.patch(path, (req, res) => {
                                res.json(example)
                            })
                        })
                        break
                    case 'put':
                        pluginContext.registerGatewayRoute(app => {
                            app.put(path, (req, res) => {
                                res.json(example)
                            })
                        })
                        break
                    case 'delete':
                        pluginContext.registerGatewayRoute(app => {
                            app.delete(path, (req, res) => {
                                res.json(example)
                            })
                        })
                        break
                }
            }
        }


    },
    options: {
        definitionFile: {
            type: 'string',
            required: true
        }
    }
}
