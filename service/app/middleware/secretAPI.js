'use strict';

module.exports = () => {
  /**
   * api传输数据加密
   */
  return async function secretAPI(ctx, next) {
    await next();

    const { isEncode } = ctx.app.config;
    const body = ctx.body;
    ctx.body = isEncode ? await ctx.helper.encrypt(body) : body;
  };
};
