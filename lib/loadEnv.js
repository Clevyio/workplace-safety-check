'use strict';
let YAML = require('yamljs');

module.exports = (path) => {
  let config = YAML.load(path);
  Object.keys(config).forEach(function(key) {
    process.env[key] = config[key];
  });
};
