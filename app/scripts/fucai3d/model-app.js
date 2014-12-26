/*jshint unused: vars */
define(['angular', 'controllers/controller-createModel']/*deps*/,
  function (angular, CreateModelCtrl)/*invoke*/ {
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
      'lotteryAnalysesApp.services.createModelService',
      'lotteryAnalysesApp.controllers.CreateModelCtrl',/*angJSDeps*/
      'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ngTouch']);
  });
