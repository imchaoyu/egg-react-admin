'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  async success({ data = null, msg = '操作成功' } = {}) {
    const { ctx } = this;
    ctx.body = {
      success: true,
      data,
      errorCode: 200,
      errorMessage: msg,
      showType: 0, // 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
      traceId: '', // Convenient for back-end Troubleshooting: unique request ID
      host: '', // Convenient for backend Troubleshooting: host of current access server
    };
    ctx.status = 200;
  }
  // 请求失败操作
  async fail(err) {
    const { ctx } = this;
    // 验证字段失败 返回422
    const errText = err.status !== 422 ? err.message : err.errors[0].message;
    if (err) {
      ctx.body = {
        errCode: err.status || 500,
        msg: errText,
        data: null,
      };
      ctx.status = 200;
    } else {
      throw new Error(err || '未知错误');
    }
  }

  notFound(msg) {
    const message = msg || 'not found';
    this.ctx.throw(404, message);
  }
}
module.exports = BaseController;
