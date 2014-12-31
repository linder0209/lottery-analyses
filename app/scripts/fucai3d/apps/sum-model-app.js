/*jshint unused: vars */
define(['angular', '../controllers/controller-sum-model']/*deps*/,
  function (angular, SumModelCtrl)/*invoke*/ {
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
      'lotteryAnalysesApp.services.sumModelService',
      'lotteryAnalysesApp.controllers.SumModelCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
