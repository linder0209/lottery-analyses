'use strict';
angular.module('lottery.ui.tab', [])
  .factory('$lotteryTabStack', ['$timeout', '$document', '$compile', '$rootScope',
    function ($timeout, $document, $compile, $rootScope) {

      var tabDomEl;
      var $lotteryTabStack = {};

      function removeTab(scope) {
        if(tabDomEl){
          tabDomEl.remove();
          //scope.$apply();
        }
      }

      $lotteryTabStack.createTab = function (tabInstance, tab) {

        var $selectorContainer = angular.element(tab.container);

        var angularDomEl = angular.element('<div></div>');
        angularDomEl.html(tab.content);

        tabDomEl = $compile(angularDomEl)(tab.scope);
        $selectorContainer.append(tabDomEl);
      };

      $lotteryTabStack.closeTab = function (scope) {
        removeTab(scope);
      };

      return $lotteryTabStack;
    }])

  .provider('$lotteryTab', function () {

    var $lotteryTabProvider = {
      options: {
        container: document.body
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$lotteryTabStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $lotteryTabStack) {

          var $lotteryTab = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                {cache: $templateCache}).then(function (result) {
                  return result.data;
                });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $lotteryTab.createTab = function (tabOptions) {

            var tabResultDeferred = $q.defer();
            var tabOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var tabInstance = {
              result: tabResultDeferred.promise,
              opened: tabOpenedDeferred.promise
            };

            //merge and clean up options
            tabOptions = angular.extend({}, $lotteryTabProvider.options, tabOptions);
            tabOptions.resolve = tabOptions.resolve || {};

            //verify options
            if (!tabOptions.template && !tabOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var tabScope = (tabOptions.scope || $rootScope).$new();

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(tabOptions)].concat(getResolvePromises(tabOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (tabOptions.controller) {
                ctrlLocals.$scope = tabScope;
                ctrlLocals.$tabInstance = tabInstance;
                angular.forEach(tabOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(tabOptions.controller, ctrlLocals);
                if (tabOptions.controllerAs) {
                  tabScope[tabOptions.controllerAs] = ctrlInstance;
                }
              }


              $lotteryTabStack.createTab(tabInstance, {
                scope: tabScope,
                deferred: tabResultDeferred,
                content: tplAndVars[0],
                container: tabOptions.container
              });

            }, function resolveError(reason) {
              tabResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              tabOpenedDeferred.resolve(true);
            }, function () {
              tabOpenedDeferred.reject(false);
            });

            tabInstance.closeTab = function(){
              $lotteryTabStack.closeTab(tabScope);
            };
            return tabInstance;
          };

          return $lotteryTab;
        }]
    };

    return $lotteryTabProvider;
  });
