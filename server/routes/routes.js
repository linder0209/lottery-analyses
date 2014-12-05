'use strict';

var index = require('./index');
var lottery = require('./lottery');


/**
 * 页面相关路由抽象实现，即访问页面的url
 * 该实现把所有路由的接口都封装到该文件中
 * @example
 app.use('/', index);

 * @module routes
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */

module.exports = function (app) {
  app.use('/', index);
  app.use('/lottery', lottery);
};
