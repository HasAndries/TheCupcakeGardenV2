var layout = require('./layout');

exports.render = function(req, res){
  var renderObjects = layout.renderObjects;
  renderObjects.pageName = 'home';
  res.render('home', renderObjects);
};
