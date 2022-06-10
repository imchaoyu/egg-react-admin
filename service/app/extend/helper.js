'use strict';

const NodeRSA = require('node-rsa');

module.exports = {
  /**
   * 公钥加密
   * @param {*} data 需要加密数据
   * @returns
   */
  async encrypt(data) {
    const { service_rsa } = this.app.config;
    const { SERVICE_PUBLIC_DATA } = service_rsa;
    // 生成公钥对象
    const public_key = new NodeRSA(SERVICE_PUBLIC_DATA, { encryptionScheme: 'pkcs1' });
    // 格式化原始数据
    const str = JSON.stringify(data);
    // 返回加密内容
    return public_key.encrypt(str, 'base64');
  },
  /**
   * 私钥解密
   * @param {*} data 需要解密数据
   * @returns
   */
  async decrypt(data) {
    const { service_rsa } = this.app.config;
    const { SERVICE_PRIVATE_DATA } = service_rsa;
    // 生成私钥对象
    const private_key = new NodeRSA(SERVICE_PRIVATE_DATA, { encryptionScheme: 'pkcs1' });
    // 解密
    const deStr = private_key.decrypt(data, 'utf8');
    return deStr && JSON.parse(deStr);
  },
  async getPublicKey() {
    const { service_rsa } = this.app.config;
    const { SERVICE_PUBLIC_DATA } = service_rsa;
    // 生成公钥对象
    // const public_key = new NodeRSA(SERVICE_PUBLIC_DATA);
    // return public_key.exportKey('public');
    return SERVICE_PUBLIC_DATA;
  },
};
