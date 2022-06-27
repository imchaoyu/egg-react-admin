'use strict';

module.exports = {
  /**
   * 根据请求方式获取不同的参数
   * @param {String} key 想取某个固定的值key,为空则返回所有
   * @returns 返回query或body内值
   */
  async params(key) {
    const method = this.request.method.toLocaleUpperCase();
    const { isEncode } = this.app.config;
    if (method === 'GET') {
      const enStr = key ? this.query[key] : this.query;
      const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
      return data;
    } else {
      const enStr = key ? this.request.body[key] : this.request.body;
      const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
      return data;
    }
  },
  /**
   * 统一使用POST请求，获取body内容
   * @param {String} key 需要单独获取的字段
   * @returns 请求体数据
   */
  async getRes(key) {
    const { isEncode } = this.app.config;
    const enStr = key ? this.request.body[key] : this.request.body;
    const data = isEncode && enStr ? await this.helper.decrypt(enStr) : enStr;
    return data;
  },
  /**
   * BaseController
   * 处理返回数据格式
   * status统一为200，通过errCode作为真实状态码处理，errMessage进行信息提示，data返回成功后的数据
   */
  async SUCCESS({ data = null, msg = '操作成功', showType = 3 } = {}) {
    const res = {
      errorCode: 2000,
      errorMessage: msg,
      showType,
      data,
    };
    this.body = res;
    this.status = 200;
  },
  async FAIL(err, showType = 3) {
    // 验证字段失败 返回422
    const errText = err.status !== 422 ? err.message : err.errors[0].message;
    if (err) {
      const res = {
        errorCode: err.status || 500,
        errorMessage: errText,
        showType,
      };
      this.body = res;
      this.status = 200;
    } else {
      throw new Error(err || '未知错误');
    }
  },
};
