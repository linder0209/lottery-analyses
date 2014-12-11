/*jshint unused: vars */
define(['angular', 'controllers/controller-import', 'controllers/controller-model', 'controllers/controller-analyses']/*deps*/,
  function (angular, ImportCtrl, ModelCtrl, AnalysesCtrl)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name lotteryAnalysesApp
   * @description
   * # lotteryAnalysesApp
   *
   * Main module of the application.
   */
  return angular.module('lotteryAnalysesApp', ['lotteryAnalysesApp.controllers.ImportCtrl',
    'lotteryAnalysesApp.controllers.ModelCtrl','lotteryAnalysesApp.controllers.AnalysesCtrl',/*angJSDeps*/
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']).config(function ($routeProvider) {
    $routeProvider.when('/import', {
      templateUrl: '../views/fucai3d/import.html', controller: 'ImportCtrl'
    }).when('/model', {
      templateUrl: '../views/fucai3d/model.html', controller: 'ModelCtrl'
    }).when('/analyses', {
      templateUrl: '../views/fucai3d/import.html', controller: 'AnalysesCtrl'
    }).otherwise({
      redirectTo: '/import'
    });
  });
});
