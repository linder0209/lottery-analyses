/*jshint unused: vars */
define(['angular', '../controllers/controller-common','../controllers/controller-zx6-model']/*deps*/,
  function (angular, Zx6ModelCtrl)/*invoke*/ {
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
      'lotteryAnalysesApp.services.zx6ModelService',
      'lotteryAnalysesApp.controllers.CommonCtrl',
      'lotteryAnalysesApp.controllers.Zx6ModelCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
