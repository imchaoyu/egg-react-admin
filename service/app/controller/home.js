'use strict';

const Controller = require('./BaseController');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('ctx: ', ctx.method, ctx.body, ctx.query, ctx.params());
    this.success();
  }
}

module.exports = HomeController;
