'use strict';

const Controller = require('./BaseController');

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
        this.success({ data: service_rsa.service_public_key });
        return;
      }
      const res = await ctx.service.system.keys();
      this.success({ data: res.service_public_key });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = SystemController;
