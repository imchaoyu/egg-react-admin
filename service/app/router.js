/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, config } = app;
  const pkgVersion = config.pkg.version.split('.')[0];
  const prefix = `v${pkgVersion}`;
  // 前缀设置 ex: /api/v1/example
  const apiRouter = router.namespace(`/api/${prefix}`);
  // 通用类api
  apiRouter.get('/', controller.home.index);
  // 后台api
  require('./routes/admin')(app, prefix);
  // web端api
  require('./routes/web')(app, prefix);
};
