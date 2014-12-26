define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.createModelService', [])
    .factory('createModelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        winningRate: function (data, success) {
          lotteryHttpService.post('model/winning-rate', data).then(success);
        },
        winningInfo: function (data, success) {
          lotteryHttpService.post('model/winning-info', data).then(success);
        },
        saveModel: function (data, success) {
          lotteryHttpService.post('model/save-model', data).then(success);
        }
      };
    }]);
});
