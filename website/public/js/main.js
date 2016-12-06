var app = angular.module('todo', ["ngRoute"]);

var handleError = function(err) {
  console.log("Error: "+ err)
}

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  $scope.display = {text: "poop"};

  $scope.newMessage = function() {
    $http.post('/api/encrypt', $scope.formData)
      .success(function(resp) {
        $scope.formData = {};
        $scope.display = resp;
      })
      .error(handleError);
  };
});
