'use strict';

const { Controller } = require('egg');

class SystemController extends Controller {
  /**
   * 获取密钥
   */
  async key() {
    const { ctx } = this;
    try {
      // 首先读取config里值，否则读取数据库
      const service_rsa = ctx.app.config.service_rsa;
      if (service_rsa) {
        ctx.SUCCESS({ data: service_rsa.service_public_key });
        return;
      }
      const res = await ctx.service.system.keys();
      ctx.SUCCESS({ data: res.service_public_key });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = SystemController;
