'use strict';
const { USERNAME, PASSWORD, DATABASE, HOST, PORT } = require('./config.settings');

exports.sequelize = {
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true, // 让读取date类型数据时返回字符串而不是UTC时间
    typeCast(field, next) {
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  host: HOST,
  port: PORT,
  database: DATABASE,
  username: USERNAME,
  password: PASSWORD,
  define: {
    timestamps: true, // 添加create,update,delete时间戳
    paranoid: true, // 添加软删除
    freezeTableName: true, // 防止修改表名为复数
    underscored: false, // 防止驼峰式字段被默认转为下划线
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  timezone: '+08:00',
};
