define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:D2ModelCtrl
   * @description
   * # D2ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.D2ModelCtrl', [])
    .controller('D2ModelCtrl', function ($scope, $timeout, $modal, d2ModelService, recentPeriods) {
      $scope.recentPeriods = recentPeriods;
      $scope.fucai3d = {
        recentPeriod: recentPeriods[0],
        filterRecent: 0,
        bet2d: true
      };

      $scope.d2List = [];
      $scope.selectedD2List = [];
      $scope.selectedD2HundredsList = [];//百位
      $scope.selectedD2DecadeList = [];//十位
      $scope.selectedD2SingleDigitsList = [];//个位
      for (var i = 0; i <= 9; i++) {
        $scope.d2List.push(i);
        $scope.selectedD2List[i] = false;
        $scope.selectedD2HundredsList[i] = false;
        $scope.selectedD2DecadeList[i] = false;
        $scope.selectedD2SingleDigitsList[i] = false;
      }

      var process;
      $scope.selectNumber = function (digit, e) {
        var el = $(e.target);
        if (el.hasClass('active')) {
          el.removeClass('active');
        } else {
          el.addClass('active');
        }
        var index = el.data('index');
        $scope['selectedD2' + digit + 'List'][index - 0] = !!el.hasClass('active');
        process = $timeout(function () {
          $timeout.cancel(process);
          $scope.winningRate();
        }, 1000);
      };

      $scope.winningRate = function () {
        $scope.showWinningInfo = false;
        $scope.fucai3d.recentPeriod = recentPeriods[0];
        var combine = [];
        if($scope.fucai3d.bet2d){
          var com = [];
          $scope.selectedD2HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD2List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        d2ModelService.winningRate({
          combine: combine,
          type: $scope.fucai3d.bet2d  ? 'bet2d' : 'betCai2d',
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
        if($scope.fucai3d.bet2d){
          var com = [];
          $scope.selectedD2HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD2List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        d2ModelService.winningInfo({
          combine: combine,
          type: $scope.fucai3d.bet2d  ? 'bet2d' : 'betCai2d',
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
        if($scope.fucai3d.bet2d){
          var com = [];
          $scope.selectedD2HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD2SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD2List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        $scope.selectedD2List.forEach(function(item, index){
          if(item){
            combine.push(index);
          }
        });

        d2ModelService.saveModel({
          combine: combine,
          filterRecent: $scope.filterRecent,
          type: $scope.fucai3d.bet2d  ? 'bet2d' : 'betCai2d'
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
