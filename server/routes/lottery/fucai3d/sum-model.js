'use strict';

var metaDataDao = require('./../../../dao/fucai3d/MetaDataDao');

var model = {
  index: function (req, res) {
    res.render('lottery/fucai3d/sum-model', {title: '创建和值模型'});
  },
  winningRate: function (req, res) {
    var conditions = req.body;
    metaDataDao.winningRate(conditions, function (err, data) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          winningRatePercent: data.winningRatePercent,
          returnsPercent: data.returnsPercent
        });
      }
    });
  },
  winningInfo: function (req, res) {
    var conditions = req.body;
    metaDataDao.winningInfo(conditions, function (err, data) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          winningRatePercent: data.winningRatePercent,
          returnsPercent: data.returnsPercent,
          historyDataRate: data.historyDataRate
        });
      }
    });
  },
  saveModel: function (req, res) {
    var data = req.body;
    metaDataDao.saveModel(data, function (err) {
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
  }

};

var express = require('express');
var router = express.Router();

router.get('/', model.index);
router.post('/winning-rate', model.winningRate);
router.post('/winning-info', model.winningInfo);
router.post('/save-model', model.saveModel);

/**
 * 福彩3D彩票分析
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
