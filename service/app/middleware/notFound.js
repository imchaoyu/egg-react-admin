'use strict';

module.exports = () => {
  return async function notFound(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        errorCode: 404,
        errorMessage: '未发现资源！',
        showType: 2,
      };
      ctx.status = 404;
    }
  };
};
