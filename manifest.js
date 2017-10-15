const fs = require('fs')
const yaml = require('js-yaml')

module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
        const yamlFileContent = fs.readFileSync(pluginContext.settings.definitionFile)
        const definition = yaml.safeLoad(yamlFileContent)
        console.log(definition)
        pluginContext.registerGatewayRoute(app => {
            app.get('/test', (req, res) => {
                res.json({hello: 'Plugin here!'})
            })
        })
    },
    options: {
        definitionFile: {
            type: 'string',
            required: true
        }
    }
}
