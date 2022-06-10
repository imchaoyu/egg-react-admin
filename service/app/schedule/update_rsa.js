'use strict';

const Subscription = require('egg').Subscription;
const NodeRSA = require('node-rsa');
const path = require('path');
const fs = require('fs');

class UpdateRsa extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1d', // 1 天钟间隔 h:小时 m:分钟 s:秒可以使用cron
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: false, //立即执行定时任务
      disable: true,
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const key = new NodeRSA({ b: 2048 });
    key.setOptions({ encryptionScheme: 'pkcs1' });
    const SERVICE_PRIVATE_DATA = key.exportKey('pkcs1-private-pem-service'),
      SERVICE_PUBLIC_DATA = key.exportKey('pkcs1-public-pem-service'),
      CLIENT_PRIVATE_DATA = key.exportKey('pkcs1-private-pem-client'),
      CLIENT_PUBLIC_DATA = key.exportKey('pkcs1-public-pem-client');
    const rp = path.resolve(__dirname, '../../pem/');
    fs.writeFileSync(rp + 'service_private_key.pem', SERVICE_PRIVATE_DATA.toString());
    fs.writeFileSync(rp + 'service_public_key.pem', SERVICE_PUBLIC_DATA.toString());
    fs.writeFileSync(rp + 'client_private_key.pem', CLIENT_PRIVATE_DATA.toString());
    fs.writeFileSync(rp + 'client_public_key.pem', CLIENT_PUBLIC_DATA.toString());
    this.app.service_rsa = { SERVICE_PUBLIC_DATA, SERVICE_PRIVATE_DATA };
    this.app.client_rsa = { CLIENT_PUBLIC_DATA, CLIENT_PRIVATE_DATA };
    console.log('====================================');
    console.log('RSA秘钥已更新');
    console.log('====================================');
  }
}

module.exports = UpdateRsa;
