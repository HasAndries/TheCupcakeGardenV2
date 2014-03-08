tcgDirectives.directive('windowMonitor', ['$window', '$timeout', 'displayService', function ($window, $timeout, displayService) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      function getMode() {
        return $('#' + attrs['windowMonitor']).css('display') != 'none' && 'full' || 'mini';
      }

      function broadcast(mode) {
        $timeout(function () {
          scope.$eval(displayService.mode(mode));
        }, 0);
      }

      var lastMode = getMode();
      broadcast(lastMode);

      $($window).on('resize', function () {
        var mode = getMode();
        if (lastMode != mode && mode != displayService.mode()) {
          lastMode = mode;
          broadcast(mode);
        }
      });
    }
  }
}]);