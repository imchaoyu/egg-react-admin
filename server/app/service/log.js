'use strict';

const Service = require('egg').Service;

class LogService extends Service {
  /**
   *  日志记录
   * @param {Object} payload 日志参数
   * @returns 成功失败
   */
  async create(payload) {
    const { ctx } = this;
    await ctx.model.Logs.create(payload);
  }
}

module.exports = LogService;
