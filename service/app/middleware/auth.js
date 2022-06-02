// 'use strict';

// const jwt = require('jsonwebtoken');
// const { AESDecrypt, AESEncrypt } = require('../utils/crypto');
// const { SESSION_SECRET } = require('../../config/config.secret');

// module.exports = () => {
//   return async function auth(ctx, next) {
//     try {
//       const tokenEn = ctx.headers['x-sys-openid'];
//       if (!tokenEn) {
//         return ctx.throw(10002, '用户信息验证失败！');
//       }
//       const token = await AESDecrypt(tokenEn, 'session');
//       jwt.verify(token, SESSION_SECRET);
//       await next();
//     } catch (err) {
//       ctx.body = await AESEncrypt({ errCode: 10002, msg: err.message || '验证失败或token过期' });
//     }
//   };
// };
