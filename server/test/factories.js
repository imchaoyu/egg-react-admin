'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;
  // 定义 user 和默认数据
  // factory.define('key', app.model.keys, {
  //   service_public_key: factory.sequence('Keys.service_public_key', n => `public_key_${n}`),
  // });
};
