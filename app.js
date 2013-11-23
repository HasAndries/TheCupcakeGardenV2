var express = require('express');
var swig = require('swig');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();
// settings
var env = app.get('env');
app.set('port', process.env.PORT || 3000);
if (env == 'development') {
  app.use(express.errorHandler());
}
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public', 'styles') }));
app.use(express.static(path.join(__dirname, 'public')));

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({
  varControls: ['{[', ']}'],
  tagControls: ['{=', '=}']
});

//routes
var home = require('./routes/home');
var gallery = require('./routes/gallery');
app.get('/', home.index);
app.get('/gallery', gallery.index);
app.get('/gallery/:folder', gallery.folder);
//special routes
var layout = require('./routes/layout');
app.get('/main.css', layout.css);

//run server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});