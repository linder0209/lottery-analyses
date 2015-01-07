'use strict';

var underscore = require('underscore');
var commonMethod = require('../../utils/commonMethod');

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
var ProfitModel = require('../../models/fucai3d/ProfitModel');
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
    return this.model.find({year: conditions.year}, {}, {sort: {period: -1}}, function (err, docs) {
      callback(err, docs);
    });
  } else if (conditions.byPeriod) {
    return this.model.find({}, {}, {limit: conditions.period, sort: {year: -1, period: -1}}, function (err, docs) {
      callback(err, docs);
    });
  } else {
    return this.model.find({}, {}, {sort: {year: -1, period: -1}}, function (err, docs) {
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
MetaDataDao.prototype.zx6 = function (year, callback) {
  var model = this.model;
  var conditions = {};
  var conditions2 = {$match: {type: '组六'}};
  if (year) {
    conditions = {year: {$in: year.split(',')}};
    conditions2 = {$match: {year: {$in: year.split(',')}, type: '组六'}};
  }
  this.model.count(conditions, function (err, count) {
    if (err === null) {
      model.aggregate(conditions2, {$group: {_id: '$combine', time: {$sum: 1}}}, {$sort: {time: -1}},
        function (err, docs) {
          docs.forEach(function (doc) {
            doc.probability = (doc.time / count * 100).toFixed(2) + '%';
          });
          callback(null, docs);
        });
    } else {
      callback(err);
    }
  });
};
/**
 * 每个和值出现的几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.sum = function (year, callback) {
  var model = this.model;
  var conditions = {};
  if (year) {
    conditions = {year: {$in: year.split(',')}};
  }
  this.model.count(conditions, function (err, count) {
    if (err === null) {
      if (year) {
        model.aggregate({$match: {year: {$in: year.split(',')}}}, {$group: {_id: '$sum', time: {$sum: 1}}},
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
  var omits = {},
    minOmits = [],
    maxOmits = [];

  for (var i = 0; i <= 27; i++) {
    omits[i + ''] = {
      value: 0
    };
    minOmits[i] = {
      value: Infinity
    };
    maxOmits[i] = {
      value: 0
    };
  }
  var conditions = {};
  if (year) {
    conditions = {year: {$in: year.split(',')}};
  }
  this.model.find(conditions, {
    _id: 1,
    period: 1,
    number: 1,
    sum: 1
  }, {sort: {year: 1, period: 1}}, function (err, docs) {
    if (err === null) {
      var items = [];
      var len = docs.length;
      docs.forEach(function (doc, index) {
        var item = doc._doc;
        var sum = item.sum;
        /*jshint -W089*/
        for (var o in omits) {
          if (o === sum + '') {
            if (index !== 0 && minOmits[o].value > omits[o + ''].value) {
              minOmits[o].value = omits[o + ''].value;
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
            if (index === len - 1 && minOmits[o].value > omits[o + ''].value) {
              minOmits[o].value = omits[o + ''].value;
            }
            if (index === len - 1 && maxOmits[o].value === 0) {
              maxOmits[o].value = len;
            }
          }
          if (maxOmits[o].value < omits[o + ''].value) {
            maxOmits[o].value = omits[o + ''].value;
          }
        }
        items.push(item);
      });
      callback(null, items, minOmits, maxOmits);
    } else {
      callback(err);
    }
  });
};

/**
 * 组选六最大间隔
 * @method
 * @param year
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.zx6Interval = function (year, callback) {
  var omits = [],
    minOmits = [],
    maxOmits = [];

  var combine = commonMethod.zx6Combine();
  var i, len = combine.length;
  for (i = 0; i < len; i++) {
    omits[i] = {
      combine: combine[i],
      value: 0
    };
    minOmits[i] = {
      value: Infinity
    };
    maxOmits[i] = {
      value: 0
    };
  }

  var conditions = {};
  if (year) {
    conditions = {year: {$in: year.split(',')}};
  }
  this.model.find(conditions, {
    _id: 1,
    period: 1,
    number: 1
  }, {sort: {year: 1, period: 1}}, function (err, docs) {
    if (err === null) {
      var items = [];
      var size = docs.length;
      docs.forEach(function (doc, index) {
        var item = doc._doc;
        var zx6Combine = [];
        var number = item.number;
        for (i = 0; i < len; i++) {
          if (commonMethod.equalZx6Combine(omits[i].combine, number)) {
            if (index !== 0 && minOmits[i].value > omits[i].value) {
              minOmits[i].value = omits[i].value;
            }
            omits[i].value = 0;
            zx6Combine[i] = {
              winning: true,
              omit: 0
            };
          } else {
            omits[i].value++;
            zx6Combine[i] = {
              winning: false,
              omit: omits[i].value
            };
            if (index === size - 1 && minOmits[i].value > omits[i].value) {
              minOmits[i].value = omits[i].value;
            }
            if (index === size - 1 && maxOmits[i].value === 0) {
              zx6Combine.value = size;
            }
          }
          if (maxOmits[i].value < omits[i].value) {
            maxOmits[i].value = omits[i].value;
          }
        }
        item.zx6Combine = zx6Combine;
        items.push(item);
      });
      callback(null, items, minOmits, maxOmits);
    } else {
      callback(err);
    }
  });
};
/**
 * 各种投注中奖几率
 * @method
 * @param callback {function} 回调函数
 */
