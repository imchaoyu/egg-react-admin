/**
 * 管理后台路由
 * @param {Egg.Application} app - egg application
 */
module.exports = (app, prefix) => {
  const { router, controller } = app;
  // 前缀设置 ex: /api/v1/admin/example
  const apiWebAdminRouter = router.namespace(`/api/${prefix}/admin`);
  apiWebAdminRouter.post('/login', controller.user.login);
};
