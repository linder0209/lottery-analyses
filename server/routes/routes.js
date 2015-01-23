'use strict';

var index = require('./index');
var fucai3d = require('./lottery/fucai3d/index');
var fucai3dAnalyses = require('./lottery/fucai3d/analyses');
var fucai3dSumModel =  require('./lottery/fucai3d/sum-model');
var fucai3dZx6Model =  require('./lottery/fucai3d/zx6-model');
var fucai3dD1Model =  require('./lottery/fucai3d/d1-model');
var fucai3dD2Model =  require('./lottery/fucai3d/d2-model');
var zucai = require('./lottery/zucai/index');


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
  app.use('/lottery/fucai3d', fucai3d);
  app.use('/lottery/fucai3d/analyses', fucai3dAnalyses);
  app.use('/lottery/fucai3d/summodel', fucai3dSumModel);
  app.use('/lottery/fucai3d/zx6model', fucai3dZx6Model);
  app.use('/lottery/fucai3d/d1model', fucai3dD1Model);
  app.use('/lottery/fucai3d/d2model', fucai3dD2Model);
  app.use('/lottery/zucai', zucai);

};
