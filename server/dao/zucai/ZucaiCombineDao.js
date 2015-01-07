'use strict';

var moment = require('moment');

/**
 * 创建 ZucaiCombine Dao 用来操作 MetaDataModel，实现数据的增删改查等功能
 * @module ZucaiCombineDao
 * @class
 * @author Linder linder0209@126.com
 * @createdDate 2014-01-05
 * */
function ZucaiCombineDao(Model) {
  this.model = Model;
}

var ZucaiCombineModel = require('../../models/zucai/ZucaiCombineModel');
var ZucaiFavoriteModel = require('../../models/zucai/ZucaiFavoriteModel');
var ZucaiBetModel = require('../../models/zucai/ZucaiBetModel');

var zucaiCombineDao = new ZucaiCombineDao(ZucaiCombineModel);
module.exports = zucaiCombineDao;

/**
 * 保存数据
 * @method
 * @param data {FavoriteModel} FavoriteModel 实例数组
 * @param callback {function}回调函数
 */
ZucaiCombineDao.prototype.saveFavoriteModel = function (data, callback) {
  var _id = data._id;
  if (_id) {
    delete data._id;
    ZucaiFavoriteModel.update({_id: _id}, data, function (err, numberAffected, rawResponse) {
      return callback(err);
    });
  } else {
    var entity = new ZucaiFavoriteModel(data);
    entity.save(function (err, product, numberAffected) {
      if (err) {
        return callback(err);
      } else {
        var _doc = product._doc;
        var doc = {
          _id: _doc._id,
          name: _doc.name,
          singleAmount: _doc.singleAmount,
          link: _doc.link,
          remark: _doc.remark
        };
        return callback(err, doc);
      }
    });
  }
};

/**
 * 返回收藏的模型
 * @param callback
 */
ZucaiCombineDao.prototype.favoriteModelList = function (callback) {
  ZucaiFavoriteModel.find({}, {_id: 1, name: 1, singleAmount: 1, link: 1, remark: 1}, function (err, docs) {
    return callback(err, docs);
  });
};

/**
 * 删除收藏的模型
 * @param _id
 * @param callback
 */
ZucaiCombineDao.prototype.removeFavoriteModel = function (_id, callback) {
  this.model.count({combine: {$elemMatch: {_id: _id}}}, function (err, count) {
    if (err) {
      return callback(err);
    } else if (count > 0) {
      return callback(new Error('-1'));
    } else {
      ZucaiFavoriteModel.remove({_id: _id}, function (err) {
        return callback(err);
      });
    }
  });
};

/**
 * 保存创建的模型
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.saveModel = function (data, callback) {
  var entity = new this.model(data);
  entity.save(function (err, product, numberAffected) {
    if (err) {
      return callback(err);
    } else {
      return callback(err, product._doc._id);
    }
  });
};

/**
 * 修改创建的模型
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.updateModel = function (data, callback) {
  var _id = data._id;
  delete data._id;
  this.model.update({_id: _id}, data, function (err, numberAffected, rawResponse) {
    return callback(err);
  });
};

/**
 * 返回创建的模型列表
 * @param callback
 */
ZucaiCombineDao.prototype.modelList = function (callback) {
  var promise = this.model.find({}, {}).exec();
  var modelItems = [];
  promise.then(function (zucaiCombines) {
    modelItems = zucaiCombines.map(function (item) {
      return item._doc;
    });

    //查询投注期数
    return ZucaiBetModel.aggregate({$group: {_id: '$modelId', period: {$sum: 1}}}).exec();
  }).then(function (betPeriods) {
    var betPeriodsMap = {};
    if (betPeriods && betPeriods.length > 0) {
      betPeriods.forEach(function (item) {
        betPeriodsMap[item._id] = item.period;
      });
    }
    modelItems.forEach(function (item) {
      item.periods = betPeriodsMap[item._id.toString()] || 0;
    });

    //查询历史正在进行中的投注
    return ZucaiBetModel.find({isEnd: false}, {_id: 1, modelId: 1, times: 1}).exec();
  }).then(function (zucaiBets) {
    var betsMap = {};
    if (zucaiBets && zucaiBets.length > 0) {
      zucaiBets.forEach(function (item) {
        betsMap[item._doc.modelId] = item._doc.times;
      });
    }
    modelItems.forEach(function (item) {
      var times = betsMap[item._id.toString()];
      if (times) {
        times.forEach(function (it) {
          it.combine.forEach(function (subIt) {
            item.investment += subIt.invest || 0;
            item.bonus += subIt.bonus || 0;
          });
        });
      }
      item.returns = item.investment === 0 ? 0 : item.bonus / item.investment * 100;
    });
    return callback(null, modelItems);

  }).then(null, function (err) {
    return callback(err);
  });

};

/**
 * 删除模型
 * @param _id
 * @param callback
 */
ZucaiCombineDao.prototype.removeModel = function (_id, callback) {
  this.model.remove({_id: _id}, function (err) {
    if (err === null) {
      //同时删除投注记录
      ZucaiBetModel.remove({modelId: _id}, function (err) {
        return callback(err);
      });
    } else {
      return callback(err);
    }
  });
};

/**
 * 根据模型id查看其投注记录
 * @param modelId
 * @param callback
 */
