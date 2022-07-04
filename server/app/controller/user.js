'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户相关
 */
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 创建用户
   * @router post /api/v0/amdin/create
   * @request body userCreate
   */
  async create() {
    const { ctx } = this;
    ctx.validate(ctx.rule.userCreate);
    const res = await ctx.service.user.create(ctx.resparams);
    if (res && !res.code) {
      ctx.SUCCESS();
    } else {
      ctx.FAIL({ code: res.code, msg: res.msg });
    }
  }
  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /api/v0/amdin/login
   */
  async login() {
    const { ctx } = this;
    console.log('----', ctx.resparams);
    ctx.SUCCESS({});
  }
}

module.exports = UserController;
