define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ModelCtrl
   * @description
   * # ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.SumModelCtrl', [])
    .controller('SumModelCtrl', function ($scope, $timeout, $modal, sumModelService, recentPeriods) {
      $scope.recentPeriods = recentPeriods;
      $scope.fucai3d = {
        recentPeriod: recentPeriods[0]
      };

      $scope.sumList = [];
      $scope.selectedSumList = {};
      for (var i = 0; i <= 27; i++) {
        $scope.sumList.push(i);
        $scope.selectedSumList[i + ''] = false;
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
        $scope.selectedSumList[index] = !!el.hasClass('active');

        process = $timeout(function () {
          $timeout.cancel(process);
          $scope.winningRate();
        }, 1000);
      };

      $scope.winningRate = function () {
        $scope.showWinningInfo = false;
        var combine = [];
        for (var sum in $scope.selectedSumList) {
          if ($scope.selectedSumList[sum]) {
            combine.push(sum);
          }
        }

        sumModelService.winningRate({
          combine: combine,
          filterRecent: $scope.filterRecent
        }, function (data) {
          if (data.success === true) {
            $scope.winningRatePercent = data.winningRatePercent;
            $scope.returnsPercent = data.returnsPercent;
          }
        });
      };

      $scope.winningInfo = function () {
        var combine = [];
        for (var sum in $scope.selectedSumList) {
          if ($scope.selectedSumList[sum]) {
            combine.push(sum);
          }
        }

        sumModelService.winningInfo({
          combine: combine,
          filterRecent: $scope.filterRecent,
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
        for (var sum in $scope.selectedSumList) {
          if ($scope.selectedSumList[sum]) {
            combine.push(sum);
          }
        }

        sumModelService.saveModel({
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
