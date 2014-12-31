'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 *  福彩3d 盈利模型 Schema
 * @type {Schema}
 */
var schema = new Schema({
  combine: { type: String },//投注组合
  filterRecent: { type: String},//过滤掉近期数据
  type: { type: String }//类型，有和值，组六，组三，直选等，分别为 sum zx6 zx3 zx
});

/**
 * 福彩3d 盈利模型Model
 * @module ProfitModel
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-30
 * */
module.exports = mongodb.model('ProfitModel', schema);
