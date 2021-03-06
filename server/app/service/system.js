'use strict';

const Service = require('egg').Service;

class SystemService extends Service {
  /**
   * 获取密钥
   * @returns rsa密钥
   */
  async keys() {
    const { ctx } = this;
    try {
      const rsaKey = await ctx.helper.redisGet('rsaKey');
      if (rsaKey) {
        return rsaKey;
      }
      const res = await ctx.model.Keys.findOne({
        where: { id: 1 },
        attributes: ['service_public_key', 'service_private_key'],
      });
      ctx.helper.redisSet('rsaKey', res);
      return res;
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = SystemService;
