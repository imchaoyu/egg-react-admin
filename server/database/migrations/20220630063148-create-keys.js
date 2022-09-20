'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('keys', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      client_public_key: {
        type: STRING(2000),
        allowNull: false,
        defaultValue: '',
        comment: '客户端rsa公钥',
      },
      client_private_key: {
        type: STRING(2000),
        allowNull: false,
        defaultValue: '',
        comment: '客户端rsa私钥',
      },
      service_public_key: {
        type: STRING(2000),
        allowNull: false,
        defaultValue: '',
        comment: '服务端rsa公钥',
      },
      service_private_key: {
        type: STRING(2000),
        allowNull: false,
        defaultValue: '',
        comment: '服务端rsa私钥',
      },
      created_at: {
        allowNull: false,
        type: DATE,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
      },
      deleted_at: {
        allowNull: true,
        type: DATE,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('keys');
  },
};
