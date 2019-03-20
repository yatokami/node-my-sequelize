const { getConfig } = require('./configManager');

// 模型父类
class Model {

    constructor() {
    }

    set db_name(name) {
        this._db_name = name;
    }

    set table_name(name) {
        this._table_name = name;
    }

    set suffix(suffix) {
        this._table_name = this.table_name + suffix;
    }

    set prefix(prefix) {
        this._table_name = prefix + this.table_name;
    }

    // 获取数据库管理配置
    getConfigManager(db_name) {
        return getConfig(db_name);
    }
}

module.exports = Model;