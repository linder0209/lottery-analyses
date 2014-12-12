define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name lotteryAnalysesApp.directive:myDirective
   * @description
   * # myDirective
   */
  angular.module('lotteryAnalysesApp.directives.MyDirective', [])
    .directive('myDirective', function () {
      return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
          element.text('this is the myDirective directive');
        }
      };
    });
});
