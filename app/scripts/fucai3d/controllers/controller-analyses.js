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
    .controller('AnalysesCtrl', function ($scope, analysesService) {
      $scope.analysesType = 'zx';
      $scope.loadedData = {};

      $scope.years = ['2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002'];

      $scope.analyses = {
        sumYear: '2014',
        sumIntervalYear: '2014'
      };

      //和值统计查询
      $scope.sumQuery = function () {
        analysesService.sum({year: $scope.analyses.sumYear}, function (data) {
          if (data.success === true) {
            $scope.sumDatas = data.items;
          }
        });
      };

      //和值中奖间隔统计表
      $scope.sumIntervalQuery = function () {
        analysesService.sumInterval({year: $scope.analyses.sumIntervalYear}, function (data) {
          if (data.success === true) {
            $scope.sumIntervalDatas = data.items;
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
              $scope.maxOmits = data.maxOmits;
            }
          });
        }
      };

      $scope.getDataByType = function (type) {
        switch (type) {
          case 'sum':
            return {year: $scope.analyses.sumYear};
          case 'sumInterval':
            return {year: $scope.analyses.sumIntervalYear};
        }
        return null;
      };

    });
});
