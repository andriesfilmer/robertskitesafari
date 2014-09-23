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
