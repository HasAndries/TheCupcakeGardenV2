GalleryItemController.$inject = ['$scope'];
function GalleryItemController($scope) {
  //---------- showPicture ----------
  $scope.showPicture = function (picturePath) {
    $scope.picturePath = picturePath;
  };
}