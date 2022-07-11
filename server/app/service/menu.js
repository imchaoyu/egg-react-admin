'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class MenuService extends Service {
  /**
   * 获取菜单列表
   * @param {Object} payload 参数
   * @returns 菜单list
   */
  async list(payload) {
    const { ctx } = this;
    const {
      limit,
      offset,
      menu_name,
      order,
      is_floder,
      is_link,
      link,
      route_name,
      component_url,
      component_name,
      state,
      keyword,
    } = payload;
    const where = {};
    keyword
      ? (where[Op.or] = [
          { menu_name: { [Op.like]: `%${keyword}%` } },
          { route_name: { [Op.like]: `%${keyword}%` } },
          { component_name: { [Op.like]: `%${keyword}%` } },
        ])
      : null;
    const Order = [];
    menu_name ? (where.menu_name = { [Op.like]: `%${menu_name}%` }) : null;
    route_name ? (where.route_name = { [Op.like]: `%${route_name}%` }) : null;
    component_name ? (where.component_name = { [Op.like]: `%${component_name}%` }) : null;
    component_url ? (where.component_url = { [Op.like]: `%${component_url}%` }) : null;
    state ? (where.state = state) : null;
    is_floder ? (where.is_floder = is_floder) : null;
    is_link ? (where.is_link = is_link) : null;
    order ? Order.push([order]) : null;
    link ? (where.link = { [Op.like]: `%${link}%` }) : null;
    const res = await ctx.model.Menus.findAndCountAll({
      limit,
      offset,
      where,
      order: Order,
      attributes: { exclude: ['deleted_at'] },
      include: [],
      distinct: true,
    });
    return res;
  }
  /**
   * 创建目录
   * @param {Object} payload 参数
   */
  async create(payload) {
    const { ctx } = this;
    try {
      const res = await ctx.model.Menus.create(payload);
      return res;
    } catch (err) {
      ctx.throw(err);
    }
  }
}

module.exports = MenuService;
