define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.sumModelService', [])
    .factory('sumModelService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        winningRate: function (data, success) {
          lotteryHttpService.post('summodel/winning-rate', data).then(success);
        },
        winningInfo: function (data, success) {
          lotteryHttpService.post('summodel/winning-info', data).then(success);
        },
        saveModel: function (data, success) {
          lotteryHttpService.post('summodel/save-model', data).then(success);
        }
      };
    }])
    .constant('recentPeriods', [{//历史期数
      byPeriod: true,
      period: 100,
      label: '近100期'
    }, {
      byPeriod: true,
      period: 200,
      label: '近200期'
    }, {
      byPeriod: true,
      period: 300,
      label: '近300期'
    }, {
      byYear: true,
      year: '2014',
      label: '2014年'
    }, {
      byYear: true,
      year: '2013',
      label: '2013年'
    }, {
      byYear: true,
      year: '2013',
      label: '2013年'
    }, {
      byYear: true,
      year: '2012',
      label: '2012年'
    }, {
      byYear: true,
      year: '2011',
      label: '2011年'
    }, {
      byYear: true,
      year: '2010',
      label: '2010年'
    }, {
      byYear: true,
      year: '2009',
      label: '2009年'
    }, {
      byYear: true,
      year: '2008',
      label: '2008年'
    }, {
      byYear: true,
      year: '2007',
      label: '2007年'
    }, {
      byYear: true,
      year: '2006',
      label: '2006年'
    }, {
      byYear: true,
      year: '2005',
      label: '2005年'
    }, {
      byYear: true,
      year: '2004',
      label: '2004年'
    }, {
      byYear: true,
      year: '2003',
      label: '2003年'
    }, {
      byYear: true,
      year: '2002',
      label: '2002年'
    }]);
});
