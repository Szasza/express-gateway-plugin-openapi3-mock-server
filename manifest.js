const RefParser = require('json-schema-ref-parser')

module.exports = {
    version: '1.2.0',

    policies: ['mock'],

    init: function (pluginContext) {
        // A mock policy.
        pluginContext.registerPolicy({
            name: 'mock',
            policy: (actionParams) => {
                return (req, res, next) => {
                    console.log('executing policy mock', actionParams);
                    next() // calling next policy
                    // or write response:  res.json({result: "this is the response"})
                };
            }
        })

        let definition, done = false;
        RefParser.dereference(pluginContext.settings.definitionFile, parserOptions, function(err, schema) {
            if (err) {
                console.error(err);
                return done = false;
            }
            definition = schema;
            done = true;
        });
        require('deasync').loopWhile(function(){return !done;});

        for (path in definition.paths) {
            for (method in definition.paths[path]) {
                let requestPath = path
                let methodDefinition = definition.paths[path][method]
                let responseCode = Object.keys(methodDefinition.responses)[0]
                let examples = methodDefinition.responses[responseCode].content['application/json'].examples
                let firstExampleKey = Object.keys(examples)[0]
                let example = examples[firstExampleKey].value

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
