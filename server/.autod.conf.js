'use strict';

module.exports = {
  write: true,
  prefix: '^',
  plugin: 'autod-egg',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    "dayjs",
    "egg",
    "egg-cors",
    "egg-mysql",
    "egg-redis",
    "egg-router-plus",
    "egg-scripts",
    "egg-sequelize",
    "egg-swagger-doc",
    "egg-validate",
    "jsonwebtoken",
    "mysql2",
    "node-rsa"
  ],
  devdep: [
    "autod",
    "autod-egg",
    "egg-bin",
    "egg-ci",
    "egg-mock",
    "egg-sequelize-auto",
    "eslint",
    "eslint-config-egg",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "factory-girl",
    "husky",
    "lint-staged",
    "prettier",
    "sequelize-cli"
  ],
  exclude: [
    './test/fixtures',
    './dist',
  ],
};

