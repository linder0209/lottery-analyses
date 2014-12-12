/*jshint unused: vars */
define(['angular', 'controllers/main', 'controllers/about', 'directives/mydirective']/*deps*/, function (angular, MainCtrl, AboutCtrl, MyDirectiveDirective)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name lotteryAnalysesApp
   * @description
   * # lotteryAnalysesApp
   *
   * Main module of the application.
   */
  return angular
    .module('lotteryAnalysesApp', ['lotteryAnalysesApp.controllers.MainCtrl',
'lotteryAnalysesApp.controllers.AboutCtrl',
'lotteryAnalysesApp.directives.MyDirective',
/*angJSDeps*/
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ngTouch'
  ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
