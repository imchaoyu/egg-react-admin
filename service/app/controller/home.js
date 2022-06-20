'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {
      code: 200,
      data: {
        name: 'cy',
        age: 100,
      },
      msg: '成功',
    };
    const en = await ctx.helper.encrypt(data);
    const de = await ctx.helper.decrypt(en);
    console.log('de: ', de);
    ctx.SUCCESS();
  }
  /**
   * 获取公钥
   */
  async getPubicKey() {
    const { ctx } = this;
    try {
      const str = await ctx.helper.getPublicKey();
      ctx.SUCCESS({ data: str });
    } catch (err) {
      ctx.FAIL(err);
    }
  }
  async decodeDemo() {
    const { ctx } = this;
    try {
      const p = await ctx.getRes();
      // const res = await ctx.helper.encrypt(p);
      ctx.SUCCESS({ data: p });
    } catch (err) {
      ctx.throw(500, err);
    }
  }
}

module.exports = HomeController;
