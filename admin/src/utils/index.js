import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
import secret from '../../config/config.secret';

const secretType = {
  session: secret.SESSION_SECRET,
  default: secret.DEFAULT_SECRET,
};

/**
 * 数据加密to api
 * @param {*} data 需要加密的数据
 */
export const Encrypt = async (data) => {
  try {
    const public_key = await getSession('public_key');
    if (!public_key) {
      // throw new Error('public key is not find!');
    }
    const dataStr = JSON.stringify(data);
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    const encrypted = encrypt.encrypt(dataStr);
    return encrypted;
  } catch (err) {
    console.error('Encrypt', err);
  }
};
/**
 * 数据解密 from api
 * @param {String} data 需要解密的数据
 */
export const Decrypt = (data) => {
  let decrypt = new JSEncrypt(); // 新建JSEncrypt对象
  decrypt.setPublicKey(publicKey); // 设置公钥
  // 对需要加密的数据进行解密
  return decrypt.decrypt(data);
};
/**
 * 前端加密
 * @param {*} message 需要加密的数据
 * @param {*} key 加密类型
 * @returns
 */
export const AESEncrypt = async (message, key = 'default') => {
  if (!message) return '';
  const msg = JSON.stringify(message);
  const encode = CryptoJS.AES.encrypt(msg, secretType[key], {
    iv: secret.IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  return encode;
};
// 解密
export const AESDecrypt = async (encrypt, key = 'default') => {
  if (!encrypt) return;
  const decode = CryptoJS.AES.decrypt(encrypt, secretType[key], {
    iv: secret.IV,
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
  return CryptoJS.MD5(secretType[key] + str).toString();
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
