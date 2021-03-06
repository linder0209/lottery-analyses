'use strict';

var zucaiCombineDao = require('../../../dao/zucai/ZucaiCombineDao');

var Profit100 = require('../../../utils/Profit100');

var zucai = {
  model: function (req, res) {
    res.render('lottery/zucai/model', {title: '足彩投注记录'});
  },
  saveFavoriteModel: function (req, res) {
    var data = req.body;
    zucaiCombineDao.saveFavoriteModel(data, function (err, doc) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          item: doc
        });
      }
    });
  },

  favoriteModelList: function (req, res) {
    zucaiCombineDao.favoriteModelList(function (err, docs) {
      if (err) {
        res.send({
          success: false,
          errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          items: docs
        });
      }
    });
  },

  removeFavoriteModel: function (req, res) {
    var _id = req.body._id;
    zucaiCombineDao.removeFavoriteModel(_id, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  saveModel: function (req, res) {
    var data = req.body;
    zucaiCombineDao.saveModel(data, function (err, _id) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          _id: _id
        });
      }
    });
  },
  updateModel: function (req, res) {
    var data = req.body;
    zucaiCombineDao.updateModel(data, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  modelList: function (req, res) {
    zucaiCombineDao.modelList(function (err, items) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          items: items
        });
      }
    });
  },

  removeModel: function (req, res) {
    var id = req.body._id;
    zucaiCombineDao.removeModel(id, function (err, items) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  updateModelStatus: function (req, res) {
    var id = req.body._id;
    var status = req.body.status;
    zucaiCombineDao.updateModelStatus(id, status, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  modelDetails: function (req, res) {
    res.locals.combineModelId = req.params.id;
    res.render('lottery/zucai/model-details', {title: '足彩组合模型投注详情'});
  },

  betRecord: function (req, res) {
    var modelId = req.params.modelId;
    zucaiCombineDao.betRecord(modelId, function (err, modelMeta, betList) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          modelMeta: modelMeta,
          betList: betList
        });
      }
    });
  },

  saveBet: function (req, res) {
    var data = req.body;
    zucaiCombineDao.saveBet(data, function (err, item) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          betItem: item
        });
      }
    });
  },

  deleteBet: function (req, res) {
    var _id = req.body._id;
    zucaiCombineDao.deleteBet(_id, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  addInvestItem: function (req, res) {
    var data = req.body;
    zucaiCombineDao.addInvestItem(data, function (err, item) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          time: item
        });
      }
    });
  },

  updateHistroyItem: function (req, res) {
    var data = req.body;
    zucaiCombineDao.updateHistroyItem(data, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  deleteHistroyItem: function (req, res) {
    var data = req.body;
    zucaiCombineDao.deleteHistroyItem(data, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  endBet: function (req, res) {
    var _id = req.body._id;
    zucaiCombineDao.endBet(_id, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  restartBet: function (req, res) {
    var _id = req.body._id;
    zucaiCombineDao.restartBet(_id, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  sequence: function (req, res) {
    var _id = req.body._id;
    var desc = req.body.desc;
    zucaiCombineDao.sequence(_id, desc, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  updateBetLink: function (req, res) {
    var data = req.body;
    zucaiCombineDao.updateBetLink(data, function (err) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  profit100: function (req, res) {
    res.render('lottery/zucai/profit100', {title: '分析100%盈利模型'});
  },

  profit100Data: function (req, res) {
    var historyData = Profit100.generateHistoryData();
    var modelData = Profit100.generateMode1(historyData);
    res.send({
      success: true,
      modelData: modelData
    });
  }

};

var express = require('express');
var router = express.Router();

//创建100%中奖模型
router.get('/profit100', zucai.profit100);
router.get('/profit100Data', zucai.profit100Data);

router.get('/model', zucai.model);
router.post('/saveFavoriteModel', zucai.saveFavoriteModel);
router.get('/favoriteModelList', zucai.favoriteModelList);
router.post('/removeFavoriteModel', zucai.removeFavoriteModel);
router.post('/saveModel', zucai.saveModel);
router.post('/updateModel', zucai.updateModel);
router.get('/modelList', zucai.modelList);
router.post('/removeModel', zucai.removeModel);
router.post('/updateModelStatus', zucai.updateModelStatus);
router.get('/:id', zucai.modelDetails);
router.get('/betRecord/:modelId', zucai.betRecord);
router.post('/saveBet', zucai.saveBet);
router.post('/deleteBet', zucai.deleteBet);
router.post('/addInvestItem', zucai.addInvestItem);
router.post('/updateHistroyItem', zucai.updateHistroyItem);
router.post('/deleteHistroyItem', zucai.deleteHistroyItem);
router.post('/endBet', zucai.endBet);
router.post('/restartBet', zucai.restartBet);
router.post('/sequence', zucai.sequence);
router.post('/updateBetLink', zucai.updateBetLink);


/**
 * 足彩投注
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2015-01-05
 * */
module.exports = router;
