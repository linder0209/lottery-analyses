'use strict';
var fs = require('fs');

var commonMethod = require('./../../../utils/commonMethod');
var metaDataDao = require('./../../../dao/fucai3d/MetaDataDao');

var fucai3d = {
  index: function (req, res) {
    res.locals.fucai3dPage = true;
    res.render('lottery/fucai3d', {title: '福彩3D数据分析，盈利模型制作'});
  },
  upload: function (req, res) {
    if (req.files && req.files.importData != null) {
      if (req.files.importData == null || req.files.importData.size === 0) {
        res.send({
          success: false, errorMessage: '请选择一个文件！'
        });
        return;
      }
      var tempPath = req.files.importData.path;
      if (tempPath) {
        fs.readFile(tempPath, 'utf-8', function (err, content) {
          if (err) {
            res.send({
              success: false, errorMessage: err.message
            });
          } else {
            //处理文件内容
            var items = content.split('\r\n');
            var datas = items.map(function (item) {
              var _item = item.split(':');
              var period = _item[0];
              var number = _item[1].split(',');
              var sum = parseInt(number[0]) + parseInt(number[1]) + parseInt(number[2]);

              return {
                period: period,
                year: period.length === 4 ? '200' + period[0] : '20' + period.substring(0, 2),
                number: number.join(),
                combine: number.sort().join(),
                type: commonMethod.fucai3dType(number),
                sum: sum,
                size: sum >= 8 ? '小' : '大'
              };
            });
            //console.info(datas);

            metaDataDao.saveAll(datas, function (err) {
              if (err) {
                res.send({
                  success: false, errorMessage: err.message
                });
              } else {
                metaDataDao.find({byYear: true, period: 30}, function (err, docs) {
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
            });
            // 删除临时上传的文件
            fs.unlink(tempPath);
          }
        });
      }
    }
  },

  find: function (req, res) {
    var data = req.body;
    metaDataDao.find(data, function (err, docs) {
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

router.get('/', fucai3d.index);
router.post('/upload', fucai3d.upload);
router.post('/find', fucai3d.find);

/**
 * 福彩3D彩票分析
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
