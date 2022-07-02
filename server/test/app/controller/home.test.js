'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  describe('GET /', () => {
    it('should work', async () => {
      const res = await app.httpRequest().get(`${app.prefix}/`);
      assert(res.status === 200);
      assert(res.body.data === 'hi,chaoyu!');
    });
  });
});
