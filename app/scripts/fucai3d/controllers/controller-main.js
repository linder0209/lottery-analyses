define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.MainCtrl', []).controller('MainCtrl', function ($scope) {
      $scope.preventDefaultEvent = function (e) {
        var $el = angular.element(e.currentTarget);
        if($el.parent().hasClass('active')){
          e.preventDefault();
        }
      };
    });
});
