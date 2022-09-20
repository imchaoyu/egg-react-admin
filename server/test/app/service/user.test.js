'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  describe('server 创建用户', () => {
    it('should create', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const params = {
        username: 'test1',
        email: 'test1@test.com',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.create(params);
      assert(res);
    });
    it('用户名不能包含admin', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const params = {
        username: 'tadmint',
        email: 'test2@test.com',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.create(params);
      assert(res.code === 40000);
    });
    it('用户名和邮箱重复', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const params = {
        username: 'test',
        email: 'test@test.com',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.create(params);
      assert(res.code === 40001 || res.code === 40002);
    });
    it('验重函数', async () => {
      const ctx = app.mockContext();
      // const params = {
      //   username:
      // }
      const haveThisGuys = await ctx.service.user.existsUserUniqueFields({ username: 'test' });
      const haveThisName = await ctx.service.user.existsUserUniqueFields({ nickname: 'test' });
      const haveThisMail = await ctx.service.user.existsUserUniqueFields({
        email: 'test@test.com',
      });
      const haveThisPhone = await ctx.service.user.existsUserUniqueFields({
        phone: '13121345678',
      });
      assert(haveThisGuys !== null);
      assert(haveThisName === null);
      assert(haveThisMail !== null);
      assert(haveThisPhone === null);
    });
  });
  describe('server 登录', () => {
    it('should login', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const params = {
        username: 'test',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.login(params);
      assert(res.user.username === 'test');
    });
    it('生成token', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const params = {
        username: 'test',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.login(params);
      assert(res.enToken);
    });
    it('用户名验证', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const paramserror = {
        username: 'have-no-this-username',
        password: '123456',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.login(paramserror);
      assert(res.code === 40003);
    });
    it('密码验证', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const paramserror = {
        username: 'test',
        password: '1234561',
      };
      // 通过 ctx 访问到 service
      const res = await ctx.service.user.login(paramserror);
      assert(res.code === 40003);
    });
  });
});