MetaDataDao.prototype.capRate = function (callback) {

};

//创建和值模型
MetaDataDao.prototype.winningRate = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;
  if (!combine) {
    return callback(new Error('请至少选择一个投注'));
  }
  this.model.find({}, {_id: 1, period: 1, number: 1, sum: 1}, {
    sort: {year: -1, period: -1},
    limit: 100
  }, function (err, docs) {
    if (err) {
      callback(err);
    } else {
      var winning = 0;
      var winningRatePercent;
      var returnsPercent;
      var bonus = 0;
      if (!filterRecent) {
        docs.forEach(function (doc) {
          var item = doc._doc;
          var sum = item.sum;
          if (combine.indexOf(sum + '') !== -1) {
            winning++;
            bonus += commonMethod.bonusBySum(sum);
          }
        });
        winningRatePercent = winning + '%';
        returnsPercent = (bonus / (combine.length * 2 * 100) * 100).toFixed(2) + '%';
      }

      callback(null, {
        winningRatePercent: winningRatePercent,
        returnsPercent: returnsPercent
      });
    }
  });
};


MetaDataDao.prototype.winningInfo = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;
  var recentPeriod = conditions.recentPeriod;
  if (!combine) {
    return callback(new Error('请至少选择一个投注'));
  }
  var condition = {};
  var options = {};
  if (recentPeriod.byYear) {
    condition = {year: recentPeriod.year};
    options = {sort: {period: -1}};
  } else if (recentPeriod.byPeriod) {
    options = {
      sort: {year: -1, period: -1},
      limit: recentPeriod.period
    };
  }

  this.model.find(condition, {_id: 1, period: 1, number: 1, sum: 1}, options,
    function (err, docs) {
      if (err) {
        callback(err);
      } else {
        var winning = 0;
        var winningRatePercent;
        var returnsPercent;
        var historyDataRate = [];
        if (!filterRecent) {
          var periods = recentPeriod.byPeriod ? recentPeriod.period : docs.length;
          var bonus = 0;
          docs.forEach(function (doc) {
            var item = doc._doc;
            var sum = item.sum;
            if (combine.indexOf(sum + '') !== -1) {
              winning++;
              item.bonus = commonMethod.bonusBySum(sum);
              item.returns = (item.bonus / (combine.length * 2) * 100).toFixed(2) + '%';
              bonus += commonMethod.bonusBySum(sum);
            }
            historyDataRate.push(item);
          });
          winningRatePercent = (winning / periods * 100).toFixed(2) + '%';
          returnsPercent = (bonus / (combine.length * 2 * periods) * 100).toFixed(2) + '%';
        }

        callback(null, {
          winningRatePercent: winningRatePercent,
          returnsPercent: returnsPercent,
          historyDataRate: historyDataRate
        });
      }
    });
};

MetaDataDao.prototype.saveModel = function (data, callback) {
  var entity = new ProfitModel(data);
  entity.save(function (err, product, numberAffected) {
    callback(err);
  });
};

