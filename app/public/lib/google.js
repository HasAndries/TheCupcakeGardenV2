//Analytics
var _gaq = _gaq || [];
_gaq.push(['_setDomainName', 'none']);
_gaq.push(['_setAccount', 'UA-23945786-3']);
_gaq.push(['_trackPageview']);

(function () {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  var debug = false;
  var filename = debug ? 'u/ga_debug.js' : 'ga.js';
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/' + filename;
  //ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
