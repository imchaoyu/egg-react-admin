'use strict';

const Controller = require('./BaseController');
const jwt = require('jsonwebtoken');
const { SESSION_SECRET_KEY, EXPIRES } = require('../../config/config.settings');

class UserController extends Controller {
  /**
   * 登录
   * @returns
   */
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.params();
    console.log('password: ', password);
    console.log('username: ', username);
    // const user = await ctx.model.User.findOne({
    //   where: {
    //     username,
    //   },
    // });
    const user = {
      id: '001',
      username: 'test',
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
    const enToken = await ctx.helper.encrypt(token);
    ctx.header['x-sys-sessionid'] = enToken;
    // ctx.helper.redisSet('user', { id: user.id, name: user.username });
    // return { user, enToken };
    this.success({ data: { user, token: enToken }, msg: '登录成功' });
  }
}

module.exports = UserController;
