define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.importService',[])
    .factory('importService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        //导入历史数据
        upload: function (data, config, success) {
          lotteryHttpService.post('upload', data, config).then(success);
        }
      };
    }]);
});
