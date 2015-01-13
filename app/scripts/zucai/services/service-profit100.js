define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.profit100Service', [])
    .factory('profit100Service', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        profit100Data: function (success) {
          lotteryHttpService.get('profit100Data', null).then(success);
        }
      };
    }]);
});
