'use strict';

//福彩3d分析页面

/*jshint unused: vars */
require.config({
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    angular: '../../bower_components/angular/angular',
    'angular-animate': '../../bower_components/angular-animate/angular-animate',
    'angular-cookies': '../../bower_components/angular-cookies/angular-cookies',
    'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-route': '../../bower_components/angular-route/angular-route',
    'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
    'angular-scenario': '../../bower_components/angular-scenario/angular-scenario',
    'angular-touch': '../../bower_components/angular-touch/angular-touch',
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
    'angular-bootstrap':  '../../bower_components/angular-bootstrap/ui-bootstrap-tpls'
  },
  shim: {
    angular: {
      exports: 'angular',
      deps: [
        'jquery'
      ]
    },
    'angular-route': [
      'angular'
    ],
    'angular-cookies': [
      'angular'
    ],
    'angular-sanitize': [
      'angular'
    ],
    'angular-resource': [
      'angular'
    ],
    'angular-animate': [
      'angular'
    ],
    'angular-touch': [
      'angular'
    ],
    'angular-mocks': {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    },
    'angular-bootstrap': {
      deps: [
        'angular',
        'bootstrap'
      ]
    }
  },
  priority: [
    'angular'
  ],
  packages: [

  ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'jquery',
  'angular',
  'bootstrap',
  'angular-bootstrap',
  'app',
  'angular-route',
  'angular-cookies',
  'angular-sanitize',
  'angular-resource',
  'angular-animate',
  'angular-touch',
  '../services/httpInterceptor',
  'services/service-import',
  'directives/directive-link-active'
], function(jquery, angular, bootstrap, angularBootstrap, app, ngRoutes, ngCookies, ngSanitize, ngResource, ngAnimate, ngTouch) {
  /* jshint ignore:start */
  var $html = angular.element(document.getElementsByTagName('html')[0]);
  /* jshint ignore:end */
  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});
