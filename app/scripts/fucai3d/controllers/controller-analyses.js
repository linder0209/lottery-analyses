define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:AnalysesCtrl
   * @description
   * # AnalysesCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.AnalysesCtrl', [])
    .controller('AnalysesCtrl', function ($scope, analysesService, combine) {
      $scope.analysesType = 'zx';
      $scope.loadedData = {};

      $scope.years = ['2014,2013,2012', '2014,2013','2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002'];

      $scope.analyses = {
        zx6Year: '2014',
        sumYear: '2014',
        sumIntervalYear: '2014',
        zx6IntervalYear: '2014'
      };

      $scope.zx6Combine = combine.zx6();

      //组选六统计查询
      $scope.zx6Query = function () {
        analysesService.zx6({year: $scope.analyses.zx6Year}, function (data) {
          if (data.success === true) {
            $scope.zx6Datas = data.items;
          }
        });
      };

      //和值统计查询
      $scope.sumQuery = function () {
        analysesService.sum({year: $scope.analyses.sumYear}, function (data) {
          if (data.success === true) {
            $scope.sumDatas = data.items;
          }
        });
      };

      //和值中奖间隔统计
      $scope.sumIntervalQuery = function () {
        analysesService.sumInterval({year: $scope.analyses.sumIntervalYear}, function (data) {
          if (data.success === true) {
            $scope.sumIntervalDatas = data.items;
            $scope.minOmits = data.minOmits;
            $scope.maxOmits = data.maxOmits;
          }
        });
      };

      //组选六最大间隔
      $scope.zx6IntervalQuery = function () {
        analysesService.zx6Interval({year: $scope.analyses.zx6IntervalYear}, function (data) {
          if (data.success === true) {
            $scope.zx6IntervalDatas = data.items;
            $scope.minOmits = data.minOmits;
            $scope.maxOmits = data.maxOmits;
          }
        });
      };

      $scope.startAnalyses = function (type) {
        $scope.analysesType = type;
        if (!$scope.loadedData[type]) {
          var data = $scope.getDataByType(type);
          analysesService[type](data, function (data) {
            if (data.success === true) {
              $scope.loadedData[type] = true;
              $scope[type + 'Datas'] = data.items;
              $scope.minOmits = data.minOmits;
              $scope.maxOmits = data.maxOmits;
            }
          });
        }
      };

      $scope.getDataByType = function (type) {
        switch (type) {
          case 'zx6':
            return {year: $scope.analyses.zx6Year};
          case 'sum':
            return {year: $scope.analyses.sumYear};
          case 'sumInterval':
            return {year: $scope.analyses.sumIntervalYear};
          case 'zx6Interval':
            return {year: $scope.analyses.zx6IntervalYear};
        }
        return null;
      };

    });
});
