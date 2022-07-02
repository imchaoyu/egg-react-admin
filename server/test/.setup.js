const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');
const pkg = require('../package.json');
const pkgVersion = pkg.version.split('.')[0];
const v = `v${pkgVersion}`;
const prefix = `/api/${v}`;

before(() => factories(app));
before(() => app.prefix = prefix);
afterEach(async () => {
  // clear database after each test case
  // await Promise.all([app.model.keys.destroy({ truncate: true, force: true })]);
});