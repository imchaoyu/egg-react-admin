'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');
const { Op } = require('sequelize');

class UserService extends Service {
  /**
   * 创建用户
   * @param {Object} payload 参数
   */
  async create(payload) {
    console.log('payload: ', payload);
    const { ctx } = this;
    const { email, username } = payload;
    const current_time = dayjs().format('YYYY-MM-DD hh:mm:ss');
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
   */
  async login() {
    return {};
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
}

module.exports = UserService;
