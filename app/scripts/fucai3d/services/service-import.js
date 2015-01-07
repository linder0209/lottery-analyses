define(['angular'], function (angular) {
  'use strict';

  angular.module('lotteryAnalysesApp.services.importService',[])
    .factory('importService', ['lotteryHttpService', function (lotteryHttpService) {
      return {
        //导入历史数据
        upload: function (data, config, success) {
          lotteryHttpService.post('fucai3d/upload', data, config).then(success);
        },

        find: function (data, success) {
          lotteryHttpService.post('fucai3d/find', data).then(success);
        }
      };
    }])
    .constant('findConditions', [{//查询条件
      byPeriod: true,
      period: 30,
      label: '近30期'
    },{
      byPeriod: true,
      period: 50,
      label: '近50期'
    },{
      byPeriod: true,
      period: 100,
      label: '近100期'
    },{
      byPeriod: true,
      period: 300,
      label: '近300期'
    },{
      byPeriod: true,
      period: 500,
      label: '近500期'
    },{
      byPeriod: true,
      period: 1000,
      label: '近1000期'
    },{
      byYear: true,
      year: '2014',
      label: '2014年'
    },{
      byYear: true,
      year: '2013',
      label: '2013年'
    },{
      byYear: true,
      year: '2013',
      label: '2013年'
    },{
      byYear: true,
      year: '2012',
      label: '2012年'
    },{
      byYear: true,
      year: '2011',
      label: '2011年'
    },{
      byYear: true,
      year: '2010',
      label: '2010年'
    },{
      byYear: true,
      year: '2009',
      label: '2009年'
    },{
      byYear: true,
      year: '2008',
      label: '2008年'
    },{
      byYear: true,
      year: '2007',
      label: '2007年'
    },{
      byYear: true,
      year: '2006',
      label: '2006年'
    },{
      byYear: true,
      year: '2005',
      label: '2005年'
    },{
      byYear: true,
      year: '2004',
      label: '2004年'
    },{
      byYear: true,
      year: '2003',
      label: '2003年'
    },{
      byYear: true,
      year: '2002',
      label: '2002年'
    }]);
});
