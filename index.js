/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const merge = require("lodash.merge");
const InjectPlugin = require("webpack-inject-plugin").default;

class SwaggerYamlWebpackPlugin {
  constructor(config) {
    this.config = config;
  }

  apply(compiler) {
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
    const globalAssignment = `global.${this.config.varName} = ${JSON.stringify(
      output
    )};`;
    new InjectPlugin(() => globalAssignment).apply(compiler);
  }
}

module.exports = SwaggerYamlWebpackPlugin;
