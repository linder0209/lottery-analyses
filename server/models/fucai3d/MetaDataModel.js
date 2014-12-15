'use strict';

var mongoose = require('mongoose');
var mongodb = require('../../mongodb');
var Schema = mongoose.Schema;

/**
 *  福彩3d Schema
 * @type {Schema}
 */
var schema = new Schema({
  period: { type: String },
  year: { type: String},
  number: { type: String },
  type: { type: String },//类型，组三或组六
  sum: { type: Number },//和值
  size: { type: String }//大小
});

/**
 * 福彩3d Model
 * @module MetaDataModel
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-15
 * */
module.exports = mongodb.model('MetaData', schema);
