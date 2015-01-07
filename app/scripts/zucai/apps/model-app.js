/*jshint unused: vars */
define(['angular','../../controllers/controller-common','../controllers/controller-model']/*deps*/,
  function (angular, ModelCtrl)/*invoke*/ {
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
      'lotteryAnalysesApp.services.modelService',
      'lotteryAnalysesApp.controllers.CommonCtrl',
      'lotteryAnalysesApp.controllers.ModelCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
