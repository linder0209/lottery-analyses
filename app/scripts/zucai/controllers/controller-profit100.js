define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:Profit100Ctrl
   * @description
   * # Profit100Ctrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.Profit100Ctrl', [])
    .controller('Profit100Ctrl', function ($scope, $timeout, $modal, profit100Service) {
      profit100Service.profit100Data(function(data){
        if (data.success === true) {
          $scope.modelMin = data.modelData.modelMin;
          $scope.modelMax = data.modelData.modelMax;
        }
      });
    });
});
