'use strict';

var metaDataDao = require('./../../../dao/fucai3d/MetaDataDao');

var model = {
  index: function (req, res) {
    res.render('lottery/fucai3d/model', {title: '创建模型'});
  },
  winningRate: function(req, res){
    var data = req.body;
    metaDataDao.winningRate(data, function (err, winningRatePercent) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, winningRatePercent: winningRatePercent
        });
      }
    });
  },
  winningInfo: function(req, res){
    var data = req.body;
    metaDataDao.winningInfo(data, function (err, historyDataRate) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, historyDataRate: historyDataRate
        });
      }
    });
  },
  saveModel: function(){

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