ZucaiCombineDao.prototype.betRecord = function (modelId, callback) {
  this.model.findOne({_id: modelId}, {}, function (err, doc) {
    if (err) {
      return callback(err);
    } else {
      if (!doc) {
        return callback(new Error('该记录不存在！'));
      }
      var modelMeta = doc._doc;
      ZucaiBetModel.find({modelId: modelId}, {}, {sort: {period: -1}}, function (err, docs) {
        if (err) {
          return callback(err);
        } else {
          var betList = docs.map(function (item) {
            var doc = item._doc;
            doc.createdDate = moment(doc.createdDate).format('YYYY年MM月DD');
            doc.times.forEach(function (it) {
              it.createdDate = moment(it.createdDate).format('YYYY年MM月DD');
            });
            return doc;
          });
          return callback(null, modelMeta, betList);
        }
      });
    }
  });
};

/**
 * 添加新的投注
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.saveBet = function (data, callback) {
  var modelId = data.modelId;
  ZucaiBetModel.findOne({modelId: modelId}, {_id: 1, period: 1}, {sort: {period: -1}}, function (err, doc) {
    if (err) {
      return callback(err);
    } else {
      var entity = new ZucaiBetModel({
        modelId: modelId,
        period: doc ? doc._doc.period + 1 : 1,
        createdDate: new Date(),
        combine: data.combine.map(function (item) {
          return {
            name: item.name,
            invest: item.invest,
            _id: item._id
          };
        }),
        times: [{
          time: 1,
          createdDate: new Date(),
          combine: data.combine.map(function (item) {
            delete item.name;
            return item;
          })
        }]
      });

      entity.save(function (err, product, numberAffected) {
        if (err) {
          return callback(err);
        } else {
          var doc = product._doc;
          doc.createdDate = moment(product._doc.createdDate).format('YYYY年MM月DD');
          doc.times.forEach(function (it) {
            it.createdDate = moment(it.createdDate).format('YYYY年MM月DD');
          });
          return callback(err, doc);
        }
      });
    }
  });
};

/**
 * 添加投注记录
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.addInvestItem = function (data, callback) {
  var _id = data._id;
  delete data._id;
  ZucaiBetModel.findOne({_id: _id}, {_id: 1, times: 1}, function (err, doc) {
    if (err) {
      return callback(err);
    } else {
      var times = doc._doc.times;
      var time = {
        time: times.length > 0 ? (times[times.length - 1].time + 1) : 1,
        createdDate: new Date(),
        combine: data.combine
      };
      times.push(time);

      ZucaiBetModel.update({_id: _id}, {
        $set: {
          times: times,
          updatedDate: new Date()
        }
      }, function (err, numberAffected, rawResponse) {
        time.createdDate = moment(time.createdDate).format('YYYY年MM月DD');
        return callback(null, time);
      });
    }
  });
};

/**
 * 修改投注记录
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.updateHistroyItem = function (data, callback) {
  var _id = data._id;

  ZucaiBetModel.findOne({_id: _id}, {_id: 1, times: 1}, function (err, doc) {
    if (err) {
      return callback(err);
    } else {
      var times = doc._doc.times;
      var i = -1;
      times.forEach(function (item, index) {
        if (item.time === data.time) {
          i = index;
          return false;
        }
      });

      if (i !== -1) {
        times[i].combine = data.combine;

        ZucaiBetModel.update({_id: _id}, {
          $set: {
            times: times,
            updatedDate: new Date()
          }
        }, function (err, numberAffected, rawResponse) {
          return callback(null);
        });
      } else {
        return callback(err);
      }
    }
  });
};

/**
 * 删除投注记录
 * @param data
 * @param callback
 */
ZucaiCombineDao.prototype.deleteHistroyItem = function (data, callback) {
  var _id = data._id;

  ZucaiBetModel.findOne({_id: _id}, {_id: 1, times: 1}, function (err, doc) {
    if (err) {
      return callback(err);
    } else {
      var times = doc._doc.times;
      var i = -1;
      times.forEach(function (item, index) {
        if (item.time === data.time) {
          i = index;
          return false;
        }
      });
      if (i !== -1) {
        times.splice(i, 1);
        ZucaiBetModel.update({_id: _id}, {
          $set: {
            times: times,
            updatedDate: new Date()
          }
        }, function (err, numberAffected, rawResponse) {
          return callback(null);
        });
      } else {
        return callback(err);
      }
    }
  });
};

/**
 * 结束投注
 * @param _id
 * @param callback
 */
ZucaiCombineDao.prototype.endBet = function (_id, callback) {
  var model = this.model;

  ZucaiBetModel.update({_id: _id}, {
    $set: {
      isEnd: true,
      updatedDate: new Date()
    }
  }, function (err, numberAffected, rawResponse) {
    if (err === null) {
      //修改该模型历史投入和历史回报
      ZucaiBetModel.findOne({_id: _id}, {modelId: 1, times: 1}, function (err, doc) {
        if (err === null) {
          var modelId = doc._doc.modelId;
          var times = doc._doc.times;
          var investment = 0;
          var bonus = 0;
          times.forEach(function (item) {
            item.combine.forEach(function (it) {
              investment += it.invest;
              bonus += it.bonus;
            });
          });
          model.update({_id: modelId}, {
            $set: {
              investment: investment,
              bonus: bonus
            }
          }, function (err, numberAffected, rawResponse) {
            return callback(err);
          });
        } else {
          return callback(err);
        }
      });
    } else {
      return callback(err);
    }
  });

};




