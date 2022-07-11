'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

class UserService extends Service {
  /**
   * 创建用户
   * @param {Object} payload 参数
   */
  async create(payload) {
    const { ctx, app } = this;
    const { email, username } = payload;
    if (username.indexOf('admin') > -1) {
      return {
        code: 40000,
        msg: '用户名非法！',
      };
    }
    const current_time = app.timenow;
    const resExistsUsername = await this.existsUserUniqueFields({ username });
    if (resExistsUsername) {
      return {
        code: 40001,
        msg: '用户名已存在',
      };
    }
    const resExistsEmail = await this.existsUserUniqueFields({ email });
    if (resExistsEmail) {
      return {
        code: 40002,
        msg: '邮箱已存在',
      };
    }
    // 密码加盐存库
    payload = Object.assign(payload, await ctx.helper.saltPassword(payload.password));
    payload.password += payload.salt;
    payload.created_at = current_time;
    payload.updated_at = current_time;

    try {
      const res_user = await ctx.model.Users.create(payload);
      return res_user;
    } catch (err) {
      ctx.throw(err);
    }
  }
  /**
   * 用户登录
   * @param {Object} payload 参数
   */
  async login(payload) {
    const { ctx } = this;
    const user = await ctx.model.Users.findOne({
      where: { username: payload.username },
    });
    if (!user) {
      return {
        code: 40003,
        msg: '用户名或密码错误',
      };
    }
    payload = Object.assign(
      payload,
      await ctx.helper.saltPassword(payload.password, user.password.substr(32)),
    );
    payload.password += payload.salt;
    if (payload.password !== user.password) {
      return {
        code: 40003,
        msg: '用户名或密码错误',
      };
    }
    return await this.loginDeal(ctx, user);
  }
  /**
   * 是否存在此用户字段
   * @param {Object} payload 验证参数
   */
  async existsUserUniqueFields(payload) {
    const { ctx } = this;
    const { username, nickname, email, phone } = payload;
    const where = {};
    where[Op.or] = [];
    username ? where[Op.or].push({ username }) : null;
    nickname ? where[Op.or].push({ nickname }) : null;
    email ? where[Op.or].push({ email }) : null;
    phone ? where[Op.or].push({ phone }) : null;
    return await ctx.model.Users.findOne({
      where,
      attributes: { exclude: ['password', 'deleted_at'] },
    });
  }
  /**
   * 登录数据处理
   * @param {Object} ctx Egg ctx
   * @param {Object} user 用户信息
   * @returns user token
   */
  async loginDeal(ctx, user) {
    if (user.state !== 0) {
      return {
        code: 40005,
        msg: '账号已停用!',
      };
    }
    user.update({
      last_login: this.app.timenow,
    });
    const { SESSION_SECRET_KEY, EXPIRES } = ctx.app.config;
    const currentuserInfo = { id: user.id, username: user.username };
    const token = jwt.sign(currentuserInfo, SESSION_SECRET_KEY, { expiresIn: EXPIRES });
    const enToken = await ctx.helper.encryptToken(token);
    ctx.header['x-sys-sessionid'] = enToken;
    ctx.helper.redisSet('userInfo', currentuserInfo);
    return { user, enToken };
  }
}

module.exports = UserService;
