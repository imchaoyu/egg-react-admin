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
    const pathUrl = path.resolve(__dirname, './pem/');
    const SERVICE_PRIVATE_DATA = fs.readFileSync(pathUrl + '/service_private_key.pem', 'utf-8');
    // 获取公钥
    const SERVICE_PUBLIC_DATA = fs.readFileSync(pathUrl + '/service_public_key.pem', 'utf-8');
    const CLIENT_PRIVATE_DATA = fs.readFileSync(pathUrl + '/client_private_key.pem', 'utf-8');
    // 获取公钥
    const CLIENT_PUBLIC_DATA = fs.readFileSync(pathUrl + '/client_public_key.pem', 'utf-8');
    this.app.config.service_rsa = { SERVICE_PUBLIC_DATA, SERVICE_PRIVATE_DATA };
    this.app.config.client_rsa = { CLIENT_PUBLIC_DATA, CLIENT_PRIVATE_DATA };
  }
}

module.exports = AppBootHook;
