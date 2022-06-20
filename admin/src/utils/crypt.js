import NodeRSA from 'node-rsa';
import CryptoJS from 'crypto-js';
import settings from '../../config/config.settings';

const settingsType = {
  session: settings.SESSION_KEY,
  default: settings.DEFAULT_KEY,
};

/**
 * 数据加密to api
 * @param {*} data 需要加密的数据
 */
export const Encrypt = async (data) => {
  try {
    const public_key = await getSession('public_key');
    // 生成公钥对象
    const key = new NodeRSA(public_key, { encryptionScheme: 'pkcs1' });
    // 格式化原始数据
    const str = JSON.stringify(data);
    // 返回加密内容
    return key.encrypt(str, 'base64');
  } catch (err) {
    console.error('Encrypt', err);
  }
};
/**
 * 数据解密 from api
 * @param {String} data 需要解密的数据
 */
export const Decrypt = async (data) => {
  try {
    const public_key = await getSession('public_key');
    // 生成公钥对象
    const key = new NodeRSA(public_key, { encryptionScheme: 'pkcs1' });
    // 解密
    const deStr = key.decryptPublic(data, 'utf8');
    return deStr && JSON.parse(deStr);
  } catch (err) {
    console.error('Decrypt err: ', err);
  }
};
/**
 * 前端加密
 * @param {*} message 需要加密的数据
 * @param {*} type 加密类型
 * @returns
 */
export const AESEncrypt = async (message, key = 'default') => {
  if (!message) return '';
  const msg = JSON.stringify(message);
  const encode = CryptoJS.AES.encrypt(msg, settingsType[key], {
    iv: settings.IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return encode;
};
/**
 * 前端解密
 * @param {String} encrypt 需要解密的数据
 * @param {String} key 寂寞类型default|session
 * @returns 解密后的数据
 */
export const AESDecrypt = async (encrypt, key = 'default') => {
  if (!encrypt) return '';
  const decode = CryptoJS.AES.decrypt(encrypt, settingsType[key], {
    iv: settings.IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decode);
};
/**
 * MD5加密
 * @param {String} str 需要加密的数据
 * @param {String} key 加密类型 default|session
 * @returns md5
 */
export const MD5 = async (str, key = 'default') => {
  return CryptoJS.MD5(settingsType[key] + str).toString();
};
/**
 * sessionStorage存储
 * @param {String} key 储存名称
 * @param {String|Object} value 储存数据（加密）
 * @param {Boolean} flag 是否需要加密处理
 * @returns
 */
export const setSession = async (key, value, flag = true) => {
  const enKey = await MD5(key);
  const enValue = flag ? await AESEncrypt(value, 'session') : value;
  return sessionStorage.setItem(enKey, enValue);
};
/**
 * 读取sessionStorage数据
 * @param {String} key 读取储存的名称
 * @param {Boolean} flag 是否是加密数据
 * @returns
 */
export const getSession = async (key, flag = true) => {
  try {
    const enkey = await MD5(key);
    const item = sessionStorage.getItem(enkey);
    const value = flag ? await AESDecrypt(item, 'session') : item;
    return value;
  } catch (err) {
    console.error('getSession', err);
  }
};
