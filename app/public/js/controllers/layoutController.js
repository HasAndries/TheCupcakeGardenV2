LayoutController.$inject = ['$scope', '$rootScope'];
function LayoutController($scope, $rootScope){
  $rootScope.$on('display.mode', function(event, val){
    $scope.displayMode = val;
  });
  $rootScope.$on('display.sizes', function(event, val){
    $.extend($scope, val);
  });


}