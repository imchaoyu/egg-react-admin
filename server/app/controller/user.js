'use strict';

const Controller = require('egg').Controller;

/**
 * @controller 用户相关
 */
class UserController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('----', ctx.resparams);
    ctx.SUCCESS({});
  }
}

module.exports = UserController;
