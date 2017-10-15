const fs = require('fs')
const yaml = require('js-yaml')

module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        const yamlFileContent = fs.readFileSync(pluginContext.settings.definitionFile)
        const definition = yaml.safeLoad(yamlFileContent)

        for (path in definition.paths) {
            console.log(path)
            for (method in definition.paths[path]) {
                console.log(method)
                let methodDefinition = definition.paths[path]
                console.log(methodDefinition)
                let example = methodDefinition.examples[0]
                console.log(example)
                /*switch(method) {
                    case 'get':
                        pluginContext.registerGatewayRoute(app => {
                            app.get(path, (req, res) => {
                                res.json({hello: 'Plugin here!'})
                            })
                        })
                }*/
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
