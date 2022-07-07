'use strict';

const dayjs = require('dayjs');
const TIMENOW = Symbol('Application#timenow');

module.exports = {
  get timenow() {
    if (!this[TIMENOW]) {
      this[TIMENOW] = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
    return this[TIMENOW];
  },
};
