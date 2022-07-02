'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/extend/helper.test.js', () => {
  describe('service公钥加密', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      assert(await ctx.helper.encryptToken('123'));
    });
    it('空字符串加密', async () => {
      const ctx = app.mockContext();
      assert((await ctx.helper.encryptToken()) === '');
    });
  });
  describe('service私钥解密', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      assert(ctx.helper.decrypt());
    });
  });
  describe('service私钥加密', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      assert(await ctx.helper.encrypt('123'));
    });
  });
  describe('密码加盐', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      assert(await ctx.helper.saltPassword('123456'));
    });
  });
});
