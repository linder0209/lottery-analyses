'use strict';
var fs = require('fs');

var fucai3d = {
  index: function (req, res) {
    res.locals.fucai3dPage = true;
    res.render('lottery/fucai3d', { title: '福彩3D数据分析，盈利模型制作' });
  },
  upload: function (req, res) {
    if (req.files && req.files.importData != null) {
      var temp_path = req.files.importData.path;
      if (temp_path) {
        fs.readFile(temp_path, 'utf-8', function(err, content) {
          if (err) {
            res.send({success: false});
          } else {
            //文件的内容
            console.log('content',content);
            res.send({
              success: true
            });
            // 删除临时文件
            fs.unlink(temp_path);
          }
        });
      }
    }
  }
};

var express = require('express');
var router = express.Router();

router.get('/', fucai3d.index);
router.post('/upload', fucai3d.upload);

/**
 * 福彩3D彩票分析
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
