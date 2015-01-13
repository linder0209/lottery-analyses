'use strict';

var math = require('mathjs');

/**
 * 100%盈利相关方法
 * 该盈利模式目前以单关来分析
 * 后期考虑其他投注方式
 */
var Profit100 = {

  /**
   * 根据给定的 oddsRange 和 period 虚拟创建历史数据
   * @param options 参数，包括 oddsRange 赔率范围 和 period 期数
   */
  generateHistoryData: function (options) {
    options = options || {
      oddsRange: [1.5, 4],
      period: 100
    };
    var oddsRange = options.oddsRange;
    var period = options.period;

    var historyData = [];
    for (var i = 0; i < period; i++) {
      var num1 = math.round(math.random(oddsRange[0], oddsRange[1]),2);
      var num2 = math.round(math.random(oddsRange[0], oddsRange[1]),2);
      var num3 = math.round(math.random(oddsRange[0], oddsRange[1]),2);
      var win = math.random(3);
      win = win <= 1 ? 0 : win <= 2 ? 1 : 3;//赔率大小胜，0表示赔率小的胜，1表示赔率中间的胜，3表示赔率大的胜
      var num = math.sort([num1, num2, num3]);
      num1 = num[0];
      num2 = num[1];
      num3 = num[2];
      historyData.push({
        oddsMin: num1,
        oddsMed: num2,
        oddsMax: num3,
        win: win
      });
    }

    return historyData;
  },

  /**
   * 生成赔率最大和最小投注的模型
   * @param historyData 历史数据
   */
  generateMode1: function (historyData) {
    var modelMin = [];
    var modelMax = [];
    historyData.forEach(function (item) {
      var bonus1 = item.win === 0 ? item.oddsMin * 2 : item.win === 1 ? item.oddsMed * 2 : 0;
      var bonus2 = item.win === 0 ? 0 : item.win === 1 ? item.oddsMed * 2 : item.oddsMax * 2;
      modelMin.push([item.oddsMin, item.oddsMed, item.oddsMax, item.win, 4, bonus1]);
      modelMax.push([item.oddsMin, item.oddsMed, item.oddsMax, item.win, 4, bonus2]);
    });
    return {
      modelMin: modelMin,
      modelMax: modelMax
    };
  }
};

module.exports = Profit100;
