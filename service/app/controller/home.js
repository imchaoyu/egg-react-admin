'use strict';

const Controller = require('./BaseController');

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
    console.log('en: ', en);
    const de = await ctx.helper.decrypt(en);
    console.log('de: ', de);
    this.success();
  }
  /**
   * 获取公钥
   */
  async getPubicKey() {
    const { ctx } = this;
    try {
      const str = await ctx.helper.getPublicKey();
      this.success({ data: str });
    } catch (err) {
      this.fail(err);
    }
  }
  async decodeDemo() {
    const { ctx } = this;
    try {
      const p = ctx.params();
      const res = await ctx.helper.decrypt(p.data);
      this.success({ data: res });
    } catch (err) {
      console.log('err========', err);
      ctx.throw(500, err);
    }
  }
}

module.exports = HomeController;
