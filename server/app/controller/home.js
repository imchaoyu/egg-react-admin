'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // const user = {
    //   name: '123',
    //   age: 123,
    // };
    const { ctx } = this;
    ctx.SUCCESS({ data: 'hi,chaoyu!' });
  }
}

module.exports = HomeController;
