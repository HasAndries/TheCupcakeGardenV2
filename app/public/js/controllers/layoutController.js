LayoutController.$inject = ['$scope', '$rootScope'];
function LayoutController($scope, $rootScope){
  $rootScope.$on('display.mode', function(event, val){
    $scope.displayMode = val;
  });
}