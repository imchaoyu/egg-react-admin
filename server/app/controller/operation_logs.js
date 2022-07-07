'use strict';

const Controller = require('egg').Controller;

/**
 * @controller logs 操作日志
 */
class LogController extends Controller {
  /**
   * @apikey
   * @summary 创建 操作日志
   * @description 创建 操作日志
   * @router post /api/v0/admin/operation_logs
   * @request body operation_logBodyReq
   */
  async create() {
    const { ctx } = this;
    ctx.validate(ctx.rule.operation_logBodyReq, ctx.reqParams);
    await ctx.service.operation_logs.create(ctx.reqParams);
    ctx.SUCCESS();
  }
}

module.exports = LogController;
