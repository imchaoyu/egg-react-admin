/**
 * name: 路由配置
 * author: chaoyu
 * create_date: 2022-05-10 17:23:03
 */
export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/login',
        component: '@/pages/login/login',
      },
      {
        component: './errorPages/404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '控制台',
    icon: 'HomeOutlined',
    component: '@/pages/dashboard',
  },
  {
    path: '/system',
    name: '系统管理',
    icon: 'icon-sysSettings',
    component: '@/pages/system',
  },
  {
    path: '/settings',
    name: '常规配置',
    icon: 'SettingOutlined',
    component: '@/pages/settings',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './errorPages/404',
  },
];
