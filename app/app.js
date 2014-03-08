var express = require('express');
var swig = require('swig');
var path = require('path');
var Pages = require('./routes/pages');

function Admin(config){
  var _this = this;
  _this.config = config;

  var app = express();
  _this.app = app;
  var env = app.get('env');
  app.set('port', process.env.PORT || 3000);
  if (env == 'development') {
    app.use(express.errorHandler());
  }
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public'))); //public
  //views
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.engine('html', swig.renderFile);
  swig.setDefaults({
    varControls: ['{[', ']}'],
    tagControls: ['{=', '=}']
  });
  //routes
  _this.pages = new Pages(app, config);
}
Admin.prototype.start = function(http){
  var _this = this;
  http.createServer(_this.app).listen(_this.app.get('port'), function () {
    console.log('TheCupcakeGarden server listening on port ' + _this.app.get('port'));
  });
};
module.exports = Admin;
