'use strict';

const { Controller } = require('egg');
const jwt = require('jsonwebtoken');
const { SESSION_SECRET_KEY, EXPIRES } = require('../../config/config.settings');

class UserController extends Controller {
  /**
   * 登录
   * @returns
   */
  async login() {
    const { ctx } = this;
    const { username, password } = await ctx.params();
    console.log('password: ', password);
    console.log('username: ', username);
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
      // ctx.helper.redisSet('user', { id: user.id, name: user.username });
      // return { user, enToken };
      ctx.SUCCESS({ data: { user, token: enToken }, msg: '登录成功' });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = UserController;
