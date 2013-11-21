var extend = require('whet.extend');
var configContent = require('./config.json');
var express = require('express');
var app = express();

var env = app.get('env');
var config = extend({}, configContent.all, configContent[env]);
module.exports = function (key, val) {
  if (arguments.length == 0) return config;
  else if (arguments.length == 1) return config[key];
  else if (arguments.length == 2) config[key] = val;
  return this;
};

