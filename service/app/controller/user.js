'use strict';

const { Controller } = require('egg');
const jwt = require('jsonwebtoken');

/**
 * @controller 用户 user
 */
class UserController extends Controller {
  /**
   * @summary 登录
   * @description 登录
   * @router post /api/v1/admin/login
   * @request body userLogin
   */
  async login() {
    const { ctx, app } = this;
    const { SESSION_SECRET_KEY, EXPIRES } = app.config;
    const { username, password } = await ctx.params();
    ctx.validate(ctx.rule.userLogin);
    const userInfo = await ctx.service.user.login({ username, password });
    if (!userInfo) {
      ctx.throw(404, '用户名或密码错误！');
    }
    try {
      const user = {
        id: '001',
        username,
        sex: 'female',
        age: 100,
      };
      const token = jwt.sign(
        {
          id: user.id,
        },
        SESSION_SECRET_KEY,
        { expiresIn: EXPIRES },
      );
      const enToken = await ctx.helper.encryptToken(token);
      ctx.header['x-sys-sessionid'] = enToken;
      ctx.SUCCESS({ data: { user, token: enToken }, msg: '登录成功' });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = UserController;
