/* indent size: 2 */

module.exports = app => {
  const { INTEGER, DATE, STRING } = app.Sequelize;

  const Keys = app.model.define(
    'Keys',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      client_public_key: {
        type: STRING(2000),
        allowNull: false,
      },
      client_private_key: {
        type: STRING(2000),
        allowNull: false,
      },
      service_public_key: {
        type: STRING(2000),
        allowNull: false,
      },
      service_private_key: {
        type: STRING(2000),
        allowNull: false,
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
    },
    {
      tableName: 'keys',
    },
  );

  Keys.associate = function () {};

  return Keys;
};
