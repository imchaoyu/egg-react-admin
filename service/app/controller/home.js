'use strict';

const Controller = require('./BaseController');

class HomeController extends Controller {
  async index() {
    // const { ctx } = this;
    this.success();
  }
}

module.exports = HomeController;
