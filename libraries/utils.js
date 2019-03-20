/**
 * funREST 工具集
 * @author      funfly
 * @email       echo@funfly.cn
 * @copyright   funREST
 * @version     1.1.0
 * @since       2015-01-23
 */
(function(){
    'use strict';
    var _ = require('underscore');              //see: http://www.css88.com/doc/underscore
        _.str = require('underscore.string');   //see: https://github.com/edtsech/underscore.string
        _.mixin(_.str.exports());
    var main = {},
        crypto = require('crypto'),
        fs = require('fs'),
        mime = require('mime'),
        md5 = require('MD5'),
        path = require('path');

    var config_file = path.resolve(path.dirname(__dirname)+'/config/config.js');

    //动态加载配置文件
    main.watchConfig = function(){
        if (require.cache[config_file]){
            delete require.cache[config_file];
        }
        return require(config_file);
    };

    //配置文件
    main.config = function(){
        return require(config_file);
    };

    //是否空字符串、对象、数组、数字
    main.empty = function(data){
        if(_.isNumber(data)){
            if(_.isNaN(data)){
                return true;    
            }
            return false;    
        }
        if(_.isString(data)){
            data = _.trim(data);
        }
        return _.isEmpty(data);
    };

    //时间
    main.myTime = function(format,offset){
        var now = new Date();
        format = main.dealLowerStr(format);

        offset = parseInt(offset);
        if( ! _.isNaN(offset)){
            now.setDate(now.getDate()+offset);
        }
        if(format === 'date'){
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
            return parseInt(now.getTime()/1000);       //返回当天 00:00:00 的时间戳
        }else if(format === 'time'){
            return parseInt(now.getTime()/1000);       //返回当前 时间戳（秒）
        }else {
            return parseInt(now.getTime());            //返回当前 时间戳（毫秒）
        }
    };
    
    //日期
    main.myDate = function(format,offset){
        var now = new Date();
        offset = parseInt(offset);
        if( ! _.isNaN(offset)){
            now.setDate(now.getDate()+offset);
        }
        if(format === 'date'){                  //返回当天日期
            return now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        }else if(format === 'withMilliseconds'){//返回当前时间（包含微秒）
            return now.getFullYear()+''+(now.getMonth()+1)+''+now.getDate()+''+now.getHours()+''+now.getMinutes()+''+now.getSeconds()+''+now.getMilliseconds();
        }else{                                  //返回当前时间
            return now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+' '+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        }
    };
    //四位随机数
    main.randomFour = function () {
        var out;
        do{
             out = Math.floor(Math.random()*10000);
        }while( out < 1000 )
        return out;
    }

    //返回当前时间，YYYYMMDDhhmmss
    function pad2(n) { return n < 10 ? '0' + n : n }

    main.generateTimeReqestNumber = function (type) {
        var date = new Date();
        if (type == 'day'){
            return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate());
        }else{
            return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
        }
    }

    // 返回时间增加1分钟
    main.generateTimeReqestNumberMinu60 = function (type) {
        var date = new Date();
        date.setMinutes(date.getMinutes () + 1);
        return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
    }

     //返回当前时间 yyyy-MM-dd HH:MM:SS
    main.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }
    
    //生成GUID
    main.guid = function() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    main.getLen = function(str){
        var len = 0;
        for (var i=0; i<str.length; i++) {
            if (str.charCodeAt(i) > 127){
                len += 2; //utf8格式下中文占3位，gb2312请修改位2位
            }else{
                len++;
            }
        }
        return len;
    };
    //数组转URl参数
    main.http_build_query = function(data){
        var sign_str = '';
        for(var i in data){
            if (data[i] != '' || typeof data[i] != 'undefined') {
                sign_str += i+'='+data[i]+'&';
            }
        }
        return sign_str;
    };
    //数组按KEY排序
    main.sortDict = function (dict) {
        var dict2 = {},
            keys = Object.keys(dict).sort();

        for (var i = 0, n = keys.length, key; i < n; ++i) {
            key = keys[i];
            dict2[key] = dict[key];
        }

        return dict2;
    }

    /**
     * 检测字符串是否合法
     var data = ['ip','192.168.0.1'];                   //IP地址
         data = ['phone','0591-83651236'];              //电话号码
         data = ['username','funfly'];                  //用户名
         data = ['qq','83651236'];                      //QQ号码
         data = ['zip','350001'];                       //邮编
         data = ['date','2013-11-12'];                  //日期
         data = ['datetime','2013-11-12 13:33:12'];     //时间
         data = ['mobile','13683651236'];               //手机电话
         data = ['password','abcdef123456'];            //密码
         data = ['idcard','350322197808094815'];        //身份证
         data = ['domain','http://www.baidu.net.cn/'];  //域名
         data = ['email','0591@83651236.net.cn'];       //E-mail
         data = ['alnum','abcd1234',5,12];              //英文+数字
         data = ['alpha','abcdef',5,12];                //英文
         data = ['int',12,5,11];                        //数值范围
         data = ['str','abcd哈哈中文',5,12];            //字符串长度，支持中英文。中文1个汉字相当于2个字符
     */
    main.checkChar = function (data){
        if( ! _.isArray(data)){
            return false;
        }
        var f, m,d,h,y,mi,vLen,v,regex;
        switch (data[0]){
            case "ip":
                 return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(data[1]);
            case "phone":
                return /^((0[1-9]{3})?(0[12][0-9])?[-])?\d{7,8}$/.test(data[1]);
            case "mobile":
                return /^(13|15|18)+[0-9]{9}$/.test(data[1]);
            case "date":
                f = ('undefined' === typeof(data[2]))?"yyyy-MM-dd":data[2];//格式
                m="MM";d="dd";y="yyyy";
                regex = '^'+f.replace(y,'\\d{4}').replace(m,'\\d{2}').replace(d,'\\d{2}')+'$';
                if(! new RegExp(regex).test(data[1])) {return false;}
                var s = data[1].substr(f.indexOf(y),4)+"/"+data[1].substr(f.indexOf(m),2)+"/"+data[1].substr(f.indexOf(d),2);
                return ! _.isNaN(new Date(s));
            case "datetime":
                f = ('undefined' === typeof(data[2]))?"yyyy-MM-dd HH:mm:ss":data[2];//格式
                m="MM";d="dd";y="yyyy";h="HH";mi="mm";s="ss";
                regex = '^'+f.replace(y,'\\d{4}').replace(m,'\\d{2}').replace(d,'\\d{2}').replace(h,'\\d{2}').replace(mi,'\\d{2}').replace(s,'\\d{2}')+'$';
                if(!new RegExp(regex).test(data[1])) {return false;}
                return ! _.isNaN(new Date(data[1].substr(f.indexOf(y),4),data[1].substr(f.indexOf(m),2),data[1].substr(f.indexOf(d),2),data[1].substr(f.indexOf(h),2),data[1].substr(f.indexOf(mi),2),data[1].substr(f.indexOf(s),2)));
            case "zip":
                return /^[0-9]{6}$/.test(data[1]);
            case "qq":
                return /^[0-9]{5,15}$/.test(data[1]);
            case "username":
                vLen = data[1].length;
                if (vLen<5 || vLen>12) {return false;}
                return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(data[1]);
            case "password":
                return /^[a-zA-Z0-9_]{5,12}$/.test(data[1]);
            case "idcard":
                return /^([a-zA-Z0-9]{15}|[a-zA-Z0-9]{18})$/.test(data[1]);
            case "domain":
                data[1] = data[1].replace('http://','');
                data[1] = data[1].replace('/','');
                return /^([a-zA-Z0-9_-]*[.]){1,3}[a-zA-Z0-9_-]{2,3}$/.test(data[1]);
            case "email":
                return /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(data[1]);
            case "alpha":
                return data[1].match(new RegExp("^[A-Za-z]{"+data[2]+","+data[3]+"}$"));
            case "alnum":
                return data[1].match(new RegExp("^[A-Za-z0-9]{"+data[2]+","+data[3]+"}$"));
            case "int":
                if (_.isNaN(data[1])) {return false;}
                v = parseInt(data[1]);
                return (v>=data[2] && v<=data[3]);
            case "str":
                vLen = main.getLen(data[1]);
                return (vLen>=data[2] && vLen<=data[3]) ;
            default:
                return false;
        }
        return false;
    };

    //匹配@提及
    main.getAtData = function(str){
        if( ! str){
            return ;
        }
        str +=" ";  //最后一个At，补齐空格
        var atData = str.match(/@[^@#\s]+\s/g);
        if( ! atData){
            return ;
        }
        var n = atData.length;
        if( ! n){
            return ;
        }
        for(var i=0;i<n;i++){
            atData[i] = atData[i].replace("@","");
            atData[i] = _.trim(atData[i]);
        }
        return atData;
    };

    //匹配#话题
    main.getTagData = function(str){
        if( ! str){
            return ;
        }
        var atData = str.match(/#[^@#]+#/g);
        if( ! atData){
            return ;
        }
        var n = atData.length;
        if( ! n){
            return ;
        }
        for(var i=0;i<n;i++){
            atData[i] = atData[i].replace(/#+/g,"");
            atData[i] = _.trim(atData[i]);
        }
        return atData;
    };

    //获取字符串。去重复空格 去前后空格
    main.getStr = function(obj,key){
        if(main.empty(obj)){
            return '';
        }
        return main.dealStr(obj[key]);
    };

    //获取字符串（小写）。去重复空格 去前后空格
    main.getLowerStr = function(obj,key){
        if(main.empty(obj)){
            return '';
        }
        return main.dealLowerStr(obj[key]);
    };

    //获取字符串（urldecode）
    main.getUrldecode = function(obj,key){
        if(main.empty(obj)){
            return '';
        }
        return main.urldecode(obj[key]);
    };

    //获取字符串（urlencode）
    main.getUrlencode = function(obj,key){
        if(main.empty(obj)){
            return '';
        }
        return main.urlencode(obj[key]);
    };

    //处理字符串。去重复空格 去前后空格
    main.dealStr = function(str){
        if(main.empty(str)){
            return '';
        }
        str = str.toString();
        return _.clean(str);
    };

    //处理字符串（小写）。去重复空格 去前后空格
    main.dealLowerStr = function(str){
        if(main.empty(str)){
            return '';
        }
        str = str.toString().toLowerCase();
        return _.clean(str);
    };

    //处理字符串（urldecode）
    main.urldecode = function(str){
        if(main.empty(str)){
            return '';
        }
        return decodeURIComponent(str);
    };

    //处理字符串（urlencode）
    main.urlencode = function(str){
        if(main.empty(str)){
            return '';
        }
        return encodeURIComponent(str);
    };

    //获取整数
    main.getInt = function(obj,key){
        if(main.empty(obj)){
            return 0;
        }
        return main.dealInt(obj[key]);
    };

    //处理整数
    main.dealInt = function(i,min,max){
        if(main.empty(i)){
            return 0;
        }
        i = parseInt(i);
        if(_.isNaN(i)){
            return 0;
        }
        if(_.isNumber(min)){
            if(i < min){
                return 0;
            }
        }
        if(_.isNumber(max)){
            if(i > max){
                return 0;
            }
        }
        return i;
    };

    //获取正整数
    main.getUint = function(obj,key){
        if(main.empty(obj)){
            return 0;
        }
        return main.dealUint(obj[key]);
    };

    //处理正整数
    main.dealUint = function(i,min,max){
        if(main.empty(i)){
            return 0;
        }
        i = parseInt(i);
        if(_.isNaN(i)){
            return 0;
        }
        if(i < 0){
            return 0;
        }
        if(_.isNumber(min)){
            if(i < min){
                return 0;
            }
        }
        if(_.isNumber(max)){
            if(i > max){
                return 0;
            }
        }
        return i;
    };

    //处理数组：强制转换后去重
    main.dealArray = function(arr, type){
        if(main.empty(type)){
            type = 'uint';    
        }
        var _arr = [];
        if( main.empty(arr) ){
            return _arr;
        }
        if( ! _.isArray(arr)){
            arr = [arr];
        }
        _.each(arr, function(val){ 
            if(type === 'int'){
                val = main.dealInt(val);
            }else if(type === 'str'){
                val = main.dealStr(val);
            }else if(type === 'lowerstr'){
                val = main.dealLoserStr(val);
            }else{
                val = main.dealUint(val);
            }
            if(val){
                _arr.push(val);    
            }
        });
        return _.uniq(_arr);
    };
    
    //去除JSON对象的重复值（无键名） type:uint,str 【将弃用】
    main.dealUniqueJson = function(obj, type){
        if(_.isUndefined(type)){
            type = '';
        }
        var _ids = [];
        var obj_ids = {};
        if(_.isObject(obj)){
            for(var k in obj){
                if(type === 'uint'){
                    obj[k] = main.dealUint(obj[k]);
                }else if(type === 'str'){
                    obj[k] = main.dealStr(obj[k]);
                }
                if(obj[k] && ! obj_ids.hasOwnProperty(obj[k])){
                    obj_ids[obj[k]] = obj[k];
                    _ids.push(obj[k]);
                }
            }
        }else{
            if(type === 'uint'){
                obj = main.dealUint(obj);
            }else if(type === 'str'){
                obj = main.dealStr(obj);
            }
            if(obj){
                _ids.push(obj);
            }
        }
        return _ids;
    };

    //获取Redis的 Sorted Sets 分页条件
    main.getRedisConditions = function(data){
        var id_max = main.getUint(data,'id_max');
        var id_min = main.getUint(data,'id_min');
        var page_size = main.getUint(data,'page_size');
        if(page_size < 20){
            page_size = 20;
        }
        var flag = 0;       //0=第一页 1=更多 2=最新
        if(id_max){         //获取更多（下一页）
            id_max = '('+id_max;
            id_min = '-inf';
            flag = 1;
        }else if(id_min){   //获取最新
            id_max = '+inf';
            id_min = '('+id_min;
            flag = 2;
        }else{              //默认取最新的20条（第一页）
            id_max = '+inf';
            id_min = '-inf';
        }
        return {id_max:id_max,id_min:id_min,page_size:page_size,flag:flag};
    };
    
    //获取MONGODB分页条件与选项；key: 排序字段【将弃用】
    main.getMongoConditions = function(data,key){
        var id_min = main.getUint(data,'id_min');
        var id_max = main.getUint(data,'id_max');
        var page_size = main.getUint(data,'page_size');
        if(page_size <= 0){
            page_size = 20;
        }
        if(page_size > 100){
            page_size = 100;
        }
        if('undefined' === typeof(key)){
            var tempKey = main.getStr(data,'sort');
            if(tempKey){
                key = tempKey;
            }else{
                key = '_id';
            }
        }
        var conditions = {};
        var options = {limit:page_size};        //默认取最新的20条（第一页）
        options.sort = {};
        var flag = 0;                           //0=第一页 1=更多 2=最新
        if(id_max){
            conditions[key] = {$lt:id_max};     //获取更多（下一页）
            flag = 1;
            options.sort[key] = -1;
        }else if(id_min){
            conditions[key] = {$gt:id_min};     //获取最新
            flag = 2;
            options.sort[key] = 1;
        }else{
            flag = 1;
            options.sort[key] = -1;
        }
        return {conditions:conditions,options:options,flag:flag};
    };
    
    //获取MONGODB分页条件与选项；
    main.makeMongoConditions = function(_params){
        var conditions = {};
        var options = {};
        options.limit = main.getUint(_params, 'limit');      //分页条数限制在5到1000之间
        if(options.limit < 5 ){
            options.limit = 5;
        }
        if(options.limit > 1000){
            options.limit = 1000;
        }
        var orderby = {                                     //仅支持_id time两个字段的排序
            _id: main.getInt(_params.orderby, '_id'),
            time: main.getInt(_params.orderby, 'time')
        };
        if(orderby._id){
            options.sort = {_id: orderby._id};
        }else if(orderby.time){
            options.sort = {time: orderby.time};
        }else{
            options.sort = {_id: -1};
        }
        if(_.isObject(_params.filter)){
            for(var i in _params.filter){
                if(i === 'cloudid' || i === 'type' || i === 'id' || i === 'uid' || i === 'do_uid' || i === 'to_uid' || i === '_id' || i === 'time' ){
                    conditions[i] = _params.filter[i];
                }
            }
        }
        return {conditions: conditions, options: options};
    };

    /**
     * 通过数据格式整理
     * new_id:        替换 _id 的新键名
     * rewrite_key:   true 为全部记录修改键名，键名为记录的{_id}值 默认 false
     */
    main.format_data = function(items,new_id,rewrite_key){
        if(_.isUndefined(new_id)){
            return items;
        }
        if(_.isUndefined(rewrite_key)){
            rewrite_key = false;
        }
        if( main.empty(items) ){
            return ;
        }
        var rets = {};
        var its = [];
        var ke = 0;
        for(var k in items ){
            if(items[k]){
                items[k][new_id] = items[k]._id;
                delete items[k]._id;
                its.push(items[k]);
                rets[items[k][new_id]] = items[k];
            }
        }
        if(rewrite_key){
            return rets;     //为全部记录修改键名，键名为记录的{_id}值
        }else{
            return its;      //保留原key值
        }
    };
    
    main.md5 = md5;          //生成MD5

    //加密
    main.encrypt = function (str, secret) {
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        return enc;
    };

    //解密
    main.decrypt = function (str, secret) {
        var decipher = crypto.createDecipher('aes192', secret);
        var dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    };

    //随机字符串
    main.randomString = function (size) {
        size = size || 6;
        var code_string = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        var max_num = code_string.length + 1;
        var new_pass = '';
        while (size > 0) {
            new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
            size--;
        }
        return new_pass;
    };

    /**
     * 参数检验
     * data: [[{source},{type},{key}],...]
     *      source: 数据来源: headers、body、_params 默认：_params
     *      type:   数据类型：int uint str    默认：str
     *      key:    键
    */
    main.checkParams = function(req,res,data,callback){
        if( ! data.length){
            return callback(req,res);
        }
        for(var i in data){
            var source = req._params;
            if(data[i][0] === 'body'){
                source = req.body;
            }else if(data[i][0] === 'headers'){
                source = req.headers;
            }
            if( main.empty(source[data[i][2]])){
                res._err({request_id:'107180001',code:'REQUIRE_ARGUMENT',message:'缺少参数：'+data[i][2]+'！'});
                return;
            }
            if(data[i][1] === 'int'){
                source[data[i][2]] = main.getInt(source,data[i][2]);
            }else if(data[i][1] === 'uint'){
                source[data[i][2]] = main.getUint(source,data[i][2]);
            }else if(data[i][1] === 'object'){
                if( 'object' !== typeof(source[data[i][2]])){
                    res._err({request_id:'107180002',code:'INVALID_ARGUMENT',message:'该参数不是个对象：'+data[i][2]+'！'});
                    return;
                }
            }else if(data[i][1] === 'lowerStr'){
                source[data[i][2]] = main.getLowerStr(source,data[i][2]);
            }else if(data[i][1] === 'urldecode'){
                source[data[i][2]] = main.getUrldecode(source,data[i][2]);
            }else {
                source[data[i][2]] = main.getStr(source,data[i][2]);
            }
            if(data[i][0] === 'body'){
                req.body = source;
            }else if(data[i][0] === 'headers'){
                req.headers = source;
                req.body[data[i][2]] = source[data[i][2]];
                req._params[data[i][2]] = source[data[i][2]];
            }else{
                req._params = source;
            }
        }
        callback(req,res);
    };

    //通用文本日志：level: FATAL、ERROR、WARN、INFO、DEBUG、OFF、ALL
    main.logs = function(data,level,sort){
        if(main.empty(data)){
            return ;
        }
        if(main.empty(level)){
            level = 'debug';
        }
        level = level.toLowerCase();
        main.config().logs.level = main.config().logs.level.toLowerCase();
        if(main.config().logs.level === 'off'){
            return ;
        }else if(main.config().logs.level === 'all' || main.config().logs.level === level ){
            if(main.config().debug){
                console.log('--------------------debug '+sort+'--------------------');
                console.log(data);
            }
            if(_.isObject(data.msg)){
                data.msg = data.msg.toString();
            }
            if(_.isObject(data)){
                data = JSON.stringify(data);
            }
            var log_file;
            var log_str;
            if(main.empty(sort)){
                log_file = main.config().logs.path+'/'+main.myDate('date')+'_'+level+'.log';
            }else{
                sort = sort.toLowerCase();
                log_file = main.config().logs.path+'/'+main.myDate('date')+'_'+sort+'_'+level+'.log';
            }
            log_str = main.myDate()+' '+sort+' '+level+' '+data+'\r\n';
            fs.appendFile(log_file,log_str,function (err) {
                if (err) {
                    setTimeout(function(){
                        fs.appendFile(log_file,log_str,function (err) {});    //延时二次记录日志
                    },1000);
                }
            });
        }
    };

    //路径处理：获取文件夹名称
    main.get_folder_name = function(_path){
        return _path.replace(main.path_up(_path),'').replace(/\/+/g,'');
    };

    //路径处理：容错处理，保证路径结尾不是斜杠
    main.path_get = function(_path){
        _path = path.normalize('/'+_path+'/tmp');
        _path = _path.replace(/\\+/g,'/');
        return main.path_up(_path);
    };

    //路径处理：删除重复斜杠
    main.path_normalize = function(_path){
        _path = path.normalize(_path);
        _path = _path.replace(/\\+/g,'/');
        return _path;
    };

    //路径处理：获取上级目录名
    main.path_up = path.dirname;

    //路径处理：获取绝对路径
    main.path_resolve = path.resolve;

    //路径处理：获取扩展名
    main.get_ext = path.extname;

    //路径处理：获取文件名
    main.basename = path.basename;

    //检查文件名、文件夹名是否非法：\/:*?"<>|
    main.check_filename = function(name){
        if(name.search(/\\|\/|:|\*|\?|\"|<|>|\|/gi) === -1){
            return true;
        }
        return false;
    };

    //处理文件名、文件夹名。过滤字符：\/:*?"<>|
    main.deal_filename = function(name){
        return name.replace(/\\|\/|:|\*|\?|\"|<|>|\|/gi,'');
    };

    //获取文件mime
    main.get_mime = function(_path){
        var _mime = mime.lookup(_path);
        if(_mime){
            _mime = _mime.toLowerCase();
        }
        return _mime;
    };

    //转换成JSON数据
    main.json_parse = function(str){
        if( main.empty(str)){
            return '';
        }
        try{
            return JSON.parse(str);
        }catch(err){
            return str;
        }
    };

    //获取服务器端serviceIps
    main.getServerIps = function(){
        var netInterfaces= require('os').networkInterfaces();
        var serverIps = [];
        for (var key in netInterfaces) {
            var netInterface = netInterfaces[key];
            var len = netInterface.length;
            for(var i = 0;i<len;i++){
                for(var k in netInterface[i] ){
                    if(netInterface[i][k] === 'IPv4'){
                        serverIps.push(netInterface[i].address);
                    }
                }
            }
        }
        return serverIps;
    };
    
    //从select条件里剔除某些字段
    main.select_trim = function(select, fields){
        if(main.empty(fields)){
            return select;
        }
        if( ! _.isArray(fields)){
            fields = [fields];    
        }
        var remove_fields = _.map(fields,function(field){ return '-'+field;});
        var select_arr = [];
        if( ! main.empty(select)){
            select = _.clean(select);
            select_arr = select.split(' ');
            _.each(fields, function(field){
                select_arr = _.without(select_arr, field);
            });
            if(_.include(select, '-')){
                select_arr = _.union(select_arr, remove_fields);
            }
        }
        if(main.empty(select_arr)){
            select_arr = remove_fields;
        }
        return select_arr.join(' ');
    };
    
    /**
     * 处理type跟open数据
     * type 场景类型：0=个人相册	 1=个人网盘	 2=离线文件	3=截图	4=公共资源	 10=群相册	11=群共享 20=组织/单位相册 21=组织/单位网盘 30=商品
     * open 公开范围：0=私密，1=完全公开，2=好友公开，3=密码公开(password)，4=群成员公开（gid），5=组织成员公开(oid)，6=购买者公开
     */
    main.dealTypeAndOpen = function(type, open){
       if(type >= 0 && type < 10 ){                          //修正open值
            if(open < 0 || open > 3){
                open = 0;
            }
        }else if(type >= 10 && type < 20 ){                   //10=群相册	11=群共享
            if(open !== 1 && open !== 3  && open !== 4 ){
                open = 4;
            }
        }else if(type >= 20 && type < 30 ){                   //20=组织/单位相册 21=组织/单位网盘
            if(open !== 1 && open !== 3  && open !== 5 ){
                open = 5;
            }
        }else if(type === 30){
            open = 6;
        }else{
            open = 1;
        }
        return {type: type, open: open};
    };
    
    main.fs_exists = function(path){
        return fs.existsSync(path);
    };
    
    //获取文件、文件夹大小（遍历子文件夹及文件）
    main.getFolderSize = function(path){
        var size = 0;
        if(!path){
            return 0;    
        }
        if(!main.fs_exists(path)){
            return 0;
        }
        var states = fs.statSync(path);
        if(states.isFile()){
            return states.size; 
        }
        var sumSize = function(path){
            var files = fs.readdirSync(path);
            files.forEach(walk);
            function walk(file){ 
                var states = fs.statSync(path+'/'+file);   
                if(states.isDirectory()){
                    sumSize(path+'/'+file);
                }else{ 
                    size += states.size;
                }  
            }
        }
        sumSize(path);
        return size;
    };

    _.mixin(main);          //扩展underscore
    
    module.exports = _;
}());
