'use strict';

const Controller = require('egg').Controller;

/**
 * @controller user 用户相关
 */
class UserController extends Controller {
  /**
   * @summary 创建用户
   * @description 创建用户
   * @router post /api/v0/admin/user/create
   * @request body userCreate
   */
  async create() {
    const { ctx } = this;
    ctx.validate(ctx.rule.userCreate);
    const res = await ctx.service.user.create(ctx.reqParams);
    if (res && !res.code) {
      ctx.SUCCESS();
    } else {
      ctx.FAIL(res);
    }
  }
  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /api/v0/amdin/user/login
   * @request body userLogin
   */
  async login() {
    const { ctx, service } = this;
    const beforeParams = {
      username: ctx.rule.userLogin.username,
      password: {
        type: 'string',
        required: true,
        trim: true,
      },
    };
    ctx.validate(beforeParams, ctx.reqParams);
    // ctx.reqParams.password = await ctx.helper.decrypt(ctx.reqParams.password);
    ctx.validate(ctx.rule.userLogin, ctx.reqParams);
    const res = await service.user.login(ctx.request.body);
    if (res && !res.code) {
      ctx.SUCCESS({ data: res });
    } else {
      ctx.FAIL(res);
    }
  }
}

module.exports = UserController;
