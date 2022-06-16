'use strict';

// const path = require('path');
// const fs = require('fs');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    // 全局配置中增加公钥和私钥供加密使用
    const ctx = await this.app.createAnonymousContext();
    const { service_public_key, service_private_key } = await ctx.service.system.keys();
    this.app.config.service_rsa = { service_public_key, service_private_key };
    // this.app.config.client_rsa = { CLIENT_PUBLIC_DATA, CLIENT_PRIVATE_DATA };
  }
}

module.exports = AppBootHook;
