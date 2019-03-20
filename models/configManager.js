/**
 * 数据库配置管理
 * @author      wcj
 * @version     1.0.0
 * @since       2019-03-13
 */
(function(){
   'use strict';
   const  _ = require('underscore');              //see: http://www.css88.com/doc/underscore
        _.str = require('underscore.string');   //see: https://github.com/edtsech/underscore.string
        _.mixin(_.str.exports());
   const utils = require('../libraries/utils');
   const Sequelize = require('sequelize');
   const assert = require('assert');

   let   _main = {},
         _clients = {}, // 缓存对应的 db
         db_name = '',// 数据库名称
         config = {};
   
   _.Op = Sequelize.Op;
   _.Sequelize = Sequelize;

   // 数据库配置
   _main.getConfig = function (db) {
      let tmp_db_name = db_name;
      if(db) {
         tmp_db_name = db;
      }
      config = _clients[tmp_db_name];
      assert(config, 'missing config ' + tmp_db_name + '');
      return config;
   }

   // 初始化 db, 如果传入新 db 则新增连接的client
   _main.init_db = function(db, config) {
      let tmp_db_name = db_name;
      // 判断是否有新增数据库配置,记录第一次初始化db为默认数据库
      if(db) {
         tmp_db_name = db;
      }

      if(db_name === '') {
         db_name = db;
      }
     
      if(!_clients[tmp_db_name]) {
         assert(config, 'missing configuration ' + tmp_db_name + ' database')
         console.log(`--------------------------------locate database to ${tmp_db_name}------------------------------`);
         let dbConfig = config;
         let sequelize = new Sequelize(dbConfig['database'], dbConfig['user'], dbConfig['password'], {
            host: dbConfig['host'],
            port: dbConfig['port'],
            dialect: 'mysql',
            operatorsAliases: false,
            pool: {
               max: 5,
               min: 0,
               acquire: 30000,
               idle: 10000
            }
         });
         _clients[tmp_db_name] = {
            'Sequelize': Sequelize,
            'sequelize' : sequelize,
            'dbconfig' : dbConfig
         }
      }
   }

   _.mixin(_main);          //扩展underscore
    
   module.exports = _;
}())