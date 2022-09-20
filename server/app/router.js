'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, config } = app;
  const pkgVersion = config.pkg.version.split('.')[0];
  const v = `v${pkgVersion}`;
  // 前缀设置 ex: /api/v1/example
  const apiRouter = router.namespace(`/api/${v}`);
  // swagger文档
  router.redirect('/doc', '/swagger-ui.html', 302);
  // 通用类api
  apiRouter.get('/', controller.home.index);
  apiRouter.get('/key', controller.system.key);
  // apiRouter.post('/login', controller.user.login);
  // apiRouter.post('/decodeDemo', controller.home.decodeDemo);
  // 后台api
  require('./routes/admin')(app, v);
  // web端api
  require('./routes/web')(app, v);
};
