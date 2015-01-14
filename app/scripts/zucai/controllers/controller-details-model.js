define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ModelCtrl
   * @description
   * # ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.ModelDetailsCtrl', [])
    .controller('ModelDetailsCtrl', function ($scope, $timeout, $modal, modelDetailsService, commonMethod) {
      $scope.bet = {
        showForm: false
      };
      $scope.profitStat = {
        investment: 0,
        bonus: 0
      };
      //这里回头改为分页显示
      modelDetailsService.betRecord($scope.combineModelId, function (data) {
        if (data.success === true) {
          $scope.modelMeta = data.modelMeta;
          //备份 modelMeta数据
          $scope.copyModelMeta = angular.copy(data.modelMeta);

          data.betList.forEach(function (item) {
            commonMethod.convertBetData(item);
          });
          $scope.betList = data.betList;
          //计算盈利情况
          commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
        }else{
          $scope.$parent.alerts = [
            {type: 'danger', message: data.errorMessage}
          ];
        }
      });

      $scope.saveBet = function () {
        var data = {
          modelId: $scope.combineModelId,
          combine: $scope.modelMeta.combine.map(function (item) {
            return {
              _id: item._id,
              name: item.name,
              link: item.link,
              invest: parseFloat(item.invest)
            };
          })
        };
        modelDetailsService.saveBet(data, function (data) {
          if (data.success === true) {
            commonMethod.convertBetData(data.betItem);
            $scope.betList.unshift(data.betItem);
            //计算盈利情况
            commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
            $scope.cancelSaveBet();
          }
        });
      };

      $scope.deleteBet = function (bet) {
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../../views/templates/confirm-modal.html',
          controller: 'ConfirmModalCtrl',
          resolve: {
            config: function () {
              return {
                modalContent: '确认要删除该期投注吗？'
              };
            }
          }
        });
        /**
         * 点击ok和cancel执行的回调
         * modalInstance.result.then(function () {}, function () {});
         */
        modalInstance.result.then(function () {
          modelDetailsService.deleteBet(bet._id, function (data) {
            if (data.success === true) {
              var index = $scope.betList.indexOf(bet);
              $scope.betList.splice(index, 1);
              //计算盈利情况
              commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
            }
          });
        });
      };

      $scope.cancelSaveBet = function () {
        $scope.bet.showForm = false;
        //恢复 modelMeta 数据
        $scope.modelMeta.combine.forEach(function (item, index) {
          item.invest = $scope.copyModelMeta.combine[index].invest;
        });
      };

      $scope.addInvestItem = function (bet) {
        var formData = bet.formData;
        var combine = [];
        formData.forEach(function (item, index) {
          if (index % 2 === 0) {//奇数
            combine.push({
              _id: item._id,
              invest: parseFloat(item.invest)
            });
          }
        });
        modelDetailsService.addInvestItem({_id: bet._id, combine: combine}, function (data) {
          if (data.success === true) {
            bet.times.push(data.time);
            commonMethod.convertBetData(bet);
            //计算盈利情况
            commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
          }
        });
      };

      $scope.updateHistroyItem = function (bet, times) {
        var combine = [];
        bet.combine.forEach(function (item, index) {
          combine.push({
            _id: item._id,
            invest: parseFloat(times.combineContent[index * 2].value),
            bonus: parseFloat(times.combineContent[index * 2 + 1].value)
          });
        });
        modelDetailsService.updateHistroyItem({_id: bet._id, time: times.time, combine: combine}, function (data) {
          if (data.success === true) {
            times.combine.forEach(function (item, index) {
              item.invest = combine[index].invest;
              item.bonus = combine[index].bonus;
            });
            commonMethod.convertBetData(bet);
            //计算盈利情况
            commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
          }
        });
      };

      $scope.deleteHistroyItem = function (bet, times) {
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../../views/templates/confirm-modal.html',
          controller: 'ConfirmModalCtrl',
          resolve: {
            config: function () {
              return {
                modalContent: '确认要删除历史投资记录吗？'
              };
            }
          }
        });
        /**
         * 点击ok和cancel执行的回调
         * modalInstance.result.then(function () {}, function () {});
         */
        modalInstance.result.then(function () {
          modelDetailsService.deleteHistroyItem({_id: bet._id, time: times.time}, function (data) {
            if (data.success === true) {
              var index = bet.times.indexOf(times);
              bet.times.splice(index, 1);

              commonMethod.convertBetData(bet);
              //计算盈利情况
              commonMethod.calculateProfitStat($scope.betList, $scope.profitStat);
            }
          });
        });
      };

      $scope.endBet = function(bet){
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../../views/templates/confirm-modal.html',
          controller: 'ConfirmModalCtrl',
          resolve: {
            config: function () {
              return {
                modalContent: '确认要结束本期投注吗？'
              };
            }
          }
        });
        modalInstance.result.then(function () {
          modelDetailsService.endBet({_id: bet._id}, function (data) {
            if (data.success === true) {
              bet.isEnd = true;
            }
          });
        });
      };

      $(document).on('click','.lottery-collapsing',function(e){
        var $el = $(e.currentTarget);
        $el.toggleClass('extend');
        $el.siblings().toggle();
      });
    });
});
