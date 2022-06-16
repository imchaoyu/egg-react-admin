/* indent size: 2 */

module.exports = (app) => {
  const DataTypes = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updateAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'user',
    },
  );

  User.associate = function () {};

  return User;
};
