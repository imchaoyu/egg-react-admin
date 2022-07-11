/**
 * 管理后台路由
 * @param {Egg.Application} app - egg application
 * @param {String} version - api前缀版本
 */
module.exports = (app, version) => {
  const { router, controller } = app;
  // 前缀设置 ex: /api/v1/admin/example
  const apiWebAdminRouter = router.namespace(`/api/${version}/admin`);
  // 用户相关
  apiWebAdminRouter.post('/user/login', controller.user.login);
  apiWebAdminRouter.post('/user/create', controller.user.create);
  // 菜单相关
  apiWebAdminRouter.post('/createMenu', controller.menu.create);
  apiWebAdminRouter.get('/getMenus', controller.menu.list);
};
