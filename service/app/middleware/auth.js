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
      // ctx.body = { errCode: 10002, msg: err.message || '验证失败或token过期' };
      ctx.body = {
        success: true,
        // data,
        errorCode: 10002,
        errorMessage: err.message || '验证失败或token过期',
        showType: 2, // 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
        traceId: '', // Convenient for back-end Troubleshooting: unique request ID
        host: '',
      };
      ctx.status = 200;
    }
  };
};
