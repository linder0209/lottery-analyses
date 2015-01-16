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
      profit100Service.profit100Data(function (data) {
        if (data.success === true) {
          var modelMin = data.modelData.modelMin;
          var modelMax = data.modelData.modelMax;
          $scope.modelMin = modelMin;
          $scope.modelMax = modelMax;

          var modelCombine = [];

          modelMin.forEach(function (item, index) {
            var invest = item.invest + modelMax[index].invest;
            var bonus = item.bonus + modelMax[index].bonus;
            var win = item.win;
            var i = 0;
            var periods = 1;
            if (bonus - invest <= 0) {//没有盈利
              while (bonus - invest <= 0 && index + i < 99 && periods < 15) {
                i++;
                periods++;
                if (win === 0) {
                  invest += (modelMin[index + i].invest + modelMax[index + i].invest * 2) * periods;
                  bonus += (modelMin[index + i].bonus + modelMax[index + i].bonus * 2) * periods;
                } else if (win === 1) {
                  invest += (modelMin[index + i].invest + modelMax[index + i].invest) * periods;
                  bonus += (modelMin[index + i].bonus + modelMax[index + i].bonus) * periods;
                } else {
                  invest += (modelMin[index + i].invest * 2 + modelMax[index + i].invest) * periods;
                  bonus += (modelMin[index + i].bonus * 2 + modelMax[index + i].bonus) * periods;
                }
                win = modelMin[index + i].win;
              }
            }

            modelCombine.push({
              index: '第' + (index + 1) + '期 - 第' + (index + 1 + i) + '期',
              periods: periods,
              invest: invest,
              bonus: bonus
            });
          });

          $scope.modelCombine = modelCombine;
        }
      });
    });
});
