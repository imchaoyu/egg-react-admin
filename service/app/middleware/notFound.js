'use strict';

module.exports = () => {
  return async function notFound(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      const { isEncode } = ctx.app.config;
      const res = {
        errorCode: 404,
        errorMessage: '未发现资源！',
        showType: 2,
      };
      ctx.body = isEncode ? await ctx.helper.encrypt(res) : res;
      ctx.status = 404;
    }
  };
};
