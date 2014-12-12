define(['angular'], function (angular) {
  'use strict';
  angular.module('lotteryAnalysesApp.directives.linkActive', [])
    .directive('linkActive', function ($location) {
      return {
        restrict: 'AC',
        link: function postLink(scope, element, attrs) {
          scope.location = $location;
          scope.$watch('location.path()', function (pathValue) {
            var currentHash = element.children().attr('ng-href').substring(1);
            if (pathValue === currentHash) {
              element.addClass(attrs.linkActive);
            } else {
              element.removeClass(attrs.linkActive);
            }
          });
        }
      };
    });
});
