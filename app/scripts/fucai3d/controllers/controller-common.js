define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:Zx6ModelCtrl
   * @description
   * # Zx6ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.CommonCtrl', [])
    .controller('CommonCtrl', function ($scope) {
      //页面中输出的alert提示信息
      $scope.alerts = [];
      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };

    });
});
