define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name lotteryanalysesApp.controller:ImportCtrl
   * @description
   * # ImportCtrl
   * Controller of the lotteryanalysesApp
   */
  angular.module('lotteryAnalysesApp.controllers.ImportCtrl', [])
    .controller('ImportCtrl', function ($scope, importService) {
      $scope.import = function(){
        var data = new FormData();
        var files = angular.element('#historyData')[0].files;
        if (files) {
          data.append('importData',files[0]);
        }
        var config = {
          cache: false,
          dataType: 'json',
          contentType: false,
          processData: false
        };

        importService.upload(data, config, function (data) {
          if (data.success === true) {
            console.info(1);
          }
        });

        /*$.ajax({
          cache: false,
          type: 'post',
          dataType: 'json',
          url:'upload',
          data : data,
          contentType: false,
          processData: false,
          success : function () {

          }
        });*/
      };
    });
});
