define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.analysesService', [])
    .factory('analysesService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        //导入历史数据
        zx: function (data, success) {
          lotteryHttpService.get('fucai3d/analyses/zx', data).then(success);
        },

        zx3: function (data, success) {
          lotteryHttpService.get('fucai3d/analyses/zx3', data).then(success);
        },

        zx6: function (data, success) {
          lotteryHttpService.post('fucai3d/analyses/zx6', data).then(success);
        },

        sum: function (data, success) {
          lotteryHttpService.post('fucai3d/analyses/sum', data).then(success);
        },

        sumInterval: function (data, success) {
          lotteryHttpService.post('fucai3d/analyses/sumInterval', data).then(success);
        },

        zx6Interval: function (data, success) {
          lotteryHttpService.post('fucai3d/analyses/zx6Interval', data).then(success);
        },

        capRate: function (data, success) {
          lotteryHttpService.get('fucai3d/analyses/capRate', data).then(success);
        }
      };
    }])
    .factory('combine', function () {
      return {
        //组选6组合
        zx6: function () {
          var combines = [];
          for (var i = 0; i <= 9; i++) {
            for (var j = i + 1; j <= 9; j++) {
              for (var k = j + 1; k <= 9; k++) {
                combines.push(i + ',' + j + ',' + k);
              }
            }
          }
          return combines;
        }
      };
    });
});
