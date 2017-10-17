# Express Gateway OpenAPI 3 Mock Server Plugin

**_This plugin is under active development. Would you meet any problems, please open a new issue
after verifying that there isn't one already._**

## Prerequisites

Please follow the instructions on Express Gateway's [Getting started](http://www.express-gateway.io/getting-started/) page.

Also please take a look at how plugins are [installed and enabled](http://www.express-gateway.io/docs/plugins/).

## Installation

`eg plugin install express-gateway-plugin-openapi3-mock-server`

## Configuration

You can use `samples/base-paths.yml` for testing purposes. If so, please create a `definitions` folder
in the project root and copy the sample YAML there.

_system.config.yml_

```yaml
# some config in front of the plugins section

plugins:
  express-gateway-plugin-openapi3-mock-server:
    definitionFile: 'definitions/yourdefinition.yml' # The file containing your API's specification

# some config after the plugins section
```

_gateway.config.yml_ (A barebone example, if nothing else is used.)

```yaml
http:
  port: 80
apiEndpoints:
  api:
    host: '*'
policies:
  - mock
pipelines:
  api:
    apiEndpoints:
        - api
    policies:
        - mock:
          - action
```
The above configuration disables the Admin CLI and will do nothing but provide a dummy responder based on your 
