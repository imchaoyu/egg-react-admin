'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/system.test.js', () => {
  describe('GET /', () => {
    it('should get key', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      // 通过 ctx 访问到 service
      const keys = await ctx.service.system.keys();
      assert(keys);
    });
  });
});
