define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {
      $scope.preventDefaultEvent = function (e) {
        var $el = angular.element(e.currentTarget);
        if ($el.parent().hasClass('active')) {
          e.preventDefault();
        }
      };
    })
  /**
   * 通用 Alert 模态窗口 Controller
   * @class AlertModalCtrl
   * @author Linder linder0209@126.com
   * @createdDate 2014-12-30
   * */
    .controller('AlertModalCtrl', function ($scope, $modalInstance, config) {
      $scope.modalTitle = config.modalTitle;
      $scope.modalContent = config.modalContent;
      $scope.hideClose = config.hideClose;
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
});
