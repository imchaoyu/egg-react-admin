'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  describe('POST /user/create', () => {
    it('should work', async () => {
      const params = {
        username: 'test',
        email: 'test@test.com',
        password: '123456',
      };
      const res = await app.httpRequest().post(`${app.prefix}/admin/user/create`).send(params);
      assert(res.status === 200);
    });
  });
  describe('POST /user/login', () => {
    it('should work', async () => {
      const params = {
        username: 'test',
        password: '123456',
      };
      const res = await app.httpRequest().post(`${app.prefix}/admin/user/login`).send(params);
      assert(res.status === 200);
      assert(res.body.data.user.username === 'test');
      assert(res.body.data.enToken);
    });
  });
});
