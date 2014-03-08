var http = require('http');
var config = require('./config');
var App = require('./app/app');

var app = new App(config);
app.start(http);