const { configManager,TGoods, Order, Op } = require('./models');
const { to } = require('await-to-js');

let mysql_conf = {
    host: '192.168.0.228',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'the_dmg_cms',
};

let  omsql_conf = {
    host: '192.168.0.228',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'the_dmg_oms',
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

async function test2 () {
    configManager.init_db('oms', omsql_conf);
    let goods_record_data;
    let goodsid = 8861;
    let TGoodsModel = new TGoods();
    let attributes = [
        'sec_trans_num',
        'legal_unit',
        'currency_system',
        'ori_country_name',
        'tax_num',
        'brand',
        'product_hs_code',
        'spec_model',
        'goods_record_code',
        'net_weight',
        'rough_weight'];
    let tgoodswhere = {
        goodsid: goodsid,
        flag: 1
    };
    [err, goods_record_data] = await to(TGoodsModel.module().findAll(
        {
            attributes: attributes, 
            where: tgoodswhere
        }));
}

// async function test3() {
//     let OrderModel = new Order();
//     let row;
//     [err, row] = await to(OrderModel.module().update({ real_name: '白1', phone: 123}, { where : {
//         order_number: '20180720123152000012'
//     }}))
//     if(err) {
//         console.log(err);
//         return ;
//     }
//     if(!row || row.length == 0) {
//         console.log('No data updates');
//         return ;
//     }
//     console.log(row);
// }
test()
test2();
console.log(1);