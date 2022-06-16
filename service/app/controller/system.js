'use strict';

const Controller = require('./BaseController');

class SystemController extends Controller {
  /**
   * 获取密钥
   */
  async key() {
    const { ctx } = this;
    try {
      const res = await ctx.service.system.keys();
      this.success({ data: res.service_public_key });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = SystemController;
