'use strict';

const body = {
  menuId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  menuList: {
    parent_id: {
      type: 'number',
      required: false,
      trim: true,
      example: '123',
      description: '父级id',
    },
    menu_name: {
      type: 'string',
      required: true,
      min: 1,
      max: 20,
      trim: true,
      example: 'dj',
      description: '昵称',
    },
    icon: {
      type: 'string',
      required: false,
      min: 1,
      max: 20,
      trim: true,
      example: '',
      description: 'icon',
    },
    order: {
      type: 'string',
      required: false,
      trim: true,
      example: '1',
      description: '排序',
    },
    is_floder: {
      type: 'number',
      required: false,
      example: 1,
      min: 0,
      max: 1,
      description: '是否目录,0:否 1是',
    },
    is_link: {
      type: 'number',
      required: false,
      example: 1,
      min: 0,
      max: 1,
      description: '是否外链:0:否 1是',
    },
    link: {
      type: 'string',
      required: false,
      example: 1,
      min: 3,
      max: 100,
      description: '外链地址',
    },
    route_name: {
      type: 'string',
      required: false,
      example: '/',
      min: 1,
      max: 20,
      description: '路由',
    },
    component_url: {
      type: 'string',
      required: false,
      example: '/',
      min: 1,
      max: 100,
      description: '组件地址',
    },
    component_name: {
      type: 'string',
      required: false,
      example: 'home',
      min: 1,
      max: 20,
      description: '组件名称',
    },
    state: {
      type: 'number',
      required: false,
      example: 1,
      min: 0,
      max: 1,
      description: '状态:0.停用、1.正常',
    },
    created_at: {
      type: 'string',
      required: false,
      description: '创建时间',
    },
    updated_at: {
      type: 'date',
      required: false,
      description: '更新时间',
    },
    deleted_at: {
      type: 'date',
      required: false,
      description: '删除时间',
    },
  },
};

module.exports = {
  ...body,
  menuList: {
    ...body.menuList,
  },
};
