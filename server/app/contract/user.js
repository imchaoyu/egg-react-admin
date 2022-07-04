'use strict';

const body = {
  userId: {
    id: { type: 'number', required: true, description: 'id' },
  },
  userBodyReq: {
    username: {
      type: 'string',
      required: true,
      min: 2,
      max: 60,
      trim: true,
      example: 'Imfdj',
      description: '用户名',
    },
    nickname: {
      type: 'string',
      required: false,
      min: 2,
      max: 60,
      trim: true,
      example: 'dj',
      description: '昵称',
    },
    password: {
      type: 'string',
      required: true,
      min: 6,
      max: 30,
      trim: true,
      example: '123123',
      description: '用户密码',
    },
    email: {
      type: 'string',
      required: true,
      max: 60,
      trim: true,
      format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      example: '1@qq.com',
      description: '邮箱',
    },
    state: {
      type: 'number',
      required: false,
      example: 1,
      min: 0,
      max: 1,
      description: '状态：0.停用、1.正常',
    },
    phone: {
      type: 'string',
      required: false,
      min: 11,
      max: 15,
      example: '18836366969',
      description: '手机号',
    },
    avatar: {
      type: 'string',
      required: false,
      trim: true,
      example: '',
      description: '头像url',
    },
    city: {
      type: 'string',
      required: false,
      description: '城市',
    },
    last_login: {
      type: 'string',
      required: false,
      description: '最后登录时间',
    },
    created_at: {
      type: 'string',
      required: false,
      description: '创建时间',
    },
    updated_at: {
      type: 'string',
      required: false,
      description: '更新时间',
    },
    deleted_at: {
      type: 'string',
      required: false,
      description: '删除时间',
    },
  },
};

module.exports = {
  ...body,
  userLogin: {
    ...body.userId,
    ...body.userBodyReq,
  },
  userCreate: {
    ...body.userBodyReq,
  },
};
