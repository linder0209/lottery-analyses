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
    .controller('ImportCtrl', function ($scope, $modal, importService, findConditions) {
      $scope.conditions = findConditions;
      $scope.fucai3d = {
        condition : findConditions[0]
      };

      //数据导入
      $scope.import = function(){
        var data = new FormData();
        var files = angular.element('#historyData')[0].files;
        if (files) {
          data.append('importData',files[0]);
        }

        // FIXME 这里不知道利用Angular怎样写上传文件的请求，故先用jQuery来代替
        // 可参考第三方插件 https://www.npmjs.com/package/angular-file-upload 来实现，待研究
        /*var config = {
          cache: false
        };

        importService.upload(data, config, function (data) {
          if (data.success === true) {
            console.info(1);
          }
        });*/

        $.ajax({
          cache: false,
          type: 'post',
          dataType: 'json',
          url:'fucai3d/upload',
          data : data,
          contentType: false,
          processData: false,
          success : function (data) {
            if (data.success === true) {
              $scope.items = data.items;
              $scope.$apply();
              $modal.open({
                templateUrl: '../views/templates/alert-modal.html',
                controller: 'AlertModalCtrl',
                resolve: {
                  config: function () {
                    return {
                      modalContent: '导入数据成功！'
                    };
                  }
                }
              });
            }
          }
        });
      };

      //查询数据
      $scope.find = function(){
        importService.find($scope.fucai3d.condition,  function (data) {
          if (data.success === true) {
            $scope.items = data.items;
            //if (!$scope.$root.$$phase) {
            //  $scope.$apply();
            //}
          }
        });
      };

      $scope.find();
    });
});
