/*jshint unused: vars */
define(['angular', '../../controllers/controller-common','../controllers/controller-d2-model']/*deps*/,
  function (angular, D2ModelCtrl)/*invoke*/ {
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
      'lotteryAnalysesApp.services.commonService',
      'lotteryAnalysesApp.services.d2ModelService',
      'lotteryAnalysesApp.controllers.CommonCtrl',
      'lotteryAnalysesApp.controllers.D2ModelCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
