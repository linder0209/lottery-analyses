'use strict';

var lottery = {
  fucai: function (req, res) {
    res.locals.fucaiPage = true;
    res.render('fucai', { title: '福彩3D数据分析，盈利模型制作' });
  }
};

var express = require('express');
var router = express.Router();

router.get('/fucai', lottery.fucai);

/**
 * 彩票分析
 * @module lottery
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
