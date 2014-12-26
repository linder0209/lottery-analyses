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
 * 和值中奖间隔统计数据
 * @param year
 * @param callback
 */
MetaDataDao.prototype.sumInterval = function (year, callback) {
  var model = this.model;
  this.model.count(year ? {year: year} : {}, function (err, count) {
    if (err === null) {
      var omits = {},
        maxOmits = [];

      for (var i = 0; i <= 27; i++) {
        omits[i + ''] = {
          value: 0
        };
        maxOmits[i] = {
          value: 0
        };
      }
      model.find(year ? {year: year} : {}, {
        _id: 1,
        period: 1,
        number: 1,
        sum: 1
      }, {sort: {period: 1}}, function (err, docs) {
        if (err === null) {
          var items = [];
          docs.forEach(function (doc) {
            var item = doc._doc;
            var sum = item.sum;
            /*jshint -W089*/
            for (var o in omits) {
              if (o === sum + '') {
                if (maxOmits[o].value < omits[o + ''].value) {
                  maxOmits[o].value = omits[o + ''].value;
                }
                omits[o + ''].value = 0;
                item[o + ''] = {
                  winning: true,
                  omit: 0
                };
              } else {
                omits[o + ''].value++;
                item[o + ''] = {
                  winning: false,
                  omit: omits[o + ''].value
                };
              }
            }
            items.push(item);
          });
          maxOmits.forEach(function (item) {
            if (item.value === 0) {
              item.value = count;
            }
          });
          callback(null, items, maxOmits);
        } else {
          callback(err);
        }
      });
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

MetaDataDao.prototype.winningRate = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;

  this.find({}, {_id: 1, period: 1, number: 1, sum: 1}, {sort: {period: -1}, limit: 100}, function (err, docs) {
    if (err) {
      callback(err);
    } else {
      var winning = 0;
      var winningRatePercent;
      if (!filterRecent) {
        docs.forEach(function (doc) {
          var item = doc._doc;
          var sum = item.sum;
          if (combine.indexOf(sum) !== -1) {
            winning++;
          }
        });
        winningRatePercent = winning + '%';
      }

      callback(null, winningRatePercent);
    }
  });
};


MetaDataDao.prototype.winningInfo = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;
  var recentPeriod = parseInt(conditions.recentPeriod);

  this.find({}, {_id: 1, period: 1, number: 1, sum: 1}, {
    sort: {period: -1},
    limit: recentPeriod
  }, function (err, docs) {
    if (err) {
      callback(err);
    } else {
      var historyDataRate = [];
      if (!filterRecent) {
        docs.forEach(function (doc) {
          var item = doc._doc;
          var sum = item.sum;
          if (combine.indexOf(sum) !== -1) {
            item.bonus = bonus[sum];
            item.returns = (item.bonus / combine.length * 2 * 100) .toFixed(2) + '%';
          }
          historyDataRate.push(item);
        });
      }

      callback(null, historyDataRate);
    }
  });
};

function bonus(sum) {
  var bon = {
    '0': 1024,
    '1': 345,
    '2': 172,
    '3': 104,
    '4': 69,
    '5': 49,
    '6': 37,
    '7': 29,
    '8': 23,
    '9': 19,
    '10': 16,
    '11': 15,
    '12': 15,
    '13': 14,
    '14': 14,
    '15': 15,
    '16': 15,
    '17': 16,
    '18': 19,
    '19': 23,
    '20': 29,
    '21': 37,
    '22': 49,
    '23': 69,
    '24': 104,
    '25': 172,
    '26': 345,
    '27': 1024
  };
  return bon[sum];

}


