'use strict';

module.exports = () => {
  /**
   * 统一错误处理
   * status全部统一为200，返回信息中errCode为真实状态码，配合errMessage提示错误信息
   * @param {Egg.Context} ctx egg context
   * @param {Egg.next} next 继续进行
   */
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const errorCode = err?.status ?? 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const errorMessage =
        errorCode === 500 && ctx?.app?.config?.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      const { isEncode } = ctx.app.config;
      const res = {
        errorCode,
        errorMessage,
        showType: 3,
      };
      ctx.body = isEncode ? await ctx.helper.encrypt(res) : res;
      ctx.status = errorCode;
    }
  };
};
