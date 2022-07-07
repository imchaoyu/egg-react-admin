'use strict';

module.exports = (option, app) => {
  return async function (ctx, next) {
    try {
      await next();
      const currentUserInfo = await ctx.helper.redisGet('userInfo');
      // 如果是开发环境或者是生产环境且非GET 存储操作日志
      if (
        (app.config.env === 'prod' || app.config.env === 'local') &&
        ctx.request.method.toLocaleUpperCase() !== 'GET' &&
        currentUserInfo
      ) {
        const payload = {
          operator_id: currentUserInfo.id,
          operator_username: currentUserInfo.username,
          method: ctx.request.method,
          url: ctx.request.url.split('?')[0],
          ip: ctx.request.ip,
          status: ctx.response.status,
          params: JSON.stringify(ctx.request.body),
        };
        ctx.service.log.create(payload);
      }
    } catch (err) {
      console.log('err: ', err);
      // app.logger.errorAndSentry(err);
    }
  };
};
