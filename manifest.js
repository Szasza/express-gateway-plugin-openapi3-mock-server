module.exports = {
    version: '1.2.0',
    init: function (pluginContext) {
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
