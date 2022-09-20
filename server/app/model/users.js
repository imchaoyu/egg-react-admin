/* indent size: 2 */

module.exports = app => {
  const { INTEGER, DATE, STRING, TINYINT } = app.Sequelize;

  const User = app.model.define(
    'users',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(60),
      nickname: STRING(60),
      password: STRING(64),
      email: STRING(60),
      state: TINYINT,
      phone: STRING(15),
      avatar: STRING(255),
      company: STRING(80),
      city: STRING(80),
      last_login: DATE,
      created_at: {
        type: DATE,
        allowNull: true,
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
      tableName: 'users',
    },
  );

  User.associate = function () {};

  return User;
};
