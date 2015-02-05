'use strict';

/**
 * 项目配置文件，配置mongodb 等相关参数
 * @module config
 * @since 0.0.1
 * @author Linder linder0209@126.com
 * @createdDate 2014-12-10
 * */

module.exports = {
  /**
   * Cookie 密钥
   */
  cookieSecret: 'lottery-analyses',

  /**
   * session 密钥
   */
  sessionSecret: 'lottery analyses, very secret',

  /**
   * 连接mongodb 相关配置
   */
  mongodb: {
    host: 'localhost',
    port: '27017',
    database: 'lottery-analyses',
    user: '',
    pass: ''
  },


  /**
   * 超级用户名密码
   */
  administratorPassword: '11111A'

};
