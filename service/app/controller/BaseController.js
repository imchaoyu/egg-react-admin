'use strict';

const { Controller } = require('egg');
/**
 * BaseController
 * 处理返回数据格式
 * status统一为200，通过errCode作为真实状态码处理，errMessage进行信息提示，data返回成功后的数据
 */
class BaseController extends Controller {
  async success({ data = null, msg = '操作成功', showType = 0 } = {}) {
    const { ctx } = this;
    ctx.body = {
      errorCode: 200,
      errorMessage: msg,
      showType,
      data,
    };
    ctx.status = 200;
  }
  // 请求失败操作
  async fail(err, showType = 4) {
    const { ctx } = this;
    // 验证字段失败 返回422
    const errText = err.status !== 422 ? err.message : err.errors[0].message;
    if (err) {
      ctx.body = {
        errorCode: err.status || 500,
        errorMessage: errText,
        showType,
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
