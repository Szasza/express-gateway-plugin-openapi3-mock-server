const fs = require('fs')
const yaml = require('js-yaml')

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
