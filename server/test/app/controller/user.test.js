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
      console.log('res: ', res.status);
      assert(res.status === 200);
    });
  });
});
