'user strict';

const swaggerCfg = {
  basePath: '/',
  dirScanner: './app/controller',
  apiInfo: {
    title: 'egg-react-admin',
    description: 'egg-react-admin api 文档',
    version: '1.0.0',
  },
  schemes: ['http'],
  enable: true,
  routerMap: false,
  securityDefinitions: {
    apikey: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    oauth2: {
      type: 'oauth2',
      tokenUrl: 'http://127.0.0.1:7002/api/v1/users/login',
      flow: 'password',
      scopes: {
        'write:access_token': 'write access_token',
        'read:access_token': 'read access_token',
      },
    },
  },
  enableSecurity: true,
};

module.exports = swaggerCfg;
