# Swagger Yaml Webpack Plugin #

![npm](https://img.shields.io/npm/v/swagger-yaml-webpack-plugin.svg) ![travis](https://img.shields.io/travis/mhmtztmr/react-dialpad.svg)

Swagger Yaml Webpack Plugin provides you to bundle your swagger yaml documentation into your Node.js output code as a globally accessible variable in JSON format during build time so that you can serve that content anyway you wish such as HTTP response.

## Install ##

`npm i --save-dev swagger-yaml-webpack-plugin`

## Usage ##

Webpack Config:

```JavaScript
const path = require("path");
const SwaggerYamlWebpackPlugin = require("swagger-yaml-webpack-plugin");

module.exports = () => {
  return {
    // ...
    plugins: [
      new SwaggerYamlWebpackPlugin({
        varName: "SWAGGER_DOC",
        directory: path.resolve(__dirname, "./src/apidocs/swagger")
      })
    ]
  };
};
```

It will convert yaml documents in the given directory to JSON string and assign it to `SWAGGER_DOC`.

```JavaScript
const http = require("http");

http.createServer((req, res) => {
  let output;
  if (req.url === '/apidoc') {
    if (typeof SWAGGER_DOC !== "undefined") {
      output = SWAGGER_DOC; // swagger-ui-express can be used together with Express.js for graceful UI.
    } else {
      output = "No docs found!"
    }
  } else {
    output = "Hello world!";
  }
  res.write(output);
  res.end();
})
.listen(8080);
```

It will serve Swagger data as JSON through `/apidoc` endpoint. If you use Expess.js and would like to serve the Swagger doc with a graceful UI, you can use [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).
