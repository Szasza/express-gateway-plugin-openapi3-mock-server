const RefParser = require('json-schema-ref-parser')
const deasync = require('deasync')

module.exports = function (filePath) {
    const parserOptions = {
        dereference: {
            circular: true
        }
    }
    let definition = {}
    let done = false

    RefParser.dereference(filePath, parserOptions, function(err, schema) {
        if (err) {
            console.error(err);
            return done = false;
        }
        definition = schema;
        done = true;
    })
    deasync.loopWhile(function(){
        return done === false
    })

    return definition
}
