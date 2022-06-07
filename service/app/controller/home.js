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
}

module.exports = HomeController;
