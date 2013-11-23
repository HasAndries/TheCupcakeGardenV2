GalleryController.$inject = ['$scope', '$http'];
function GalleryController($scope, $http) {
  $scope.pictures = {
    folder: null,
    items: [],
    busy: false,
    visible: false,
    error: null
  };
  //---------- loadPictures ----------
  $scope.loadPictures = function (folder) {
    $scope.pictures.folder = folder;
    $scope.pictures.items = [];
    $scope.pictures.busy = true;
    $scope.pictures.visible = true;
    $scope.pictures.error = null;

    var finish = function () {
      $scope.pictures.busy = false;
    };
    var success = function (pictures) {
      $scope.pictures.items = pictures;
      finish();
    };
    var error = function (error) {
      $scope.pictures.error = error;
      finish();
    };
    $http.get(['/gallery', folder].join('/')).success(success).error(error);
  };
}