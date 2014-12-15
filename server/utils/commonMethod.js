'use strict';

/**
 * 通用方法
 */
var commonMethod = {

  fucai3dType: function (number) {
    if(number[0] === number[1] || number[0] === number[2] || number[1] === number[2]){
      return '组三';
    }else{
      return '组六';
    }
  }
};

module.exports = commonMethod;
