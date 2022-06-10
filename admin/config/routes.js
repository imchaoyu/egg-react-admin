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
        component: '@/pages/Login/Login',
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
    name: '网站设置',
    icon: 'DesktopOutlined',
    path: '/web',
    routes: [
      {
        path: '/web',
        redirect: '/web/menus',
      },
      {
        name: '栏目管理',
        icon: 'BarsOutlined',
        path: '/web/menus',
        component: '@/pages/menus',
      },
      {
        name: '内容管理',
        icon: 'ReadOutlined',
        path: '/web/article',
        component: '@/pages/articles',
      },
      {
        name: '会员管理',
        icon: 'TeamOutlined',
        path: '/web/members',
        component: '@/pages/member',
      },
      {
        name: '评论管理',
        icon: 'CommentOutlined',
        path: '/web/files',
        component: '@/pages/files',
      },
    ],
  },
  {
    name: '常规配置',
    icon: 'DatabaseOutlined',
    path: '/settings',
    routes: [
      {
        path: '/settings',
        redirect: '/settings/area',
      },
      {
        name: '地区管理',
        icon: 'icon-area',
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
        icon: 'ControlOutlined',
        path: '/system/settings',
        component: '@/pages/system',
      },
      {
        name: '角色权限',
        icon: 'SolutionOutlined',
        path: '/system/role',
        component: '@/pages/system',
      },
    ],
  },
  {
    name: '系统日志',
    icon: 'FieldTimeOutlined',
    path: '/logs',
    routes: [
      {
        path: '/logs',
        redirect: '/logs/aboutlogin',
      },
      {
        name: '登录日志',
        icon: 'LoginOutlined',
        path: '/logs/aboutlogin',
        component: '@/pages/logs',
      },
      {
        name: '错误日志',
        icon: 'BugOutlined',
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
