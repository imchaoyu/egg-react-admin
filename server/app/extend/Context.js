'use strict';

module.exports = {
  /**
   * 根据请求方式获取不同的参数
   * @param {String} key 想取某个固定的值key,为空则返回所有
   * @return {Object|String} 返回query或body内值
   */
  async params(key) {
    const method = this.request.method.toLocaleUpperCase();
    const { isEncode } = this.app.config;
    if (method === 'GET') {
      const enStr = key ? this.query[key] : this.query;
      const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
      return data;
    }
    const enStr = key ? this.request.body[key] : this.request.body;
    const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
    return data;
  },
  /**
   * 统一使用POST请求，获取body内容
   * @param {String} key 需要单独获取的字段
   * @return  {Object|String} 请求体数据
   */
  async getRes(key) {
    const { isEncode } = this.app.config;
    const enStr = key ? this.request.body[key] : this.request.body;
    const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
    return data;
  },
  /**
   * SUCCESS
   * 处理请求成功的返回数据格式
   * status统一为200，通过errCode作为真实状态码处理，errMessage进行信息提示，data返回成功后的数据
   * @param {Object} root0 整体参数
   * @param {Object|String} root0.data 返回数据
   * @param {String} root0.msg 提示信息
   * @param {Number} root0.showType 类型
   */
  async SUCCESS({ data = null, msg = '操作成功', showType = 3 } = {}) {
    const res = {
      errorCode: 200,
      errorMessage: msg,
      showType,
      data,
    };
    this.body = res;
    this.status = 200;
  },
  /**
   * FAIL
   * 处理请求失败的返回数据格式
   * status统一为200，通过errCode作为真实状态码处理，errMessage进行信息提示
   * @param {Object} root0 整体参数
   * @param {String} root0.msg 提示信息
   * @param {Number} root0.showType 类型
   */
  async FAIL({ msg = '操作失败', showType = 3 } = {}) {
    const res = {
      errorCode: 400,
      errorMessage: msg,
      showType,
    };
    this.body = res;
    this.status = 200;
  },
};
