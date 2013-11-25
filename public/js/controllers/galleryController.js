GalleryController.$inject = ['$scope', '$http'];
function GalleryController($scope, $http) {
  $scope.pictures = {
    folder: null,
    items: [],
    busy: false,
    visible: false,
    error: null
  };
  $scope.slideCount = 0;
//  $scope.rowCountFull = null;
//  $scope.rowColumnsFull = $scope.getNumber(8);
//  $scope.rowCountMini = null;
//  $scope.rowColumnsMini = $scope.getNumber(4);
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
      $scope.slideCount = pictures.length;
//      $scope.rowCountFull = $scope.getRowCount(pictures, $scope.rowColumnsFull);
//      $scope.rowCountMini = $scope.getRowCount(pictures, $scope.rowColumnsMini);
      finish();
    };
    var error = function (error) {
      $scope.pictures.error = error;
      finish();
    };
    $http.get(['/gallery', folder].join('/')).success(success).error(error);
  };
  //---------- getRowCount ----------
  $scope.getRowCount = function (total, columns) {
    var rows = parseInt(total / columns);
    if (total % columns != 0)
      rows += 1;
    return $scope.getNumber(rows);
  };
  //---------- getNumber ----------
  $scope.getNumber = function (num) {
    var array = [];
    for(var ct=0;ct<num;ct++)
      array.push(ct);
    return array;
  };
}