define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:Zx6ModelCtrl
   * @description
   * # Zx6ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.Zx6ModelCtrl', [])
    .controller('Zx6ModelCtrl', function ($scope, $timeout, $modal, zx6ModelService, recentPeriods) {
      $scope.recentPeriods = recentPeriods;
      $scope.fucai3d = {
        recentPeriod: recentPeriods[0],
        filterRecent: 0
      };

      $scope.zx6List = [];
      $scope.selectedZx6List = [];
      for (var i = 0; i <= 9; i++) {
        $scope.zx6List.push(i);
        $scope.selectedZx6List[i] = false;
      }

      var process;
      $scope.selectNumber = function (e) {
        var el = $(e.target);
        if (el.hasClass('active')) {
          el.removeClass('active');
        } else {
          el.addClass('active');
        }
        var index = el.data('index');
        $scope.selectedZx6List[index - 0] = !!el.hasClass('active');

        process = $timeout(function () {
          $timeout.cancel(process);
          $scope.winningRate();
        }, 1000);
      };

      $scope.winningRate = function () {
        $scope.showWinningInfo = false;
        $scope.fucai3d.recentPeriod = recentPeriods[0];
        var combine = [];
        $scope.selectedZx6List.forEach(function(item, index){
          if(item){
            combine.push(index);
          }
        });

        if(combine.length < 3){
          $scope.$parent.alerts = [
            {type: 'danger', message: '至少选择三个！'}
          ];
          return;
        }
        zx6ModelService.winningRate({
          combine: combine,
          filterRecent: $scope.fucai3d.filterRecent
        }, function (data) {
          if (data.success === true) {
            $scope.winningRatePercent = data.winningRatePercent;
            $scope.returnsPercent = data.returnsPercent;
          }
        });
      };

      $scope.winningInfo = function () {
        var combine = [];
        $scope.selectedZx6List.forEach(function(item, index){
          if(item){
            combine.push(index);
          }
        });

        if(combine.length < 3){
          $scope.$parent.alerts = [
            {type: 'danger', message: '至少选择三个！'}
          ];
          return;
        }
        zx6ModelService.winningInfo({
          combine: combine,
          filterRecent: $scope.fucai3d.filterRecent,
          recentPeriod: $scope.fucai3d.recentPeriod
        }, function (data) {
          if (data.success === true) {
            $scope.winningRatePercent = data.winningRatePercent;
            $scope.returnsPercent = data.returnsPercent;
            $scope.historyDataRate = data.historyDataRate;
            $scope.showWinningInfo = true;
          }
        });
      };

      $scope.saveModel = function () {
        var combine = [];
        $scope.selectedZx6List.forEach(function(item, index){
          if(item){
            combine.push(index);
          }
        });

        zx6ModelService.saveModel({
          combine: combine,
          filterRecent: $scope.filterRecent,
          type: 'sum'
        }, function (data) {
          if (data.success === true) {
            $modal.open({
              templateUrl: '../views/templates/alert-modal.html',
              controller: 'AlertModalCtrl',
              resolve: {
                config: function () {
                  return {
                    modalContent: '保存成功！'
                  };
                }
              }
            });
          }
        });
      };
    });
});
