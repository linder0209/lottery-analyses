'use strict';

var metaDataDao = require('./../../../dao/fucai3d/MetaDataDao');

var analyses = {

  zx: function (req, res) {
    metaDataDao.zx(function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  },
  zx3: function (req, res) {
    metaDataDao.zx(function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  },
  zx6: function (req, res) {
    metaDataDao.zx(function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  },
  sum: function (req, res) {
    var year =  req.body.year;
    metaDataDao.sum(year,function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  },

  sumInterval: function (req, res) {
    var year =  req.body.year;
    metaDataDao.sumInterval(year,function (err, docs, maxOmits) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true,
          items: docs,
          maxOmits: maxOmits
        });
      }
    });
  },

  interval: function (req, res) {
    metaDataDao.zx(function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  },
  capRate: function (req, res) {
    metaDataDao.zx(function (err, docs) {
      if (err) {
        res.send({
          success: false, errorMessage: err.message
        });
      } else {
        res.send({
          success: true, items: docs
        });
      }
    });
  }
};

var express = require('express');
var router = express.Router();

router.get('/zx', analyses.zx);
router.get('/zx3', analyses.zx3);
router.get('/zx6', analyses.zx6);
router.post('/sum', analyses.sum);
router.post('/sumInterval', analyses.sumInterval);
router.get('/interval', analyses.interval);
router.get('/capRate', analyses.capRate);

/**
 * 福彩3D彩票分析
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
