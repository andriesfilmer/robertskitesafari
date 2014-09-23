(function(){
  "use strict";

  var app = angular.module('app.home', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    });
  }]);

  app.controller('homeCtrl', [function($scope, $location, $anchorScroll, $routeParams) {
  }]);

})();
