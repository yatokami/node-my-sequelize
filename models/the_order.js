/* jshint indent: 2 */
const Model = require("./model");

module.exports = class Order extends Model {

    get table_name() {
        return 'the_order';
    }

    get model_config() {
        let config = {
            freezeTableName: true,
            timestamps: false,
            tableName: this._table_name
        };
        return config;
    }

    constructor(...props) {
        super(...props);
        this._table_name = this.table_name;
    }

    module() {
        let config = this.getConfigManager(this._db_name);
        let DataTypes = config['Sequelize'];
        let sequelize = config['sequelize'];
        return sequelize.define(this._table_name, {
            orderid: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            appid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            storeid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            sub_shopid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            app_name: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            app_logo: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            userid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            order_source: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            order_type: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            order_number: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            goods_info: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            tax: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            delivery_fee: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            payment: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            pay_data: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            dindin_pay_number: {
                type: DataTypes.CHAR(50),
                allowNull: false
            },
            pay_number: {
                type: DataTypes.CHAR(50),
                allowNull: true
            },
            pay_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            pay_type: {
                type: DataTypes.INTEGER(1),
                allowNull: true
            },
            pay_at: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
            },
            reach_reduceid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            reach_consume: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            reach_reduce: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            newbie_reduceid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            newbie_reduce: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            reduce_data: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            couponid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            coupon_consume: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            coupon_money: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            hongbaoid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            hongbao_consume: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            hongbao_money: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            note: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            invoice: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            delivery_company: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            delivery_sn: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            delivery_code: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            delivery_time: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            star: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            star_real: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            star_service: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            star_speed: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            comment_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            comment_time: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            return_money: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            return_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            return_time: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: true,
                defaultValue: ''
            },
            sex: {
                type: DataTypes.INTEGER(4),
                allowNull: true,
                defaultValue: '0'
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                defaultValue: ''
            },
            area: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            address: {
                type: DataTypes.STRING(200),
                allowNull: true,
                defaultValue: ''
            },
            real_name: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            id_card: {
                type: DataTypes.STRING(18),
                allowNull: false
            },
            zip: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            inviter_uid: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            prize_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            prize_money: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            prize_rate: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            exp: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            score: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            score_data: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            score_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            score_time: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            audit: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            modal: {
                type: DataTypes.STRING(10),
                allowNull: true,
                defaultValue: ''
            },
            update_at: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            add_at: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
                defaultValue: '0'
            },
            flag: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '1'
            },
            declare_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            declare_info: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            parent_order_number: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            is_push_sifang: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            declare_trytimes: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            refund_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            refund_amount: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0.00'
            },
            refund_reason: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            refuse_reason: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            top_inviter_uid: {
                type: DataTypes.INTEGER(10),
                allowNull: true,
                defaultValue: '0'
            },
            top_prize_money: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            top_prize_rate: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            electron_order_send_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            electron_order_send_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ceb_electron_order_receive_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            ceb_electron_order_receive_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ent_electron_order_receive_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            ent_electron_order_receive_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            electron_list_send_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            electron_list_send_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ceb_electron_list_receive_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            ceb_electron_list_receive_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ent_electron_list_receive_status: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            ent_electron_list_receive_result: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ceb_electron_list_receive_special: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            try_time: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            list_try_time: {
                type: DataTypes.INTEGER(4),
                allowNull: false,
                defaultValue: '0'
            },
            guid: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            copno: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            send_list: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: '0'
            },
            success: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: '0'
            },
            waybill_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            declare_start_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            declare_end_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            electron_order_send_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            electron_order_receive_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            electron_list_send_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            electron_list_receive_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            customs_type: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            headerid: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            link_source_type: {
                type: DataTypes.INTEGER(4),
                allowNull: true,
                defaultValue: '0'
            },
            wms_status: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '0'
            },
            wms_result: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            wms_type: {
                type: DataTypes.CHAR(30),
                allowNull: true
            },
            push_status: {
                type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
                allowNull: true,
                defaultValue: '0'
            },
            push_result: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            logistics_type: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            pay_no: {
                type: DataTypes.STRING(100),
                allowNull: true
            }
        }, this.model_config);
    }
}