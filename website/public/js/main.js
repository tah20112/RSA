var app = angular.module('todo', ["ngRoute"]);

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  $scope.display = {};

  var handleError = function(err) {
    console.log("Error: "+ err);
    $scope.display.error = err;
  }

  $scope.encrypt = function() {
    $http.post('/api/encrypt', $scope.formData)
      .success(function(resp) {
        $scope.display.encrypted = resp.encrypted;
        $scope.display.error = "";
      })
      .error(handleError);
  };

  $scope.decrypt = function() {
    $http.post('/api/decrypt', $scope.formData)
      .success(function(resp) {
        $scope.display.decrypted = resp.decrypted;
        $scope.display.error = "";
      })
      .error(handleError);
  };

  $scope.getKeys = function() {
    $http.post('/api/getKeys', $scope.formData)
      .success(function(resp) {
        $scope.display.keys = resp.keys;
        $scope.display.error = "";
      })
      .error(handleError);
  };
});
