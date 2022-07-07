'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  /**
   *  日志记录
   * @param {Object} payload 日志参数
   * @returns 成功失败
   */
  async create(payload) {
    console.log('payload: ', payload);
    const { ctx } = this;
    const res = await ctx.model.OperationLogs.create(payload);
    console.log('res: ', res);
  }
}

module.exports = LogService;
