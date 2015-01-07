define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.d1ModelService', [])
    .factory('d1ModelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        winningRate: function (data, success) {
          lotteryHttpService.post('d1model/winning-rate', data).then(success);
        },
        winningInfo: function (data, success) {
          lotteryHttpService.post('d1model/winning-info', data).then(success);
        },
        saveModel: function (data, success) {
          lotteryHttpService.post('d1model/save-model', data).then(success);
        }
      };
    }]);
});
