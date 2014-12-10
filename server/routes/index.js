'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.locals.indexPage = true;
  res.render('index', { title: '首页' });
});

/**
 * 首页路由
 * @module main
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-04
 * */
module.exports = router;
