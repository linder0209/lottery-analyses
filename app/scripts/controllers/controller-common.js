define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:Zx6ModelCtrl
   * @description
   * # Zx6ModelCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.CommonCtrl', [])
    .controller('CommonCtrl', function ($scope) {
      //页面中输出的alert提示信息
      $scope.alerts = [];
      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
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
    })
  /**
   * 通用 Confirm 模态窗口 Controller
   * @class ConfirmModalCtrl
   * @author Linder linder0209@126.com
   * @createdDate 2014-12-30
   * */
    .controller('ConfirmModalCtrl', function ($scope, $modalInstance, config) {
      $scope.modalTitle = config.modalTitle;
      $scope.modalContent = config.modalContent;
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });

});