//创建组选6模型
MetaDataDao.prototype.winningRateZx6 = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;
  filterRecent = filterRecent ? parseInt(filterRecent) : 0;
  if (!combine || combine.length < 3) {
    return callback(new Error('请至少选择三个'));
  }
  var zx6Combine = commonMethod.subZx6Combine(combine);
  //过滤掉顺子号
  zx6Combine = commonMethod.filterCombine(zx6Combine, [3]);
  //默认统计100期数据
  var period = 100;
  period += filterRecent;

  this.model.find({}, {_id: 1, period: 1, number: 1, combine: 1}, {
    sort: {year: -1, period: -1},
    limit: period
  }, function (err, docs) {
    if (err) {
      callback(err);
    } else {
      var _docs = underscore.clone(docs).slice(0, 100);

      var winning = 0;
      var winningRatePercent;
      var returnsPercent;
      var investment = 0;//投入
      var bonus = 0;//回报
      _docs.forEach(function (doc, index) {
        var item = doc._doc;
        var comb = item.combine;
        var _zx6Combine = underscore.clone(zx6Combine);

        //先过滤掉历史数据
        for (var i = index + 1; i < index + 1 + filterRecent; i++) {
          var k = _zx6Combine.indexOf(docs[i]._doc.combine);
          if (k !== -1) {
            _zx6Combine[k] = false;
          }
        }
        _zx6Combine = _zx6Combine.filter(function (item) {
          return item !== false;
        });
        investment += _zx6Combine.length * 2;

        //比较本期是否中奖
        if (_zx6Combine.indexOf(comb) !== -1) {
          winning++;
          bonus += 173;
        }
      });
      winningRatePercent = winning.toFixed(2) + '%';
      returnsPercent = bonus === 0 ? '0.00%' : (bonus / investment * 100).toFixed(2) + '%';

      callback(null, {
        winningRatePercent: winningRatePercent,
        returnsPercent: returnsPercent
      });
    }
  });
};


MetaDataDao.prototype.winningInfoZx6 = function (conditions, callback) {
  var combine = conditions.combine;
  var filterRecent = conditions.filterRecent;
  var recentPeriod = conditions.recentPeriod;
  if (!combine || combine.length < 3) {
    return callback(new Error('请至少选择三个'));
  }

  function processData(err, docs, periods) {
    if (err) {
      callback(err);
    } else {
      var _docs = underscore.clone(docs).slice(0, periods);

      var winning = 0;
      var winningRatePercent;
      var returnsPercent;
      var historyDataRate = [];
      var investment = 0;//投入
      var bonus = 0;//回报

      var zx6Combine = commonMethod.subZx6Combine(combine);
      //过滤掉顺子号
      zx6Combine = commonMethod.filterCombine(zx6Combine, [3]);

      _docs.forEach(function (doc, index) {
        var item = doc._doc;
        var comb = item.combine;
        var _zx6Combine = underscore.clone(zx6Combine);
        item.shape = commonMethod.getShape(item.number, true);

        //先过滤掉历史数据
        for (var i = index + 1; i < index + 1 + filterRecent; i++) {
          var k = _zx6Combine.indexOf(docs[i]._doc.combine);
          if (k !== -1) {
            _zx6Combine[k] = false;
          }
        }
        _zx6Combine = _zx6Combine.filter(function (item) {
          return item !== false;
        });
        investment += _zx6Combine.length * 2;
        item.investment = _zx6Combine.length * 2;

        //比较本期是否中奖
        if (_zx6Combine.indexOf(comb) !== -1) {
          winning++;
          item.bonus = 173;
          item.returns = (item.bonus / (_zx6Combine.length * 2) * 100).toFixed(2) + '%';
          bonus += 173;
        }
        historyDataRate.push(item);
      });
      winningRatePercent = (winning / periods * 100).toFixed(2) + '%';
      returnsPercent = bonus === 0 ? '0.00%' : (bonus / investment * 100).toFixed(2) + '%';

      callback(null, {
        winningRatePercent: winningRatePercent,
        returnsPercent: returnsPercent,
        historyDataRate: historyDataRate
      });
    }
  }

  filterRecent = filterRecent ? parseInt(filterRecent) : 0;
  var condition = {};
  var options = {};
  var model = this.model;

  if (recentPeriod.byYear) {
    condition = {year: recentPeriod.year};
    this.model.count(condition, function (err, count) {
      if (err === null) {
        condition = {year: {$in: [recentPeriod.year, recentPeriod.year - 1 + '']}};
        options = {
          sort: {year: -1, period: -1},
          limit: count + filterRecent
        };
        model.find(condition, {_id: 1, period: 1, number: 1, combine: 1}, options,
          function (err, docs) {
            processData(err, docs, count);
          });
      } else {
        callback(err);
      }
    });
  } else if (recentPeriod.byPeriod) {
    options = {
      sort: {year: -1, period: -1},
      limit: recentPeriod.period + filterRecent
    };

    model.find({}, {_id: 1, period: 1, number: 1, combine: 1}, options,
      function (err, docs) {
        processData(err, docs, recentPeriod.period);
      });

  }

};

