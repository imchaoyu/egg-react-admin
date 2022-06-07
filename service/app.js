'use strict';

const path = require('path');
const fs = require('fs');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 全局配置中增加公钥和私钥供加密使用
    // 获取私钥
    const private_data = fs.readFileSync(
      path.join(__dirname, './certs/rsa_private_key.pem'),
      'utf-8',
    );
    // 获取公钥
    const public_data = fs.readFileSync(
      path.join(__dirname, './certs/rsa_public_key.pem'),
      'utf-8',
    );
    this.app.config.RSA_PUBLIC_DATA = public_data;
    this.app.config.RSA_PRIVATE_DATA = private_data;
  }
}

module.exports = AppBootHook;
