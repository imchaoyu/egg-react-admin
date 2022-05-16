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
    name: '控制台',
    icon: 'HomeOutlined',
    path: '/dashboard',
    component: '@/pages/dashboard',
  },
  {
    name: '栏目管理',
    icon: 'icon-menus',
    path: '/menus',
    component: '@/pages/menus',
  },
  {
    name: '内容管理',
    icon: 'icon-article',
    path: '/article',
    component: '@/pages/articles',
  },
  {
    name: '会员管理',
    icon: 'icon-users',
    path: '/members',
    component: '@/pages/member',
  },
  {
    name: '评论管理',
    icon: 'icon-comment',
    path: '/files',
    component: '@/pages/files',
  },
  {
    name: '常规配置',
    icon: 'icon-base',
    path: '/settings',
    // component: '@/pages/settings',
    routes: [
      {
        name: '地区管理',
        icon: 'icon-menu-dot',
        path: '/settings/area',
        component: '@/pages/settings',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/system',
    routes: [
      {
        path: '/system',
        redirect: '/system/settings',
      },
      {
        name: '基础配置',
        icon: 'icon-menu-dot',
        path: '/system/settings',
        component: '@/pages/system',
      },
      {
        name: '角色权限',
        icon: 'icon-menu-dot',
        path: '/system/role',
        component: '@/pages/system',
      },
    ],
  },
  {
    name: '系统日志',
    icon: 'icon-logs',
    path: '/logs',
    routes: [
      {
        path: '/logs',
        redirect: '/logs/aboutlogin',
      },
      {
        name: '登录日志',
        icon: 'icon-menu-dot',
        path: '/logs/aboutlogin',
        component: '@/pages/logs',
      },
      {
        name: '错误日志',
        icon: 'icon-menu-dot',
        path: '/logs/abouterror',
        component: '@/pages/logs',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './errorPages/404',
  },
];
