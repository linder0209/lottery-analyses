define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:D1ModelCtrl
   * @description
   * # D1ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.D1ModelCtrl', [])
    .controller('D1ModelCtrl', function ($scope, $timeout, $modal, d1ModelService, recentPeriods) {
      $scope.recentPeriods = recentPeriods;
      $scope.fucai3d = {
        recentPeriod: recentPeriods[0],
        filterRecent: 0,
        bet1d: true
      };

      $scope.d1List = [];
      $scope.selectedD1List = [];
      $scope.selectedD1HundredsList = [];//百位
      $scope.selectedD1DecadeList = [];//十位
      $scope.selectedD1SingleDigitsList = [];//个位
      for (var i = 0; i <= 9; i++) {
        $scope.d1List.push(i);
        $scope.selectedD1List[i] = false;
        $scope.selectedD1HundredsList[i] = false;
        $scope.selectedD1DecadeList[i] = false;
        $scope.selectedD1SingleDigitsList[i] = false;
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
        $scope['selectedD1' + digit + 'List'][index - 0] = !!el.hasClass('active');
        process = $timeout(function () {
          $timeout.cancel(process);
          $scope.winningRate();
        }, 1000);
      };

      $scope.winningRate = function () {
        $scope.showWinningInfo = false;
        $scope.fucai3d.recentPeriod = recentPeriods[0];
        var combine = [];
        if($scope.fucai3d.bet1d){
          var com = [];
          $scope.selectedD1HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD1List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        d1ModelService.winningRate({
          combine: combine,
          type: $scope.fucai3d.bet1d  ? 'bet1d' : 'betCai1d',
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
        if($scope.fucai3d.bet1d){
          var com = [];
          $scope.selectedD1HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD1List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        d1ModelService.winningInfo({
          combine: combine,
          type: $scope.fucai3d.bet1d  ? 'bet1d' : 'betCai1d',
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
        if($scope.fucai3d.bet1d){
          var com = [];
          $scope.selectedD1HundredsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1DecadeList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);

          com = [];
          $scope.selectedD1SingleDigitsList.forEach(function(item, index){
            if(item){
              com.push(index);
            }
          });
          combine.push(com);
        }else{
          $scope.selectedD1List.forEach(function(item, index){
            if(item){
              combine.push(index);
            }
          });
        }

        $scope.selectedD1List.forEach(function(item, index){
          if(item){
            combine.push(index);
          }
        });

        d1ModelService.saveModel({
          combine: combine,
          filterRecent: $scope.filterRecent,
          type: $scope.fucai3d.bet1d  ? 'bet1d' : 'betCai1d'
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
