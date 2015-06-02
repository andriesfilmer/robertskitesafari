(function(){
  "use strict";


  // Declare app level module which depends on views, and components
  var app = angular.module('app', ['ngRoute', 'gettext']);

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
      when('/info', {
        templateUrl: 'partials/info.html',
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

  app.run(function($rootScope, $location, $window, $anchorScroll, $routeParams, gettextCatalog) {

    // If we don't have a preffered language.
    if(!$window.localStorage.lang) {
      switch($window.navigator.language.substring(0, 2)) {
        case 'de':
          $window.localStorage.lang = 'de';
          console.log('##### set localstorage -> de'); 
          break;
        case 'en':
          $window.localStorage.lang = 'en';
          console.log('##### set localstorage -> en'); 
          break;
        default:
          $window.localStorage.lang = 'nl';
          console.log('##### set localstorage -> nl'); 
      }
    }

    gettextCatalog.baseLanguage='nl';
    gettextCatalog.currentLanguage = $window.localStorage.lang;
    gettextCatalog.debug = true;

    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
      $location.hash($routeParams.scrollTo);
      $anchorScroll();

      // top-bar is not closing with xhr call, so we force a close on change
      $('.top-bar, [data-topbar]').css('height', '').removeClass('expanded');

    });
  });

  app.controller('mainCtrl', function($scope, $window, $location, gettextCatalog) {

    // Debug languages
    //console.log('##### Scope Lang -> ' + $scope.lang); 
    //console.log('##### Windo Lang -> ' + $window.localStorage.lang); 
    //console.log('##### Navig Lang -> ' + $window.navigator.language.substring(0, 2)); 
    //
    $scope.languages = ['nl', 'en', 'de'];
    $scope.lang = $window.localStorage.lang;
    $scope.changeLanguage = function () {
      $window.localStorage.lang = $scope.lang;
      gettextCatalog.currentLanguage = $window.localStorage.lang;
      $window.location.reload();
    };
  });

  // Google Maps. Header include => http://maps.google.com/maps/api/js?sensor=false
  // Create a div.google-map(hello-maps="", latitude="xxxxxxxx", longitude="xxxxxxx")
  app.directive('kiteMap', function () {
    return function (scope, elem, attrs) {
      var map;
      var mapOptions;
      var latitude = attrs.latitude, longitude = attrs.longitude;

      latitude = latitude && parseFloat(latitude, 10) || -30.72380;
      longitude = longitude && parseFloat(longitude, 10) || 115.21477;
      mapOptions = { zoom: 6, center: new google.maps.LatLng(latitude, longitude) };
      map = new google.maps.Map(elem[0], mapOptions);

      var gnaraloo = new google.maps.LatLng(-23.818445,113.51954);
      var marker1 = new MarkerWithLabel({ position: gnaraloo, map: map, labelContent: "Garaloo", icon: "/static/favicon/kite-maps-icon.png" });
      var carnarvon = new google.maps.LatLng(-24.8754194,113.6640223);
      var marker2 = new MarkerWithLabel({ position: carnarvon, map: map, labelContent: "Carnarvon", icon: "/static/favicon/kite-maps-icon.png" });
      var monkeymia = new google.maps.LatLng(-25.8390074,113.7173615);
      var marker3 = new MarkerWithLabel({ position: monkeymia, map: map, labelContent: "Monkey Mia", icon: "/static/favicon/kite-maps-icon.png" });
      var kalbarri = new google.maps.LatLng(-27.719652,114.160651);
      var marker4 = new MarkerWithLabel({ position: kalbarri, map: map, labelContent: "Kalbarri", icon: "/static/favicon/kite-maps-icon.png" });
      var geraldton = new google.maps.LatLng(-28.7763845,114.613945);
      var marker5 = new MarkerWithLabel({ position: geraldton, map: map, labelContent: "Geraldton", icon: "/static/favicon/kite-maps-icon.png" });
      var snagisland = new google.maps.LatLng(-29.9352773,114.9772222);
      var marker6 = new MarkerWithLabel({ position: snagisland, map: map, labelContent: "Snag Island", icon: "/static/favicon/kite-maps-icon.png" });
      var jurianbay = new google.maps.LatLng(-30.5023185,115.0744962);
      var marker7 = new MarkerWithLabel({ position: jurianbay, map: map, labelContent: "Jurian bay", icon: "/static/favicon/kite-maps-icon.png" });
      var lancelin = new google.maps.LatLng(-31.022645,115.3532067);
      var marker8 = new MarkerWithLabel({ position: lancelin, map: map, labelContent: "Lancelin", icon: "/static/favicon/kite-maps-icon.png" });
      var mandurah = new google.maps.LatLng(-32.5871437,115.7161738);
      var marker9 = new MarkerWithLabel({ position: mandurah, map: map, labelContent: "Mandurah", icon: "/static/favicon/kite-maps-icon.png" });
      var bunburry = new google.maps.LatLng(-33.3194271,115.6422304);
      var marker10 = new MarkerWithLabel({ position: bunburry, map: map, labelContent: "Bunbury", icon: "/static/favicon/kite-maps-icon.png" });
      var margretriver = new google.maps.LatLng(-33.9666421,115.0529286);
      var marker11 = new MarkerWithLabel({ position: margretriver, map: map, labelContent: "Margret River", icon: "/static/favicon/kite-maps-icon.png" });
    };
  });

})();

