define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ModelCtrl
   * @description
   * # ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.CreateModelCtrl', [])
    .controller('CreateModelCtrl', function ($scope, $timeout, createModelService) {
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

        process = $timeout(function(){
          $timeout.cancel(process);
          $scope.winningRate();
        },1000);
      };

      $scope.winningRate = function(){
        var data = {
          combine: function(){
            var sums = [];
            for(var sum in $scope.selectedSumList){
              if($scope.selectedSumList[sum]){
                sums.push(sum);
              }
            }
          },
          filterRecent: $scope.filterRecent
        };

        createModelService.winningRate(data, function (data) {
          if (data.success === true) {
            $scope.winningRatePercent = data.winningRatePercent;
          }
        });
      };

      $scope.winningInfo = function(){
        var data = {
          combine: function(){
            var sums = [];
            for(var sum in $scope.selectedSumList){
              if($scope.selectedSumList[sum]){
                sums.push(sum);
              }
            }
          },
          filterRecent: $scope.filterRecent
        };

        createModelService.winningInfo(data, function (data) {
          if (data.success === true) {
            $scope.historyDataRate = data.historyDataRate;
          }
        });
      };

      $scope.saveModel = function(){
        var data = {
          combine: function(){
            var sums = [];
            for(var sum in $scope.selectedSumList){
              if($scope.selectedSumList[sum]){
                sums.push(sum);
              }
            }
          },
          filterRecent: $scope.filterRecent
        };

        createModelService.saveModel(data, function (data) {
          if (data.success === true) {
            alert('保存成功！');
          }
        });
      };

    });
});
