'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/system.test.js', () => {
  describe('GET /key', () => {
    it('should work', async () => {
      const res = await app.httpRequest().get(`${app.prefix}/key`);
      assert(res.status === 200);
      assert(res.body.data);
    });
  });
});
