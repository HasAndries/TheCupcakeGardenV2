var less = require('less');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');

function Pages(app, config) {
  var _this = this;
  //renderObjects gets passed to the render engine as available objects
  _this.renderObjects = {
    menuItems: [
      {name: 'home', link: '/'},
      {name: 'gallery', link: '/gallery'},
      {name: 'cupcakes', link: '/cupcakes'},
      {name: 'candy cart', link: '/candy-cart'},
      {name: 'cakes', link: '/cakes'},
      {name: 'contact us', link: '/contact-us'},
      {name: 'about us', link: '/about-us'}
    ],
    cssFiles: config.cssFiles,
    appFiles: config.appFiles,
    libFiles: config.libFiles
  };
  //---------- /main.css ----------
  app.get('/main.css', function (req, res) {
    less.render(fs.readFileSync(path.join(__dirname, '../public/styles/main.less'), 'utf8'), function (err, data) {
      if (err) throw err;
      res.set('Content-Type', 'text/css');
      res.send(data);
    });
  });
  //---------- /all.css ----------
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
    renderObjects.title = '';
    res.render('home', renderObjects);
  });
  //---------- /gallery ----------
  app.get('/gallery', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'gallery';
    renderObjects.title = ' - Gallery';

    //gather thumbnails
    var thumbnails = [];
    var galleryPublicPath = config['galleryPublicPath'];
    var galleryPath = path.join(__dirname, '../..', config['galleryPath']);

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
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'galleryItem';
    renderObjects.title = ' - ' + req.params.folder + ' Gallery';
    renderObjects.folder = req.params.folder;
    //gather pictures
    var pictures = [];
    var folderPublicPath = [config['galleryPublicPath'], req.params.folder].join('/');
    var folderPath = path.join(__dirname, '../..', config['galleryPath'], req.params.folder);

    var fs = require('fs');
    var items = fs.readdirSync(folderPath);
    var index;
    //identify pictures
    for (index in items) {
      var name = items[index];
      var filePath = [folderPath, name].join('/');
      var stat = fs.statSync(filePath);
      if (stat.isFile() && name.length - name.indexOf('.') == 4)
        pictures.push({name: name, thumbnail: [folderPublicPath, 'thumbnails', name].join('/'), path: [folderPublicPath, name].join('/'), size: sizeOf(filePath)});
    }
    //sort images by height & width
    pictures.sort(function(a,b){
      if (b.size.height < a.size.height) return -1;
      if (b.size.height == a.size.height && b.size.width > a.size.width) return -1;
      return 1;
    });
    renderObjects.pictures = pictures;
    res.render('galleryItem', renderObjects);
  });
  //---------- cupcakes ----------
  app.get('/cupcakes', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'cupcakes';
    renderObjects.title = ' - Cupcakes';

    res.render('cupcakes', renderObjects);
  });
  //---------- candy-cart ----------
  app.get('/candy-cart', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'candyCart';
    renderObjects.title = ' - Candy Cart';

    res.render('candy-cart', renderObjects);
  });
  //---------- cakes ----------
  app.get('/cakes', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'cakes';
    renderObjects.title = ' - Cakes';

    res.render('cakes', renderObjects);
  });
  //---------- contact-us ----------
  app.get('/contact-us', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'contact-us';
    renderObjects.title = ' - Contact Us';

    res.render('contact-us', renderObjects);
  });
  //---------- about-us ----------
  app.get('/about-us', function (req, res) {
    var renderObjects = _this.renderObjects;
    renderObjects.pageName = 'about-us';
    renderObjects.title = ' - About Us';

    res.render('about-us', renderObjects);
  });
}
module.exports = Pages;