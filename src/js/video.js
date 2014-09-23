(function(){
  "use strict";

  var app = angular.module('app.video', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/video', {
      templateUrl: 'partials/video.html',
      controller: 'videoCtrl'
    });
  }]);

  app.controller('videoCtrl', [function() {
  }]);

})();
