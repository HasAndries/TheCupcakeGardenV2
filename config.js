var extend = require('whet.extend');
var configContent = require('./config.json');

var config = extend({}, configContent.all);

exports.setEnv = function(name){
  config = extend({}, configContent.all, configContent[name]);
};
exports.value = function(key, val){
  if (arguments.length == 1) return config[key];
  else if (arguments.length == 2) config[key] = val;
  return this;
};