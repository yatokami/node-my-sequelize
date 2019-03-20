# node-my-sequelize

## node-my-sequelize

基于 sequelize 封装自己适用版的数据库orm

## Installation

`$ npm install`

### Examples

```javascript
const { configManager, Order, Op } = require('./models');
const { to } = require('await-to-js');

let mysql_conf = {
    host: '192.168.0.228',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'the_dmg_cms',
};

configManager.init_db('cms', mysql_conf);

async function test () {
    let OrderModel = new Order();
    [ err, order ] = await to(OrderModel.module().findAll({
        attributes: ['appid', 
        ['orderid', 'id'], 
        ['order_number', 'orderNo'], 
        ['price', 'acturalPaid'],
        ['tax', 'taxTotal'], 
        ['real_name', 'buyerName'], 
        ['id_card', 'buyerIdNumber'],
        ['phone' , 'consigneeTelephone'],
        ['delivery_company' , 'logisticsName'],
        ['delivery_code' , 'logisticsCode'],
        ['delivery_sn' , 'logisticsNo'],
        'area',
        ['address','try_time'],
        ['electron_order_send_status' , 'status'], 
        ['coupon_money' , 'couponMoney'], 
        ['delivery_fee' , 'deliveryFee'],
        ['customs_type' , 'customsType'],
        'pay_status'],
        limit: 1
    }));
    if(err) return console.log(err);
    console.log(order[0]);
}
```

 

## DOCUMENT

[中文文档 v4](https://github.com/demopark/sequelize-docs-Zh-CN)  

