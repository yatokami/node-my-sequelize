/* jshint indent: 2 */
/* jshint indent: 2 */
const Model = require("./model");

module.exports = class TGoods extends Model {

    get table_name() {
        return 't_goods';
    }

    get db_name() {
        return 'oms';
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
        this._db_name = this.db_name;
    }

    module() {
        let config = this.getConfigManager(this._db_name);
        let DataTypes = config['Sequelize'];
        let sequelize = config['sequelize'];
        return sequelize.define(this._table_name, {
            goodsid: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            appid: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
            },
            categoryid: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
            },
            import_export: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            country_record_code: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            goods_record_code: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            goods_num: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            put_name: {
                type: DataTypes.STRING(150),
                allowNull: true,
                defaultValue: ''
            },
            merchant_code: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            merchant_name: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            msg_focus_subject: {
                type: DataTypes.STRING(150),
                allowNull: true,
                defaultValue: ''
            },
            customs_code: {
                type: DataTypes.INTEGER(10),
                allowNull: true
            },
            country_encode: {
                type: DataTypes.INTEGER(10),
                allowNull: true
            },
            spec_model: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            legal_unit: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            sec_legal_unit: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            store_unit: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            fir_trans_num: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            sec_trans_num: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            unit_price: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            currency_system: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            products_dec: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            brand: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            product_hs_code: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            tax_num: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            make_address: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            make_people: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            },
            ori_country_name: {
                type: DataTypes.STRING(50),
                allowNull: true,
                defaultValue: ''
            },
            food_add: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            food_harmful: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            ingredient: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            note: {
                type: DataTypes.STRING(255),
                allowNull: true,
                defaultValue: ''
            },
            net_weight: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0'
            },
            rough_weight: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: '0'
            },
            goods_record_time: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                defaultValue: '0'
            },
            tax_rate: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: '0.00'
            },
            update_time: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
            },
            add_time: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
            },
            flag: {
                type: DataTypes.INTEGER(1),
                allowNull: true,
                defaultValue: '1'
            },
            bonded_warehouse: {
                type: DataTypes.STRING(100),
                allowNull: true,
                defaultValue: ''
            }
        }, this.model_config);
    }
}
