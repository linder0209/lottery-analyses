'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 收藏足彩模型 Schema
 * @type {Schema}
 */
var schema = new Schema({
  name: { type: String },
  link: { type: String},
  singleAmount: { type: String},//模型单倍金额
  remark: { type: String }
});

/**
 * 收藏足彩模型 Model
 * @module ZucaiFavoriteModel
 * @author Linder linder0209@126.com
 * @createdDate 2014-01-04
 * */
module.exports = mongodb.model('ZucaiFavorite', schema);
