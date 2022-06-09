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
      ctx.body = {
        errorCode: 10002,
        errorMessage: err.message || '验证失败或token过期',
      };
      ctx.status = 200;
    }
  };
};
