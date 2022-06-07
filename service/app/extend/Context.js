'use strict';

module.exports = {
  /**
   * 根据请求方式获取不同的参数
   * @param {String} key 想取某个固定的值key,为空则返回所有
   * @returns 返回query或body内值
   */
  params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    } else {
      return key ? this.request.body[key] : this.request.body;
    }
  },
};
