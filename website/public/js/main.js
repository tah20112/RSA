var app = angular.module('todo', ["ngRoute"]);

app.controller("mainController", function ($scope, $http) {
  $scope.formData = {};
  $scope.display = {};

  var handleError = function(err) {
    console.log("Error: "+ err);
    $scope.display.error = err;
  }

  $scope.encrypt = function() {
    $scope.display.encrypted = "";
    $http.post('/api/encrypt', $scope.formData)
      .success(function(resp) {
        $scope.display.encrypted = resp.encrypted;
        $scope.display.error = "";
      })
      .error(handleError);
  };

  $scope.decrypt = function() {
    $scope.display.decrypted = "";
    $http.post('/api/decrypt', $scope.formData)
      .success(function(resp) {
        $scope.display.decrypted = resp.decrypted;
        $scope.display.error = "";
      })
      .error(handleError);
  };

  $scope.getKeys = function() {
    $scope.display.keys = {};
    $http.post('/api/getKeys', $scope.formData)
      .success(function(resp) {
        $scope.display.keys = resp.keys;
        $scope.display.error = "";
      })
      .error(handleError);
  };

  $scope.getPrime = function() {
    $scope.display.prime = "Generating...";
    $http.get('/api/getPrime')
      .success(function(resp) {
        console.log(resp.prime)
        $scope.display.prime = resp.prime;
        $scope.display.error = "";
      })
      .error(handleError);
  }

  $scope.testPrime1 = function() {
    $scope.display.isPrime1 = "";
    $http.post('/api/testPrime', {prime: $scope.formData.prime1})
      .success(function(resp) {
        $scope.display.isPrime1 = resp.isPrime;
        $scope.display.error = "";
      })
      .error(handleError);
  }

  $scope.testPrime2 = function() {
    $scope.display.isPrime2 = "";
    $http.post('/api/testPrime', {prime: $scope.formData.prime2})
      .success(function(resp) {
        $scope.display.isPrime2 = resp.isPrime;
        $scope.display.error = "";
      })
      .error(handleError);
  }
});
