'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653984245142_8524';
  // 头信息
  config.bodyParser = {
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/html', 'application/html'],
    },
  };
  // 中间件
  config.middleware = ['notFound', 'errorHandler'];
  // auth过滤
  config.auth = {
    enable: true,
    ignore: ['/api/v1/admin/user/login', '/api/v1/admin/user/logout', '/api/v1/admin/user/captcha'],
  };

  // 配置安全验证
  config.security = {
    csrf: {
      useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
    },
    // 将域名加入白名单
    domainWhiteList: ['http://localhost:8080', 'http://localhost:7001'],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
