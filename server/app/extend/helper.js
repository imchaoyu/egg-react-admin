'use strict';
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

module.exports = {
  /**
   * service公钥加密,用于token
   * @param {*} data 需要加密数据
   * @return {String} 加密数据
   */
  async encryptToken(data) {
    if (!data) return '';
    const { service_rsa } = this.app.config;
    const { service_public_key } = service_rsa;
    // 生成公钥对象
    const key = new NodeRSA(service_public_key, { encryptionScheme: 'pkcs1' });
    // 格式化原始数据
    const str = JSON.stringify(data);
    // 返回加密内容
    return key.encrypt(str, 'base64');
  },
  /**
   * service私钥解密
   * @param {*} data 需要解密数据
   * @return {Object|String} 解密的数据
   */
  async decrypt(data) {
    if (!data) return '';
    const { service_rsa } = this.app.config;
    const { service_private_key } = service_rsa;
    // 生成私钥对象
    const key = new NodeRSA(service_private_key, { encryptionScheme: 'pkcs1' });
    // 解密
    const deStr = key.decrypt(data, 'utf8');
    return deStr && JSON.parse(deStr);
  },
  /**
   * service私钥加密,用于api
   * @param {*} data 需要加密数据
   * @return {Object|String} 解密的数据
   */
  async encrypt(data) {
    if (!data) return '';
    const { service_rsa } = this.app.config;
    const { service_private_key } = service_rsa;
    // 生成公钥对象
    const key = new NodeRSA(service_private_key, { encryptionScheme: 'pkcs1' });
    // 格式化原始数据
    const str = JSON.stringify(data);
    // 返回加密内容
    return key.encryptPrivate(str, 'base64');
  },

  /**
   * 密码加盐
   * @param {String} password 原始密码
   * @param {*} salt 盐，默认crypto生成随机
   * @return {salt, pwdWithSalt} 盐和密码
   */
  async saltPassword(
    password,
    salt = crypto.createHash('md5').update(Math.random().toString()).digest('hex'),
  ) {
    const password_finally = crypto
      .createHash('md5')
      .update(password + ':' + salt)
      .digest('hex');
    return {
      salt,
      password: password_finally,
    };
  },
  /**
   * redis存储值
   * @param {String} key redis key值
   * @param {Any} value redis value
   * @param {Number} seconds redis有效期
   */
  async redisSet(key, value, seconds) {
    const { redis, config } = this.app;
    value = JSON.stringify(value);
    // 设置有效时间
    await redis.set(key, value, 'EX', seconds || config.redisMaxAge);
  },
  /**
   * 获取redis
   * @param {String} key 获取的redis
   * @returns redis存储的数据
   */
  async redisGet(key) {
    const { redis } = this.app;
    let data = await redis.get(key);
    if (!data) return;
    data = JSON.parse(data);
    return data;
  },
  /**
   * 清空redis
   * @returns novid
   */
  async redisRemove() {
    const { redis } = this.app;
    redis.flushall();
    return;
  },
};
