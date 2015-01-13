/*jshint unused: vars */
define(['angular','../../controllers/controller-common','../controllers/controller-profit100']/*deps*/,
  function (angular, Profit100Ctrl)/*invoke*/ {
    'use strict';

    /**
     * @ngdoc overview
     * @name lotteryAnalysesApp
     * @description
     * # lotteryAnalysesApp
     *
     * Main module of the application.
     */
    return angular.module('lotteryAnalysesApp', ['ui.bootstrap', 'lotteryAnalysesApp.services.lotteryHttpInterceptor',
      'lotteryAnalysesApp.services.profit100Service',
      'lotteryAnalysesApp.controllers.CommonCtrl',
      'lotteryAnalysesApp.controllers.Profit100Ctrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
