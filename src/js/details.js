(function(){
  "use strict";

  var app = angular.module('app.details', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/details', {
      templateUrl: 'partials/details.html',
      controller: 'detailsCtrl'
    });
  }]);

  app.controller('detailsCtrl', [function() {
  }]);

})();
