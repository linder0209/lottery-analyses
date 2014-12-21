'use strict';

var underscore = require('underscore');

/**
 * 创建 MetaData Dao 用来操作 MetaDataModel，实现数据的增删改查等功能
 * @module MetaDataDao
 * @class
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-15
 * */
function MetaDataDao(Model) {
  this.model = Model;
}

var MetaDataModel = require('../../models/fucai3d/MetaDataModel');
var metaDataDao = new MetaDataDao(MetaDataModel);
module.exports = metaDataDao;

/**
 * 批量保存数据
 * @method
 * @param datas {MetaDataModel} MetaDataModel 实例数组
 * @param callback {function}回调函数
 */
MetaDataDao.prototype.saveAll = function (datas, callback) {
  this.remove(function (err) {
    if (err) {
      return callback(err);
    } else {
      MetaDataModel.create(datas, function (err, jellybean, snickers) {
        return callback(err);
      });
    }
  });
};

/**
 * 查询数据，可以按年、按期查询，按期包括 30、 50、 100
 * 默认为查询 30期数据，也可以查询所有的数据
 * @param conditions
 * @param callback
 * @returns {*}
 */
MetaDataDao.prototype.find = function (conditions, callback) {
  if (conditions.byYear) {
    return this.model.find({}, {}, {limit: conditions.period, sort: {period: -1}}, function (err, docs) {
      callback(err, docs);
    });
  } else if (conditions.byPeriod) {
    return this.model.find({year: conditions.year}, {}, {sort: {period: 1}}, function (err, docs) {
      callback(err, docs);
    });
  } else {
    return this.model.find({}, {}, {sort: {period: 1}}, function (err, docs) {
      callback(err, docs);
    });
  }
};

/**
 * 删除记录
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.remove = function (conditions, callback) {
  if (underscore.isFunction(conditions)) {
    callback = conditions;
    conditions = {};
  }
  this.model.remove(conditions, function (err) {
    return callback(err);
  });
};

/**
 * 直选重复出现的几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.zx = function (callback) {

};
/**
 * 组选三重复出现的几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.zx3 = function (callback) {

};
/**
 * 组选六重复出现的几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.zx6 = function (callback) {

};
/**
 * 每个和值出现的几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.sum = function (year, callback) {
  var model = this.model;
  this.model.count(year ? {year: year} : {}, function (err, count) {
    if (err === null) {
      if (year) {
        model.aggregate({$match: {year: year}}, {$group: {_id: '$sum', time: {$sum: 1}}},
          {$sort: {_id: 1}}, function (err, docs) {
            docs.forEach(function (doc) {
              doc.probability = (doc.time / count * 100).toFixed(2) + '%';
            });
            callback(null, docs);
          });
      } else {
        model.aggregate({$group: {_id: '$sum', time: {$sum: 1}}},
          {$sort: {_id: 1}}, function (err, docs) {
            docs.forEach(function (doc) {
              doc.probability = (doc.time / count * 100).toFixed(2) + '%';
            });
            callback(null, docs);
          });
      }
    } else {
      callback(err);
    }
  });
};
/**
 * 组选六最大间隔
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.interval = function (callback) {

};
/**
 * 各种投注中奖几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.capRate = function (callback) {

};
