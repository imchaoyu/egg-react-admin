'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/extend/Context.test.js', () => {
  describe('统一数据返回-SUCCESS', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      await ctx.SUCCESS({ data: 'test ctx' });
      assert(ctx.status === 200);
      assert(ctx.body.errorCode === 200);
      assert(ctx.body.data === 'test ctx');
    });
  });
  describe('统一数据返回-FAIL', () => {
    it('should work', async () => {
      const ctx = app.mockContext();
      await ctx.FAIL();
      assert(ctx.status === 200);
      assert(ctx.body.errorCode === 400);
      assert(ctx.body.errorMessage === '操作失败');
    });
  });
  describe('params', () => {
    it('should work', async () => {
      // const ctx = app.mockContext();
    });
  });
});
