/* indent size: 2 */

module.exports = app => {
  const { INTEGER, DATE, STRING, TINYINT } = app.Sequelize;

  const Menus = app.model.define(
    'Menus',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      parent_id: {
        type: INTEGER,
        allowNull: true,
        defaultValue: '',
        comment: '父级菜单',
      },
      menu_name: {
        type: STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '菜单名称',
      },
      icon: {
        type: STRING(20),
        allowNull: true,
        defaultValue: '',
        comment: '菜单icon',
      },
      order: {
        type: STRING,
        allowNull: true,
        defaultValue: '1',
        comment: '排序',
      },
      is_floder: {
        type: TINYINT,
        comment: '是否目录,0:否 1是',
      },
      is_link: {
        type: TINYINT,
        comment: '是否外链:0:否 1是',
      },
      link: {
        type: STRING(100),
        comment: '外链地址',
      },
      route_name: {
        type: STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '路由',
      },
      component_url: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '',
        comment: '组件地址',
      },
      component_name: {
        type: STRING(20),
        allowNull: false,
        defaultValue: '',
        comment: '组件名称',
      },
      state: {
        type: TINYINT,
        allowNull: false,
        defaultValue: 1,
        comment: '状态:0.停用、1.正常',
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
      tableName: 'menus',
    },
  );

  Menus.associate = function () {};

  return Menus;
};
