/*jshint unused: vars */
define(['angular','../../controllers/controller-common','../controllers/controller-details-model']/*deps*/,
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
      'lotteryAnalysesApp.services.modelDetailsService',
      'lotteryAnalysesApp.controllers.CommonCtrl',
      'lotteryAnalysesApp.controllers.ModelDetailsCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
