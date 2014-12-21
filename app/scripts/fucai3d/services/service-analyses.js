define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.analysesService',[])
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
          lotteryHttpService.get('fucai3d/analyses/zx6', data).then(success);
        },

        sum: function (data, success) {
          lotteryHttpService.post('fucai3d/analyses/sum', data).then(success);
        },

        interval: function (data, success) {
          lotteryHttpService.get('fucai3d/analyses/interval', data).then(success);
        },

        capRate: function (data, success) {
          lotteryHttpService.get('fucai3d/analyses/capRate', data).then(success);
        }
      };
    }]);
});
