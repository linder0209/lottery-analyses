define(['angular'], function (angular) {
  'use strict';
  var requestsNum = 0;

  /**
   * register the interceptor as a service
   * 给 http 请求注册一个拦截器
   */
  angular.module('lotteryAnalysesApp.services.lotteryHttpInterceptor',[])
    .factory('lotteryHttpInterceptor', ['$q', function ($q) {
      return {
        // optional method
        'request': function (config) {
          // do something on success
          return config || $q.when(config);
        },

        // optional method
        'requestError': function (rejection) {
          // do something on error
          return $q.reject(rejection);
        },

        // optional method
        'response': function (response) {
          // do something on success
          return response || $q.when(response);
        },

        // optional method
        'responseError': function (rejection) {
          // do something on error
          return $q.reject(rejection);
        }
      };
    }])
    .config(['$httpProvider', function ($httpProvider) {
      //为 $httpProvider 加入拦击器 hfbHttpInterceptor
      $httpProvider.interceptors.push('lotteryHttpInterceptor');
      $httpProvider.defaults.transformRequest.push(function (data, headersGetter) {
        //发送请求的时候执行，在这里可以拦截发送数据，data指发送的数据
        if(angular.element(document.body).attr('start-ajax-loading')){
          requestsNum++;//每发一次请求，增加一
          if (!angular.element.data(document.body, 'initAjaxLoading')) {
            angular.element('body').append('<div class="ajax-loading-backdrop" id="ajaxLoading"><div class="ajax-loading"></div></div>');
            angular.element.data(document.body, 'initAjaxLoading', true);
          }
          angular.element('#ajaxLoading').show();
        }
        return data;
      });
      $httpProvider.defaults.transformResponse.push(function (data, headersGetter) {
        if(angular.element(document.body).attr('start-ajax-loading')){
          requestsNum--;//每次相应减一
          if(requestsNum === 0){
            angular.element('#ajaxLoading').hide();
          }
        }
        //发送请求完响应的时候执行，在这里可以拦截响应数据，data是响应返回的数据
        if (data.success === false) {
          switch (data.errorCode) {
            case '9001':
              document.location.href = '/error?errorCode=' + data.errorCode;
              break;
          }
        }
        return data;
      });

      /**
       * Setting HTTP Headers 详细看官方文档，可以设置http headers
       * http://docs.angularjs.org/api/ng/service/$http
       * Ajax请求，标准用法 x-requested-with = XMLHttpRequest
       */
      $httpProvider.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
    }])
    .factory('lotteryHttpService', ['$http', '$q', function ($http, $q) {// 创建 custom Http Service
      return {
        get: function (url, config) {
          var defer = $q.defer();
          $http.get(url, config).
            success(function (data, status) {
              defer.resolve(data);
            }).
            error(function (data, status) {
              console.error(data);
            });
          return defer.promise;
        },
        post: function (url, data, config) {
          var defer = $q.defer();
          $http.post(url, data, config).
            success(function (data, status) {
              defer.resolve(data);
            }).
            error(function (data, status) {
              console.error(data);
            });
          return defer.promise;
        },
        /*
         * The delete is the keyword, it is error in ie8.
         */
        'delete': function (url, config) {
          var defer = $q.defer();
          $http.delete(url, config).
            success(function (data, status) {
              defer.resolve(data);
            }).
            error(function (data, status) {
              console.error(data);
            });
          return defer.promise;
        }
      };
    }]);
});
