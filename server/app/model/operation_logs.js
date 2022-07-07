/* indent size: 2 */

module.exports = app => {
  const { INTEGER, TEXT, STRING, DATE } = app.Sequelize;

  const OperationLogs = app.model.define(
    'operation_logs',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      operator_id: INTEGER,
      operator_username: STRING(60),
      status: STRING(15),
      ip: STRING(100),
      method: STRING(15),
      url: STRING(255),
      params: TEXT,
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'operation_logs',
    },
  );

  OperationLogs.associate = function () {};

  return OperationLogs;
};
