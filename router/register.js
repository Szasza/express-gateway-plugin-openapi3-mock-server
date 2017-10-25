function registerRoute(context, method, requestPath, example) {
    switch(method) {
        case 'get':
            context.registerGatewayRoute(app => {
                app.get(requestPath, (req, res) => {
                    res.json(example)
                })
            })
            break
        case 'post':
            context.registerGatewayRoute(app => {
                app.post(requestPath, (req, res) => {
                    res.json(example)
                })
            })
            break
        case 'patch':
            context.registerGatewayRoute(app => {
                app.patch(requestPath, (req, res) => {
                    res.json(example)
                })
            })
            break
        case 'put':
            context.registerGatewayRoute(app => {
                app.put(requestPath, (req, res) => {
                    res.json(example)
                })
            })
            break
        case 'delete':
            context.registerGatewayRoute(app => {
                app.delete(requestPath, (req, res) => {
                    res.json(example)
                })
            })
            break
    }
}

module.exports = function (paths, components, context) {
    for (path in paths) {
        for (method in paths[path]) {
            let requestPath = path
            let methodDefinition = paths[path][method]
            let responseCode = Object.keys(methodDefinition.responses)[0]
            let examples = methodDefinition.responses[responseCode].content['application/json'].examples
            let firstExampleKey = Object.keys(examples)[0]
            let example = examples[firstExampleKey].value

            registerRoute(context, method, requestPath, example)
        }
    }
}
