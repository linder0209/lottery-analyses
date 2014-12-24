/*jshint unused: vars */
define(['angular', 'controllers/controller-import', 'controllers/controller-model',
    'controllers/controller-statistics','controllers/controller-analyses', 'controllers/controller-main']/*deps*/,
  function (angular, ImportCtrl, ModelCtrl,StatisticsCtrl, AnalysesCtrl, MainCtrl)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name lotteryAnalysesApp
   * @description
   * # lotteryAnalysesApp
   *
   * Main module of the application.
   */
  return angular.module('lotteryAnalysesApp', ['ui.bootstrap', 'lottery.ui.tab', 'lotteryAnalysesApp.services.lotteryHttpInterceptor',
    'lotteryAnalysesApp.services.importService','lotteryAnalysesApp.services.analysesService',
    'lotteryAnalysesApp.controllers.ImportCtrl','lotteryAnalysesApp.controllers.ModelCtrl',
    'lotteryAnalysesApp.controllers.StatisticsCtrl','lotteryAnalysesApp.controllers.AnalysesCtrl',
    'lotteryAnalysesApp.controllers.MainCtrl','lotteryAnalysesApp.directives.linkActive',/*angJSDeps*/
    'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']).config(function ($routeProvider) {
    $routeProvider.when('/import', {
      templateUrl: '../views/fucai3d/import.html', controller: 'ImportCtrl'
    }).when('/model', {
      templateUrl: '../views/fucai3d/model.html', controller: 'ModelCtrl'
    }).when('/statistics', {
      templateUrl: '../views/fucai3d/statistics.html', controller: 'StatisticsCtrl'
    }).when('/analyses', {
      templateUrl: '../views/fucai3d/analyses.html', controller: 'AnalysesCtrl'
    }).otherwise({
      redirectTo: '/import'
    });
  });
});
