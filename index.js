/* eslint-env es6 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const merge = require("lodash.merge");
const webpack = require("webpack");

class SwaggerYamlWebpackPlugin {
  constructor(config) {
    this.config = config;
  }

  apply(compiler) {
    console.log('Swagger Yaml processing started');
    const filenames = fs.readdirSync(this.config.directory);
    const output = {};
    filenames.forEach(filename => {
      merge(
        output,
        yaml.safeLoad(
          fs.readFileSync(path.resolve(this.config.directory, filename), "utf8")
        )
      );
    });
    new webpack.DefinePlugin({
      [this.config.varName]: JSON.stringify(output)
    }).apply(compiler);
    console.log('Swagger Yaml processing finished');
  }
}

module.exports = SwaggerYamlWebpackPlugin;
