'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 足彩组合模型 Schema
 * @type {Schema}
 */
var schema = new Schema({
  name: {type: String},
  combine: {type: Array},//数据模型为 {"invest":50,"name":"单关配1号","_id":"54aa5ef90158f7d83bbe7d89"}
  type: {type: String},
  investment: {type: Number, default: 0},
  bonus: {type: Number, default: 0}
});

/**
 * 收藏足彩模型 Model
 * @module ZucaiCombineModel
 * @author Linder linder0209@126.com
 * @createdDate 2014-01-04
 * */
module.exports = mongodb.model('ZucaiCombine', schema);
