import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {
    configProvider: {},
    dark: false,
    compact: true,
    import: true,
    style: 'less',
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    locale: false,
  },
  routes,
  npmClient: 'yarn',
});

