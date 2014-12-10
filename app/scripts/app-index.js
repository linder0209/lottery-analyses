/*jshint unused: vars */
define(['angular', 'controllers/controller-index', 'controllers/controller-about']/*deps*/, function (angular, IndexCtrl, AboutCtrl)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name lotteryAnalysesApp
   * @description
   * # lotteryAnalysesApp
   *
   * Main module of the application.
   */
  return angular.module('lotteryAnalysesApp', ['lotteryAnalysesApp.controllers.IndexCtrl', 'lotteryAnalysesApp.controllers.AboutCtrl', /*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']).config(function ($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: 'views/index.html', controller: 'IndexCtrl'
        }).when('/about', {
          templateUrl: 'views/about.html', controller: 'AboutCtrl'
        }).otherwise({
          redirectTo: '/'
        });
    });
});
