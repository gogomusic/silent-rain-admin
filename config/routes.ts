const routes = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './System/User/Login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './System/User/Register',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: './Dashboard',
    access: 'routeFilter',
  },
  {
    path: '/system',
    name: 'system',
    access: 'routeFilter',
    routes: [
      {
        path: '/system',
        redirect: '/system/personal-center',
      },
      {
        path: '/system/personal-center',
        name: 'personal-center',
        component: './System/PersonalCenter',
        access: 'routeFilter',
      },
      {
        path: '/system/user',
        name: 'user',
        component: './System/User',
        access: 'routeFilter',
      },
      {
        path: '/system/role',
        name: 'role',
        component: './System/Role',
        access: 'routeFilter',
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: './System/Menu',
        access: 'routeFilter',
      },
      {
        path: '/system/log',
        name: 'log',
        component: './System/Log',
        access: 'routeFilter',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './exception/404',
    layout: false,
    path: '/*',
  },
];

export default routes;
export type RouteType = (typeof routes)[number];
