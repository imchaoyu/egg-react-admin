'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 登录
   * @returns 用户信息
   */
  async login(payload) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Users.findOne({
        where: { username: payload.username },
      });
      if (!res) {
        return {
          code: 400,
        };
      }
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = UserService;
