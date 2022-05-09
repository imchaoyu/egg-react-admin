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
  { path: '/', component: '@/pages/index' },
  {
    component: './errorPages/404',
  },
];
