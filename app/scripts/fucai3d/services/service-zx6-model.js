define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.zx6ModelService', [])
    .factory('zx6ModelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        winningRate: function (data, success) {
          lotteryHttpService.post('zx6model/winning-rate', data).then(success);
        },
        winningInfo: function (data, success) {
          lotteryHttpService.post('zx6model/winning-info', data).then(success);
        },
        saveModel: function (data, success) {
          lotteryHttpService.post('zx6model/save-model', data).then(success);
        }
      };
    }]);
});
