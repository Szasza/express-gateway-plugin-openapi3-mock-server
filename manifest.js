const fs = require('fs')
const yaml = require('js-yaml')

import { parseDefinition } from 'react-lincoln/src/lib/definitions'

module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        const yamlFileContent = fs.readFileSync(pluginContext.settings.definitionFile)
        const rawDefinition = yaml.safeLoad(yamlFileContent)
        const definition = parseDefinition(rawDefinition, 'open-api-v3')

        console.log(definition)

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
