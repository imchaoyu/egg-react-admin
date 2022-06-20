'use strict';

module.exports = {
  /**
   * 根据请求方式获取不同的参数
   * @param {String} key 想取某个固定的值key,为空则返回所有
   * @returns 返回query或body内值
   */
  async params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      const param = key ? this.query[key] : this.query;
      // const res = await ctx.helper.decrypt(param);
      return param;
    } else {
      const param = key ? this.request.body[key] : this.request.body;
      // const res = await ctx.helper.decrypt(param);
      return param;
    }
  },
};
