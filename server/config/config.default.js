/* eslint valid-jsdoc: "off" */

'use strict';

const swaggerCfg = require('./config.swagger');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1656484357871_3467';
  // 头信息
  config.bodyParser = {
    // enableTypes: ['json', 'form', 'text'],
    // extendTypes: {
    //   text: ['text/html', 'application/html'],
    // },
  };
  // 中间件
  config.middleware = ['notFound', 'errorHandler', 'auth'];
  // auth过滤
  config.auth = {
    enable: true,
    ignore: [
      '/',
      '**/*/login',
      '/api/v0/key',
      '/api/v0/login',
      '/api/v0/admin/login',
      '/api/v1/admin/user/captcha',
    ],
  };
  // Session的默认配置
  config.session = {
    key: 'openid',
    maxAge: 1000 * 3600 * 2, // 2h
    httpOnly: true,
    encrypt: true,
    renew: true, // 延长会话有效期
  };
  // 配置安全验证
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: ['*'], // ['http://localhost:8080']
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  };
  // 错误配置
  config.onerror = {
    async all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = { errorCode: 10001, errorMessage: err?.message ?? '系统出现错误！' };
      ctx.status = 200;
    },
  };

  // swagger配置
  config.swaggerdoc = swaggerCfg;
  // 配置参数校验器，基于parameter
  config.validate = {
    convert: true, // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };
  // 自定义配置
  const userConfig = {
    isEncode: false, // 数据传输是否加密
    EXPIRES: 1000 * 3600 * 24, // session 过期时间
    SESSION_SECRET_KEY: 'woShIcHAoyu*&a,_3_2%=1', // jwt session密钥key
  };

  return {
    ...config,
    ...userConfig,
  };
};
