define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ModelCtrl
   * @description
   * # ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.ModelCtrl', [])
    .controller('ModelCtrl', function ($scope) {
      $scope.createModel = function(type){
         $scope.modelTmpl = '../views/fucai3d/templates/sum-model-tmpl.html';
      };
    });
});
