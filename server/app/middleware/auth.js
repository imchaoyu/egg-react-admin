'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const tokenEn = ctx.headers['x-sys-sessionid'];
      if (!tokenEn) {
        throw new Error();
      }
      const token = await ctx.helper.decrypt(tokenEn);
      jwt.verify(token, ctx.app.config.SESSION_SECRET_KEY);
      await next();
    } catch (err) {
      ctx.throw(err);
    }
  };
};
