'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 * 足彩投注记录 Schema
 * @type {Schema}
 */
var schema = new Schema({
  modelId: {type: String},
  period: {type: Number},
  //模型组合
  //数据模型 [{name:'单关配1号',"link" : "http://winner.okooo.com/model/info?mid=1416369356868",_id:'54aa5ef90158f7d83bbe7d89', invest: 50, }]
  combine: {type: Array},
  //投注次数，记录每次投注的信息，包括投注金额，中奖金额等信息，其中time为唯一性，通过time来查找数据
  //数据模型为：[{time: 1, createdDate: new Date, betDate: '2015-01-21', combine: [{invest: 50, bonus: 200, _id:'54aa5ef90158f7d83bbe7d89'}}]]
  times: {type: Array},
  isEnd: {type: Boolean, default: false},
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

/**
 * 足彩投注记录 Model
 * @module ZucaiBetModel
 * @author Linder linder0209@126.com
 * @createdDate 2014-01-04
 * */
module.exports = mongodb.model('ZucaiBet', schema);