MetaDataDao.prototype.saveModelZx6 = function (data, callback) {
  var entity = new ProfitModel(data);
  entity.save(function (err, product, numberAffected) {
    callback(err);
  });
};


//创建1d、猜1d模型
MetaDataDao.prototype.winningRateD1 = function (conditions, callback) {
  var combine = conditions.combine;
  var type = conditions.type;
  var filterRecent = conditions.filterRecent;
  filterRecent = filterRecent ? parseInt(filterRecent) : 0;
  //默认统计100期数据
  var period = 100;
  period += filterRecent;

  this.model.find({}, {_id: 1, period: 1, number: 1}, {
    sort: {year: -1, period: -1},
    limit: period
  }, function (err, docs) {
    if (err) {
      callback(err);
    } else {
      var _docs = underscore.clone(docs).slice(0, 100);

      var winning = 0;
      var winningRatePercent;
      var returnsPercent;
      var investment = 0;//总投入
      var bonus = 0;//总回报
      var invest = 0;//每次投入
      var bonu = 0;//每次回报

      _docs.forEach(function (doc, index) {
        var item = doc._doc;
        var number = item.number.split(',');
        var _combine = [];
        var i, j, k;
        var hisNum;

        for (i = 0; i < 3; i++) {
          _combine.push(underscore.clone(combine[i]));
        }

        if (type === 'bet1d') {
          //先过滤掉历史数据
          for (i = index + 1; i < index + 1 + filterRecent; i++) {
            hisNum = docs[i]._doc.number.split(',');
            for (j = 0; j < 3; j++) {
              k = _combine[j].indexOf(hisNum[j] - 0);
              if (k !== -1) {
                _combine[j][k] = false;
              }
            }
          }

          for (j = 0; j < 3; j++) {
            /*jshint -W083*/
            _combine[j] = _combine[j].filter(function (item) {
              return item !== false;
            });
          }
          invest = underscore.flatten(_combine).length * 2;//投入

          //比较本期是否中奖
          bonu = 0;
          for (j = 0; j < 3; j++) {
            if (_combine[j].indexOf(number[j] - 0) !== -1) {
              bonu += 10;
            }
          }
          if (bonu > invest) {
            winning++;
          }
          investment += invest;//总投入
          bonus += bonu;//总回报
        }else{
          //先过滤掉历史数据
          for (i = index + 1; i < index + 1 + filterRecent; i++) {
            hisNum = docs[i]._doc.number.split(',');
            for (j = 0; j < 3; j++) {
              k = _combine.indexOf(hisNum[j] - 0);
              if (k !== -1) {
                _combine[k] = false;
              }
            }
          }

          _combine = _combine.filter(function (item) {
            return item !== false;
          });
          invest = _combine.length * 2;//投入

          //比较本期是否中奖
          bonu = 0;
          number = number.sort();
          var shape = commonMethod.getShape(item.number);
          if(shape === 1){//三个号一样
            if (_combine.indexOf(number[0] - 0) !== -1) {
              bonu = 320;
            }
          }else if(shape === 2) {//两个号一样
            if(number[0] === number[1]){
              if (_combine.indexOf(number[0] - 0) !== -1) {
                bonu += 12;
              }
              if (_combine.indexOf(number[2] - 0) !== -1) {
                bonu += 2;
              }
            }else if(number[1] === number[2]){
              if (_combine.indexOf(number[1] - 0) !== -1) {
                bonu += 12;
              }
              if (_combine.indexOf(number[0] - 0) !== -1) {
                bonu += 2;
              }
            }
          }else{
            for (j = 0; j < 3; j++) {
              if (_combine.indexOf(number[j] - 0) !== -1) {
                bonu += 2;
              }
            }
          }

          if (bonu > invest) {
            winning++;
          }
          investment += invest;//总投入
          bonus += bonu;//总回报
        }
      });
      winningRatePercent = winning;
      returnsPercent = bonus === 0 ? 0 : bonus / investment * 100;

      callback(null, {
        winningRatePercent: winningRatePercent,
        returnsPercent: returnsPercent
      });
    }
  });
};


