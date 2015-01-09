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
    .controller('ModelCtrl', function ($scope, $timeout, $modal, modelService) {
      $scope.model = {
        showForm: false,
        name: '',
        type: '2',
        isAction: true
      };

      $scope.modelList = [];//创建的模型列表

      $scope.selectedModel = [];

      modelService.modelList(function (data) {
        if (data.success === true) {
          $scope.modelList = data.items;
          var profitStat = {
            investment: 0,
            bonus: 0
          };
          data.items.forEach(function (item) {
            if (item.isAction) {
              profitStat.investment += item.investment;
              profitStat.bonus += item.bonus;
            }
          });
          profitStat.profit = profitStat.bonus - profitStat.investment;
          profitStat.rateOfReturn = profitStat.investment === 0 ? '0.00%' : (profitStat.bonus / profitStat.investment * 100).toFixed(2) + '%';
          $scope.profitStat = profitStat;
        }
      });

      $scope.createModel = function () {
        $scope.model.showForm = true;
        if (!$scope.favoriteModelList) {
          modelService.favoriteModelList(function (data) {
            if (data.success === true) {
              $scope.favoriteModelList = data.items.map(function (item) {
                item.value = false;
                return item;
              });
            }
          });
        }
      };

      $scope.selectModel = function (field) {
        if (field.value) {
          field = angular.copy(field);
          field.invest = 0;
          $scope.selectedModel.push(field);
        } else {
          var i = -1;
          $scope.selectedModel.forEach(function (item, index) {
            if (item._id === field._id) {
              i = index;
              return false;
            }
          });
          if (i !== -1) {
            $scope.selectedModel.splice(i, 1);
          }
        }
      };

      $scope.saveModel = function () {
        var params = {
          name: $scope.model.name,
          type: $scope.model.type,
          isAction: $scope.model.isAction,
          combine: $scope.selectedModel.map(function (item) {
            return {
              _id: item._id,
              name: item.name,
              link: item.link,
              invest: parseFloat(item.invest)
            };
          })
        };
        modelService.saveModel(params, function (data) {
          if (data.success === true) {
            params._id = data._id;
            params.periods = 0;
            params.investment = 0;
            params.bonus = 0;
            params.returns = 0;
            $scope.modelList.push(params);
            $scope.cancelCreateModel();
          }
        });
      };

      $scope.cancelCreateModel = function () {
        $scope.model.showForm = false;
        //清空表单
        $scope.model.name = '';
        $scope.model.type = '2';
        $scope.favoriteModelList.forEach(function (item) {
          item.value = false;
        });
        $scope.selectedModel.length = 0;
      };

      $scope.removeModel = function (item) {
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../../views/templates/confirm-modal.html',
          controller: 'ConfirmModalCtrl',
          resolve: {
            config: function () {
              return {
                modalContent: '确认要删除该组合模型吗？'
              };
            }
          }
        });
        /**
         * 点击ok和cancel执行的回调
         * modalInstance.result.then(function () {}, function () {});
         */
        modalInstance.result.then(function () {
          modelService.removeModel({_id: item._id}, function (data) {
            if (data.success === true) {
              var index = $scope.modelList.indexOf(item);
              $scope.modelList.splice(index, 1);
            }
          });
        });
      };

      $scope.editModel = function (item) {
        //确保只能修改一条数据
        if ($scope.editing) {
          return;
        }
        $scope.editing = true;
        item.editing = true;
        //保存现场数据
        $scope.editModelData = angular.copy(item);
      };

      $scope.updateModel = function (item) {
        item.combine.forEach(function (it) {
          it.invest = parseFloat(it.invest);
        });

        modelService.updateModel(item, function (data) {
          if (data.success === true) {
            item.editing = false;
            $scope.editing = false;
          }
        });
      };

      $scope.cancelEditModel = function (item) {
        item.editing = false;
        $scope.editing = false;
        //恢复现场数据
        item.name = $scope.editModelData.name;
        item.combine.forEach(function (it, index) {
          it.invest = $scope.editModelData.combine[index].invest;
        });
      };

      $scope.addFavoriteModel = function () {
        $modal.open({
          backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
          //keyboard: false,// 设为false，按 esc键不会关闭 modal
          templateUrl: 'favoriteModelContent.html',
          controller: 'FavoriteModelCtrl',
          size: 'lg',
          resolve: {// 传递数据
            formData: function () {
              return {
                items: $scope.favoriteModelList
              };
            }
          }
        });
      };

      $scope.editFavoriteModel = function (field) {
        $modal.open({
          backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
          //keyboard: false,// 设为false，按 esc键不会关闭 modal
          templateUrl: 'favoriteModelContent.html',
          controller: 'FavoriteModelCtrl',
          size: 'lg',
          resolve: {// 传递数据
            formData: function () {
              return {
                favoriteModel: field,
                items: $scope.favoriteModelList
              };
            }
          }
        });
      };

      $scope.removeFavoriteModel = function (field) {
        var modalInstance = $modal.open({
          backdrop: 'static',
          templateUrl: '../../views/templates/confirm-modal.html',
          controller: 'ConfirmModalCtrl',
          resolve: {
            config: function () {
              return {
                modalContent: '确认要删除该收藏模型吗？'
              };
            }
          }
        });
        /**
         * 点击ok和cancel执行的回调
         * modalInstance.result.then(function () {}, function () {});
         */
        modalInstance.result.then(function () {
          modelService.removeFavoriteModel({_id: field._id}, function (data) {
            if (data.success === true) {
              var index = $scope.favoriteModelList.indexOf(field);
              $scope.favoriteModelList.splice(index, 1);
              var i = -1;
              $scope.selectedModel.forEach(function (item, index) {
                if (item._id === field._id) {
                  i = index;
                  return false;
                }
              });
              if (i !== -1) {
                $scope.selectedModel.splice(i, 1);
              }
            } else {
              if (data.errorMessage === '-1') {
                $scope.$parent.alerts = [
                  {type: 'danger', message: '已有组合模型引用该收藏，不能删除！'}
                ];
              }
            }
          });
        });
      };
    })
    .controller('FavoriteModelCtrl', function ($scope, $modalInstance, modelService, formData) {
      $scope.items = formData.items;
      $scope.favoriteModel = {
        _id: undefined,
        name: '',
        singleAmount: '0',
        link: '',
        remark: '',
        automatic: true,//自动模型或手动模型
        fixed: true,//固定模型
        owns: false//自己创建的模型
      };
      $scope.modelTitle = '添加';
      if (formData.favoriteModel) {
        $scope.favoriteModel = formData.favoriteModel;
      }

      if($scope.favoriteModel._id){
        $scope.modelTitle = '修改';
      }

      $scope.saveFavoriteModel = function () {
        modelService.saveFavoriteModel($scope.favoriteModel, function (data) {
          if (data.success === true) {
            if (!$scope.favoriteModel._id) {//添加
              data.item.value = false;//初始化属性value，用来操作组合模型
              $scope.items.push(data.item);
            }
          }
        });
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
});
