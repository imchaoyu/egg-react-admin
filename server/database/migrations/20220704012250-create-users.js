'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING, TINYINT } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(60),
        allowNull: false,
        unique: true,
        comment: '用户名',
      },
      nickname: {
        type: STRING(60),
        comment: '昵称',
        allowNull: true,
        defaultValue: '',
      },
      password: {
        type: STRING(64),
        allowNull: false,
        comment: '用户密码',
      },
      email: {
        type: STRING(60),
        unique: false,
        comment: '邮箱',
      },
      state: {
        type: TINYINT,
        allowNull: true,
        defaultValue: '0',
        comment: '状态：0.停用、1.正常',
      },
      phone: {
        type: STRING(15),
        comment: '手机号',
        allowNull: true,
        defaultValue: '',
      },
      avatar: {
        type: STRING(255),
        comment: '头像url',
        allowNull: true,
        defaultValue: '',
      },
      company: {
        type: STRING(80),
        comment: '国家',
        allowNull: true,
        defaultValue: '',
      },
      city: {
        type: STRING(80),
        comment: '城市',
        allowNull: true,
        defaultValue: '',
      },
      last_login: {
        type: DATE,
        comment: '最后登录时间',
      },
      created_at: {
        type: DATE,
      },
      updated_at: {
        type: DATE,
      },
      deleted_at: {
        type: DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
