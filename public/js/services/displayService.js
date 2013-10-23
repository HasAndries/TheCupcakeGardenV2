tcgServices.factory('displayService', ['$rootScope', function ($rootScope) {
  function DisplayService() {
    var _this = this;

    $rootScope.display = {};
    this.display = {};

    this.mode = function (current) {
      if (arguments.length == 0) return $rootScope.display.mode;
      _this.display.mode = $rootScope.display.mode = current;
      $rootScope.$broadcast('display.mode', current);
      return this;
    };
  }

  return new DisplayService();
}]);