'use strict';

const jwt = require('jsonwebtoken');
const { SESSION_SECRET_KEY } = require('../../config/config.settings');

module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const tokenEn = ctx.headers['x-sys-sessionid'];
      if (!tokenEn) {
        throw new Error();
      }
      const token = await ctx.helper.decrypt(tokenEn);
      jwt.verify(token, SESSION_SECRET_KEY);
      await next();
    } catch (err) {
      // const { isEncode } = ctx.app.config;
      // const res = {
      //   errorCode: 10002,
      //   errorMessage: err.message || '验证失败或token过期',
      // };
      // ctx.body = isEncode ? await ctx.helper.encrypt(res) : res;
      // ctx.status = 200;
      ctx.throw(err);
    }
  };
};
