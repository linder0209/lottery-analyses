define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ModelCtrl
   * @description
   * # ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.ModelCtrl', [])
    .controller('ModelCtrl', function ($scope, $compile, $lotteryTab) {
      $scope.createModel = function (type) {
        $scope.modelTmpl = '../views/fucai3d/templates/sum-model-tmpl.html';
      };
      var tabVariant = {
        num: 1
      };

      $scope.addTab = function (type) {
        if (type === 'sum') {
          var link = $compile(angular.element(angular.element(document.getElementById('tabHeader')).html()));

          //true参数表示新建一个完全隔离的scope,而不是继承的child scope
          var tabScope = $scope.$new(true);
          var tab;
          var tabDomEl;
          tabScope.tabHeader = {
            num: tabVariant.num++,
            title: '和值',
            close: function () {
              tabDomEl.remove();
              tab.closeTab();
            }
          };
          tabDomEl = link(tabScope);
          angular.element(document.getElementById('tabHeaderContainer')).append(tabDomEl);

          tab = $lotteryTab.createTab({
            templateUrl: '../views/fucai3d/templates/sum-model-tmpl.html',
            controller: 'SumTabCtrl',
            container: $('.group-content')[0],
            scope: tabScope,
            resolve: {}
          });
        }
      };

    })
    .controller('SumTabCtrl', function ($scope) {
      $scope.numbers = {};
      for (var i = 0; i < 27; i++) {
        $scope.numbers[i + ''] = false;
      }
      $scope.selectNumber = function (e) {
        var el = $(e.target);
        if (el.hasClass('active')) {
          el.removeClass('active');
        } else {
          el.addClass('active');
        }
        var uls = el.parent();
        var index = uls.indexOf(el);
        $scope.numbers[index + ''] = !!el.hasClass('active');
      };
    });
});
