var layout = require('./layout');
var config = require('../config');

exports.render = function(req, res){
  var renderObjects = layout.renderObjects;
  renderObjects.pageName = 'gallery';

  //gather thumbnails
  var thumbnails = [];
  var galleryPublicPath = config('galleryPublicPath');
  var galleryPath = config('galleryPath');

  var fs = require('fs');
  var items = fs.readdirSync(galleryPath);
  var files = [];
  var index;
  //identify folders
  for(index in items){
    var name = items[index];
    var stat = fs.statSync([galleryPath, name].join('/'));
    if(stat.isDirectory())
      thumbnails.push({name: name});
    else if (stat.isFile())
      files.push(name);
  }
  //link folders to thumbnails
  for(index in thumbnails){
    var thumbLength = thumbnails[index].name.length+4;
    var lowerName = thumbnails[index].name.toLowerCase();
    for(var iFile in files){
      if (files[iFile].length == thumbLength && files[iFile].toLowerCase().indexOf(lowerName) != -1){
        thumbnails[index].path = [galleryPublicPath, files[iFile]].join('/');
        delete files[iFile];
        break;
      }
    }
  }
  renderObjects.thumbnails = thumbnails;
  res.render('gallery', renderObjects);
};