MetaDataDao.prototype.winningInfoD1 = function (conditions, callback) {
  var combine = conditions.combine;
  var type = conditions.type;
  var filterRecent = conditions.filterRecent;
  var recentPeriod = conditions.recentPeriod;

  function processData(err, docs, periods) {
    if (err) {
      callback(err);
    } else {
      var _docs = underscore.clone(docs).slice(0, periods);

      var winning = 0;
      var winningRatePercent;
      var returnsPercent;
      var historyDataRate = [];
      var investment = 0;//总投入
      var bonus = 0;//总回报
      var invest = 0;//每次投入
      var bonu = 0;//每次回报


      _docs.forEach(function (doc, index) {
        var item = doc._doc;
        var number = item.number.split(',');
        var _combine = [];
        var i, j, k;
        var hisNum;

        for (i = 0; i < 3; i++) {
          _combine.push(underscore.clone(combine[i]));
        }

        if (type === 'bet1d') {
          //先过滤掉历史数据
          for (i = index + 1; i < index + 1 + filterRecent; i++) {
            hisNum = docs[i]._doc.number.split(',');
            for (j = 0; j < 3; j++) {
              k = _combine[j].indexOf(hisNum[j] - 0);
              if (k !== -1) {
                _combine[j][k] = false;
              }
            }
          }

          for (j = 0; j < 3; j++) {
            /*jshint -W083*/
            _combine[j] = _combine[j].filter(function (item) {
              return item !== false;
            });
          }
          invest = underscore.flatten(_combine).length * 2;//投入

          //比较本期是否中奖
          bonu = 0;
          for (j = 0; j < 3; j++) {
            if (_combine[j].indexOf(number[j] - 0) !== -1) {
              bonu += 10;
            }
          }
          if (bonu > invest) {
            winning++;
          }
          investment += invest;//总投入
          bonus += bonu;//总回报
        }else{
          //先过滤掉历史数据
          for (i = index + 1; i < index + 1 + filterRecent; i++) {
            hisNum = docs[i]._doc.number.split(',');
            for (j = 0; j < 3; j++) {
              k = _combine.indexOf(hisNum[j] - 0);
              if (k !== -1) {
                _combine[k] = false;
              }
            }
          }

          _combine = _combine.filter(function (item) {
            return item !== false;
          });
          invest = _combine.length * 2;//投入

          //比较本期是否中奖
          bonu = 0;
          number = number.sort();
          var shape = commonMethod.getShape(item.number);
          if(shape === 1){//三个号一样
            if (_combine.indexOf(number[0] - 0) !== -1) {
              bonu = 320;
            }
          }else if(shape === 2) {//两个号一样
            if(number[0] === number[1]){
              if (_combine.indexOf(number[0] - 0) !== -1) {
                bonu += 12;
              }
              if (_combine.indexOf(number[2] - 0) !== -1) {
                bonu += 2;
              }
            }else if(number[1] === number[2]){
              if (_combine.indexOf(number[1] - 0) !== -1) {
                bonu += 12;
              }
              if (_combine.indexOf(number[0] - 0) !== -1) {
                bonu += 2;
              }
            }
          }else{
            for (j = 0; j < 3; j++) {
              if (_combine.indexOf(number[j] - 0) !== -1) {
                bonu += 2;
              }
            }
          }

          if (bonu > invest) {
            winning++;
          }
          investment += invest;//总投入
          bonus += bonu;//总回报
        }

        item.investment = invest;
        item.bonus = bonu;
        item.returns = bonu / invest * 100;
        historyDataRate.push(item);
      });

      winningRatePercent = winning / periods * 100;
      returnsPercent = bonus === 0 ? 0 : (bonus / investment * 100);

      callback(null, {
        winningRatePercent: winningRatePercent,
        returnsPercent: returnsPercent,
        historyDataRate: historyDataRate
      });
    }
  }

  filterRecent = filterRecent ? parseInt(filterRecent) : 0;

  var condition = {};
  var options = {};
  var model = this.model;

  if (recentPeriod.byYear) {
    condition = {year: recentPeriod.year};
    this.model.count(condition, function (err, count) {
      if (err === null) {
        condition = {year: {$in: [recentPeriod.year, recentPeriod.year - 1 + '']}};
        options = {
          sort: {year: -1, period: -1},
          limit: count + filterRecent
        };
        model.find(condition, {_id: 1, period: 1, number: 1}, options,
          function (err, docs) {
            processData(err, docs, count);
          });
      } else {
        callback(err);
      }
    });
  } else if (recentPeriod.byPeriod) {
    options = {
      sort: {year: -1, period: -1},
      limit: recentPeriod.period + filterRecent
    };

    model.find({}, {_id: 1, period: 1, number: 1}, options,
      function (err, docs) {
        processData(err, docs, recentPeriod.period);
      });

  }

};

MetaDataDao.prototype.saveModelD1 = function (data, callback) {
  var entity = new ProfitModel(data);
  entity.save(function (err, product, numberAffected) {
    callback(err);
  });
};
