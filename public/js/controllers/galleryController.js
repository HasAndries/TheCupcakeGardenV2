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
  //---------- getRowCount ----------
  $scope.getRowCount = function (items, columns) {
    var rows = parseInt(items.length / columns);
    if (items.length % columns != 0)
      rows += 1;
    console.log('--------------------------');
    console.log(items);
    console.log(rows);
    console.log(new Array(rows));
    console.log('**************************');
    return new Array(rows);
  };
  //---------- getNumber ----------
  $scope.getNumber = function (num) {
    return new Array(num);
  };
}