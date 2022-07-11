'use strict';

const { Controller } = require('egg');

/**
 * @controller menu 菜单管理
 */
class MenuController extends Controller {
  /**
   * @summary 获取菜单列表
   * @description 获取菜单列表
   * @router get /api/v0/admin/getMenus
   * @request query string keyword 菜单名/组件名/路由名
   * @request query string menu_name 菜单名
   * @request query string route_name 路由名
   * @request query string component_name 组件名
   * @request query string is_floder 是否目录
   * @request query string is_link 是否外链
   * @request query number state 状态
   * @request query number limit limit
   * @request query number offset offset
   */
  async list() {
    const { ctx, service } = this;
    try {
      const params = {
        keyword: {
          type: 'string',
          trim: true,
          required: false,
          max: 50,
        },
        parent_id: {
          ...ctx.rule.menuList.parent_id,
          required: false,
        },
        menu_name: {
          ...ctx.rule.menuList.menu_name,
          required: false,
        },
        icon: {
          ...ctx.rule.menuList.icon,
          required: false,
        },
        order: {
          ...ctx.rule.menuList.order,
          required: false,
        },
        is_floder: {
          ...ctx.rule.menuList.is_floder,
          required: false,
        },
        is_link: {
          ...ctx.rule.menuList.is_link,
          required: false,
        },
        link: {
          ...ctx.rule.menuList.link,
          required: false,
        },
        route_name: {
          ...ctx.rule.menuList.route_name,
          required: false,
        },
        component_url: {
          ...ctx.rule.menuList.component_url,
          required: false,
        },
        component_name: {
          ...ctx.rule.menuList.component_name,
          required: false,
        },
        state: {
          ...ctx.rule.menuList.state,
          required: false,
        },
        limit: {
          type: 'number',
          required: false,
          default: 10,
          max: 1000,
        },
        offset: {
          type: 'number',
          required: false,
          default: 0,
        },
      };
      ctx.validate(params, ctx.reqParams);
      const res = await service.menu.list(ctx.reqParams);
      if (res && !res.code) {
        ctx.SUCCESS({ data: { count: res.count, list: res.rows } });
      } else {
        ctx.FAIL(res);
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
  /**
   * @summary 创建菜单
   * @description 创建菜单
   * @router post /api/v0/admin/createMenu
   * @request body menuList
   */
  async create() {
    const { ctx, service } = this;
    try {
      ctx.validate(ctx.rule.menuList);
      const res = await service.menu.create(ctx.reqParams);
      ctx.SUCCESS(res);
    } catch (err) {
      ctx.throw(err);
    }
  }
}

module.exports = MenuController;
