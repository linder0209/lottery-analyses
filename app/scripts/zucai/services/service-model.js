define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.modelService', [])
    .factory('modelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        saveModel: function (data, success) {
          lotteryHttpService.post('saveModel', data).then(success);
        },
        updateModel: function (data, success) {
          lotteryHttpService.post('updateModel', data).then(success);
        },
        removeModel: function (data, success) {
          lotteryHttpService.post('removeModel', data).then(success);
        },
        updateModelStatus: function (data, success) {
          lotteryHttpService.post('updateModelStatus', data).then(success);
        },
        saveFavoriteModel: function (data, success) {
          lotteryHttpService.post('saveFavoriteModel', data).then(success);
        },
        favoriteModelList: function (success) {
          lotteryHttpService.get('favoriteModelList', null).then(success);
        },
        removeFavoriteModel: function (data, success) {
          lotteryHttpService.post('removeFavoriteModel', data).then(success);
        },
        modelList: function (success) {
          lotteryHttpService.get('modelList', null).then(success);
        }
      };
    }]);
});
