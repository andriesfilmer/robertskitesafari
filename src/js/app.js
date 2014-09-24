(function(){
  "use strict";

  // Declare app level module which depends on views, and components
  var app = angular.module('app', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'mainCtrl'
      }).
      when('/map', {
        templateUrl: 'partials/map.html',
        controller: 'mainCtrl'
      }).
      when('/details', {
        templateUrl: 'partials/details.html',
        controller: 'mainCtrl'
      }).
      when('/video', {
        templateUrl: 'partials/video.html',
        controller: 'mainCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });

  }]);

  app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();

      // top-bar is not closing with xhr call, so we force a close on change
      $('.top-bar, [data-topbar]').css('height', '').removeClass('expanded');

    });
  });

  app.controller('mainCtrl', function() {
  });

  // Google Maps. Header include => http://maps.google.com/maps/api/js?sensor=false
  // Create a div.google-map(hello-maps="", latitude="xxxxxxxx", longitude="xxxxxxx")
  app.directive('helloMaps', function () {
    return function (scope, elem, attrs) {
      var mapOptions,
        latitude = attrs.latitude,
        longitude = attrs.longitude,
        map;
      latitude = latitude && parseFloat(latitude, 10) || 43.074688;
      longitude = longitude && parseFloat(longitude, 10) || -89.384294;
      mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(latitude, longitude)
      };
      map = new google.maps.Map(elem[0], mapOptions);
    };
  });

})();

