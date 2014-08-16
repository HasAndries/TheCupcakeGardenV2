/*! TheCupcakeGardenV2 app.js 16-08-2014 */
function LayoutController(a,b){b.$on("display.mode",function(b,c){a.displayMode=c}),b.$on("display.sizes",function(b,c){$.extend(a,c)})}function CakesController(){}function CandyCartController(){}function GalleryController(a,b){a.pictures={folder:null,items:[],busy:!1,visible:!1,error:null},a.slideCount=0,a.loadPictures=function(c){a.pictures.folder=c,a.pictures.items=[],a.pictures.busy=!0,a.pictures.visible=!0,a.pictures.error=null;var d=function(){a.pictures.busy=!1},e=function(b){a.pictures.items=b,a.slideCount=b.length,d()},f=function(b){a.pictures.error=b,d()};b.get(["/gallery",c].join("/")).success(e).error(f)},a.getRowCount=function(b,c){var d=parseInt(b/c);return b%c!=0&&(d+=1),a.getNumber(d)},a.getNumber=function(a){for(var b=[],c=0;a>c;c++)b.push(c);return b}}function GalleryItemController(a){a.showPicture=function(b){a.picturePath=b}}function HomeController(){}Array.prototype.indexOf||(Array.prototype.indexOf=function(a){"use strict";if(null==this)throw new TypeError;var b,c,d=Object(this),e=d.length>>>0;if(0===e)return-1;if(b=0,arguments.length>1&&(b=Number(arguments[1]),b!=b?b=0:0!=b&&1/0!=b&&b!=-1/0&&(b=(b>0||-1)*Math.floor(Math.abs(b)))),b>=e)return-1;for(c=b>=0?b:Math.max(e-Math.abs(b),0);e>c;c++)if(c in d&&d[c]===a)return c;return-1}),Array.prototype.compare=function(a){if(!a)return!1;if(this.length!=a.length)return!1;for(var b=0;b<this.length;b++)if(this[b]instanceof Array&&a[b]instanceof Array){if(!this[b].compare(a[b]))return!1}else if(this[b]!=a[b])return!1;return!0};var tcgConfig=angular.module("tcg.config",[]),tcgServices=angular.module("tcg.services",[]),tcgFilters=angular.module("tcg.filters",[]),tcgDirectives=angular.module("tcg.directives",[]),tcg=angular.module("tcg",["tcg.config","tcg.services","tcg.filters","tcg.directives"]).run();tcgConfig.constant("browser",{isIE:"Microsoft Internet Explorer"==navigator.appName,ieVersion:this.isIE&&parseInt(navigator.appVersion.substr(navigator.appVersion.indexOf("MSIE")+4))||0}),tcgConfig.constant("paths",{gallery:"/test_content/gallery"}),tcgServices.factory("displayService",["$rootScope",function(a){function b(){var b=this;a.display={},this.display={},this.mode=function(c){return 0==arguments.length?a.display.mode:(b.display.mode=a.display.mode=c,a.$broadcast("display.mode",c),this)},this.sizes=function(c){return 0==arguments.length?a.display.sizes:(b.display.sizes=a.display.sizes=c,a.$broadcast("display.sizes",c),this)}}return new b}]),tcgDirectives.directive("sizeMonitor",["$window","$timeout","displayService",function(a,b,c){return{restrict:"A",link:function(d,e,f){function g(){for(var a={},b=0;b<i.length;b++)a[i[b]]="none"!=$("#"+i[b]).css("display"),a[i[b]]&&(a.displaySize=i[b]);return a}function h(a){b(function(){d.$eval(c.sizes(a))},0)}var i=f.sizeMonitor.split(","),j=g();h(j),$(a).on("resize",function(){var a=g();j!=a&&a!=c.sizes()&&(j=a,h(a))})}}}]),tcgDirectives.directive("windowMonitor",["$window","$timeout","displayService",function(a,b,c){return{restrict:"A",link:function(d,e,f){function g(){return"none"!=$("#"+f.windowMonitor).css("display")&&"full"||"mini"}function h(a){b(function(){d.$eval(c.mode(a))},0)}var i=g();h(i),$(a).on("resize",function(){var a=g();i!=a&&a!=c.mode()&&(i=a,h(a))})}}}]),LayoutController.$inject=["$scope","$rootScope"],CakesController.$inject=["$scope"],CandyCartController.$inject=["$scope"],GalleryController.$inject=["$scope","$http"],GalleryItemController.$inject=["$scope"],HomeController.$inject=["$scope"];//@ sourceURL=app.js