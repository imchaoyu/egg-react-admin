'use strict';

module.exports = () => {
  return async function notFound(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        errCode: 404,
        msg: '未发现资源！',
      };
      ctx.status = 404;
    }
  };
};
