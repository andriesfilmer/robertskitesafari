(function(){
  "use strict";

  // Declare app level module which depends on views, and components
  var app = angular.module('app', [
    'ngRoute',
    'app.home',
    'app.details',
    'app.video'
  ]);

  app.config(['$routeProvider', function($routeProvider) {
    console.log("otherwise...");
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

  app.run(function($rootScope, $location, $anchorScroll, $routeParams) {

    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();

      // top-bar is not closing with xhr call
      $('.top-bar, [data-topbar]').css('height', '').removeClass('expanded');

    });
  });

  app.controller('mainCtrl', function($scope, $location, $anchorScroll, $routeParams) {
  });

})();

