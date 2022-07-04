'use strict';
const RESPARAMS = Symbol('Context#resparams');

module.exports = {
  /**
   * 根据请求方式获取不同的参数,只考虑get和post请求
   */
  get resparams() {
    if (!this[RESPARAMS]) {
      const method = this.request.method.toLocaleUpperCase();
      const { isEncode } = this.app.config;
      if (method === 'GET') {
        const { query } = this;
        if (isEncode && query) {
          const deQuery = this.helper.decrypt(query);
          this[RESPARAMS] = deQuery;
        } else {
          this[RESPARAMS] = query;
        }
      }
      if (method === 'POST') {
        const body = this.request.body;
        if (isEncode && body) {
          const deBody = this.helper.decrypt(body);
          this[RESPARAMS] = deBody;
        } else {
          this[RESPARAMS] = body;
        }
      }
    }
    return this[RESPARAMS];
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
   * @param {String|Number} root0.code 错误代码
   * @param {String} root0.msg 提示信息
   * @param {Number} root0.showType 类型
   */
  async FAIL({ code = 400, msg = '操作失败', showType = 3 } = {}) {
    const res = {
      errorCode: code,
      errorMessage: msg,
      showType,
    };
    this.body = res;
    this.status = 200;
  },
};
