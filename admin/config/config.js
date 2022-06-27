import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  model: {},
  antd: {
    configProvider: {},
    dark: true,
    compact: true,
    import: true,
    style: 'less',
  },
  request: {},
  initialState: {},
  hash: true,
  dva: {},
  mock: {
    include: ['src/pages/**/_mock.js'],
  },
  layout: {
    locale: false,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    baseNavigator: false,
  },
  // externals: { react: 'React' },
  // headScripts: ['https://unpkg.com/react@17.0.0/umd/react.production.min.js'],
  routes: routes,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  fastRefresh: true,
  mfsu: {},
  npmClient: 'yarn',
});
