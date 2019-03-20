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
    const fs = require('fs');
    const path = require('path');//解析需要遍历的文件夹
    const R = require("ramda")
    const configManager = require('./configManager');
    const filePath = path.resolve(__dirname);
    const prefix = 'the_';
    const jsFile = /^(?!\\.).+js$/;
 
    let   _main = {};

    // 异步加载文件夹下所有文件名称
    _main.readdirSync = function (dir) {
        return R.pipe(
            R.filter(file => {
                return fs.lstatSync(path.join(dir, file)).isDirectory()
                    || (file !== "index.js") && (file.match(jsFile))
            }),
            R.map(file => {
                return path.join(file)
            })
        )(fs.readdirSync(dir))
    }

    // 启动
    _main.run = function () {
        let res = _main.readdirSync(filePath);
        res.forEach(function(filename){
            // 获取需要的 module 文件
            if(filename.indexOf(prefix) != -1) {
                let Class_Module = require('./' + filename);
                // 根据 module 的类名称导出对应的 module
                exports[new Class_Module().constructor.name] = Class_Module;
            }
        });
    }

    _main.run();
    exports.configManager = configManager;
    exports.Op = configManager.Op;
    exports.Sequelize = configManager.Sequelize;
 }())









