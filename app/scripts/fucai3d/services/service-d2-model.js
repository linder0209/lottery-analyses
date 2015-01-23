define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.d2ModelService', [])
    .factory('d2ModelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        winningRate: function (data, success) {
          lotteryHttpService.post('d2model/winning-rate', data).then(success);
        },
        winningInfo: function (data, success) {
          lotteryHttpService.post('d2model/winning-info', data).then(success);
        },
        saveModel: function (data, success) {
          lotteryHttpService.post('d2model/save-model', data).then(success);
        }
      };
    }]);
});
