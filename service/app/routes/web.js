/**
 * 网页路由
 * @param {Egg.Application} app - egg application
 */
module.exports = (app, prefix) => {
  const { router, controller } = app;
  // 前缀设置 ex: /api/v1/web/example
  const apiWebRouter = router.namespace(`/api/${prefix}/web`);
  apiWebRouter.get('/', controller.home.index);
};
