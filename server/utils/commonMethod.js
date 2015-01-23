'use strict';

/**
 * 通用方法
 */
var commonMethod = {

  fucai3dType: function (number) {
    if (number[0] === number[1] || number[0] === number[2] || number[1] === number[2]) {
      return '组三';
    } else {
      return '组六';
    }
  },
  /**
   * 组选6 组合
   * @returns {Array}
   */
  zx6Combine: function () {
    var combines = [];
    for (var i = 0; i <= 9; i++) {
      for (var j = i + 1; j <= 9; j++) {
        for (var k = j + 1; k <= 9; k++) {
          combines.push(i + ',' + j + ',' + k);
        }
      }
    }
    return combines;
  },
  /**
   * 判断组合是否相等
   */
  equalZx6Combine: function (combine1, combine2) {
    var combine1s = combine1.split(',');
    var combine2s = combine2.split(',');
    combine1s = combine1s.sort();
    combine2s = combine2s.sort();
    if (combine1s[0] === combine2s[0] && combine1s[1] === combine2s[1] && combine1s[2] === combine2s[2]) {
      return true;
    }
    return false;
  },

  /**
   * 根据和值返回奖金
   * @param sum
   * @returns {*}
   */
  bonusBySum: function (sum) {
    var bon = {
      '0': 1024,
      '1': 345,
      '2': 172,
      '3': 104,
      '4': 69,
      '5': 49,
      '6': 37,
      '7': 29,
      '8': 23,
      '9': 19,
      '10': 16,
      '11': 15,
      '12': 15,
      '13': 14,
      '14': 14,
      '15': 15,
      '16': 15,
      '17': 16,
      '18': 19,
      '19': 23,
      '20': 29,
      '21': 37,
      '22': 49,
      '23': 69,
      '24': 104,
      '25': 172,
      '26': 345,
      '27': 1024
    };
    return bon[sum];
  },

  /**
   * 根据给定的数字计算所有的组选6组合
   * @param combine
   * @returns {Array}
   */
  subZx6Combine: function(combine){
    var zx6Combine = [];
    var len = combine.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        for (var k = j + 1; k < len; k++) {
          zx6Combine.push(combine[i] + ',' + combine[j] + ',' + combine[k]);
        }
      }
    }
    return zx6Combine;
  },

  /**
   * 根据过滤条件，过滤给定的组合
   * @param combines
   * @param filters
   * 0: 普通号，1: 豹子号，2：对子号，3：顺子号，4：相邻号
   * @returns {*}
   */
  filterCombine: function(combines, filters){
    if(!Array.isArray(filters)){
      filters = [filters];
    }
    var self = this;
    return combines.filter(function(item){
      if(filters.indexOf(self.getShape(item)) !== -1){
        return false;
      }
       return true;
    });
  },

  /**
   * 返回号码形态
   * @param combine
   * @param alias
   * @returns {string}
   */
  getShape: function(number, alias){
    /*jshint -W116*/
    var shapeAlias = ['普通号','豹子号','对子号','顺子号','相邻号'];
    var shape = 0;
    var num = number.split(',');
    num = num.sort();
    if(num[0] === num [1] && num[1] === num[2]){//豹子号
      shape = 1;
    } else if(num[0] === num [1]  || num[1] === num[2]){//对子号
      shape = 2;
    } else if(num[0] == num[2] - 2){//顺子号
      shape = 3;
    } else if(num[0] == num[1] - 1 || num[1] == num[2] - 1){//相邻号
      shape = 4;
    }
    return alias ? shapeAlias[shape] : shape;
  },

  /**
   * 根据选择的 combine 返回2D组合
   * @param combine
   * @param type 1表示百位加十位，2表示百位加个位，3表示十位加个位，undefined表示返回所有组合
   */
  get2DCombine: function(combine, type){
    var D2Combine = [];
    combine.forEach(function(item){

    });
  }
};

module.exports = commonMethod;
