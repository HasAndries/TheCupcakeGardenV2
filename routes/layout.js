exports.renderObjects = {
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

exports.css = function(req, res){
  var less = require('less');
  var fs = require('fs');
  less.render(fs.readFileSync('public/styles/main.less', 'utf8'), function(err, data){
    if (err) throw err;
    res.set('Content-Type', 'text/css');
    res.send(data);
  });
};
