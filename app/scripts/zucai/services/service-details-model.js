define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.modelDetailsService', [])
    .factory('modelDetailsService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        betRecord: function (modelId, success) {
          lotteryHttpService.get('betRecord/' + modelId, null).then(success);
        },

        saveBet: function (data, success) {
          lotteryHttpService.post('saveBet', data).then(success);
        },

        deleteBet: function (_id, success) {
          lotteryHttpService.post('deleteBet', {_id: _id}).then(success);
        },

        addInvestItem: function (data, success) {
          lotteryHttpService.post('addInvestItem', data).then(success);
        },

        updateHistroyItem: function (data, success) {
          lotteryHttpService.post('updateHistroyItem', data).then(success);
        },

        deleteHistroyItem: function (data, success) {
          lotteryHttpService.post('deleteHistroyItem', data).then(success);
        },
        endBet: function (data, success) {
          lotteryHttpService.post('endBet', data).then(success);
        },
        restartBet: function (data, success) {
          lotteryHttpService.post('restartBet', data).then(success);
        }
      };
    }])
    .factory('commonMethod', function (lotteryHttpService) {
      var uniqueKeys = 0;
      return {
        convertBetData: function (item) {
          item.combineHeader = [];
          var combine = item.combine;
          //新的投注表单数据
          item.formData = [];
          combine.forEach(function (it) {
            //之所以这样封装，是因为 ng-repeat 不允许出现重复的值
            item.combineHeader.push(
              {name: '投入（参考基数：' + it.invest + '）', id: 'header-' + uniqueKeys++},
              {name: '奖金', id: 'header-' + uniqueKeys++});
            item.formData.push({
              invest: it.invest,
              _id: it._id
            }, {_id: it._id + 'bonus'});
          });

          //历史总投入
          item.historyInvest = 0;
          //历史总回报
          item.historyBonus = 0;

          item.times.forEach(function (it) {
            it.combineContent = [];
            //历史投入
            it.historyInvest = 0;
            //历史回报
            it.historyBonus = 0;
            it.combine.forEach(function (subIt) {
              it.combineContent.push({value: subIt.invest, id: 'content-' + uniqueKeys++},
                {value: subIt.bonus, id: 'content-' + uniqueKeys++});
              it.historyInvest += subIt.invest;
              it.historyBonus += subIt.bonus || 0;

              item.historyInvest += subIt.invest;
              item.historyBonus += subIt.bonus || 0;
            });

            //历史回报
            it.returns = it.historyBonus / it.historyInvest * 100;
          });
          //历史总回报
          item.returns = item.historyBonus / item.historyInvest * 100;
        },

        /**
         * 计算该模型盈利情况
         * @param betList
         * @param profitStat
         */
        calculateProfitStat: function (betList, profitStat) {
          profitStat.investment = 0;
          profitStat.bonus = 0;
          betList.forEach(function (item) {
            profitStat.investment += item.historyInvest;
            profitStat.bonus += item.historyBonus;
          });
          profitStat.profit = profitStat.bonus - profitStat.investment;
          profitStat.rateOfReturn = (profitStat.bonus / profitStat.investment * 100).toFixed(2) + '%';
        }
      };
    });
});
