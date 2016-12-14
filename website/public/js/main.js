var app = angular.module('todo', ["ngRoute"]);

var handleError = function(err) {
  console.log("Error: "+ err)
}

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  $scope.display = {};

  $scope.newMessage = function() {
    $scope.display.original = $scope.formData.text;
    $http.post('/api/encrypt', $scope.formData)
      .success(function(resp) {
        $scope.formData = {};
        $scope.display.encrypted = resp.encrypted;
        $scope.display.decrypted = resp.decrypted;
      })
      .error(handleError);
  };
});
