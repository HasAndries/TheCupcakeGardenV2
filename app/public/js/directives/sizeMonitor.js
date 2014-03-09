tcgDirectives.directive('sizeMonitor', ['$window', '$timeout', 'displayService', function ($window, $timeout, displayService) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      var ids = attrs['sizeMonitor'].split(',');

      function getSizes() {
        var output = {};
        for(var ct=0;ct<ids.length;ct++){
          output[ids[ct]] = $('#' + ids[ct]).css('display') != 'none';
          if (output[ids[ct]]) output['displaySize'] = ids[ct];
        }
        return output;
      }

      function broadcast(mode) {
        $timeout(function () {
          scope.$eval(displayService.sizes(mode));
        }, 0);
      }

      var lastSizes = getSizes();
      broadcast(lastSizes);

      $($window).on('resize', function () {
        var sizes = getSizes();
        if (lastSizes != sizes && sizes != displayService.sizes()) {
          lastSizes = sizes;
          broadcast(sizes);
        }
      });
    }
  }
}]);