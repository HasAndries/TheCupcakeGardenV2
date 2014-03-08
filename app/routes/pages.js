var less = require('less');
var fs = require('fs');
var path = require('path');

function Pages(app, config) {
  var _this = this;
  //renderObjects gets passed to the render engine as available objects
  _this.renderObjects = {
    menuItems: [
      {name: 'home', link: '/'},
      {name: 'gallery', link: '/gallery'},
      {name: 'cupcakes', link: '/cupcakes'},
      {name: 'specials', link: '/specials'},
      {name: 'cakes', link: '/cakes'},
      {name: 'contact us', link: '/contact-us'},
      {name: 'about us', link: '/about-us'}
    ]
  };
  //---------- /main.css ----------
  app.get('/main.css', function (req, res) {
    less.render(fs.readFileSync(path.join(__dirname, '../public/styles/main.less'), 'utf8'), function (err, data) {
      if (err) throw err;
      res.set('Content-Type', 'text/css');
      res.send(data);
    });
  });
  //---------- / ----------
  app.get('/', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'home';
    res.render('home', renderObjects);
  });
  //---------- /gallery ----------
  app.get('/gallery', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'gallery';

    //gather thumbnails
    var thumbnails = [];
    var galleryPublicPath = config['galleryPublicPath'];
    var galleryPath = config['galleryPath'];

    var fs = require('fs');
    var items = fs.readdirSync(galleryPath);
    var files = [];
    var index;
    //identify folders
    for (index in items) {
      var name = items[index];
      var stat = fs.statSync([galleryPath, name].join('/'));
      if (stat.isDirectory())
        thumbnails.push({name: name});
      else if (stat.isFile())
        files.push(name);
    }
    //link folders to thumbnails
    for (index in thumbnails) {
      var thumbLength = thumbnails[index].name.length + 4;
      var lowerName = thumbnails[index].name.toLowerCase();
      for (var iFile in files) {
        if (files[iFile].length == thumbLength && files[iFile].toLowerCase().indexOf(lowerName) != -1) {
          thumbnails[index].path = [galleryPublicPath, files[iFile]].join('/');
          delete files[iFile];
          break;
        }
      }
    }
    renderObjects.thumbnails = thumbnails;
    res.render('gallery', renderObjects);
  });
  //---------- /gallery/:folder ----------
  app.get('/gallery/:folder', function (req, res) {
    var pictures = [];
    var folderPublicPath = [config['galleryPublicPath'], req.params.folder].join('/');
    var folderPath = [config['galleryPath'], req.params.folder].join('/');

    var fs = require('fs');
    var items = fs.readdirSync(folderPath);
    var index;
    //identify pictures
    for (index in items) {
      var name = items[index];
      var stat = fs.statSync([folderPath, name].join('/'));
      if (stat.isFile())
        pictures.push({name: name, path: [folderPublicPath, name].join('/')});
    }
    res.send(pictures)
  });
}
module.exports = Pages;