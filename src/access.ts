import { RouteType } from 'config/routes';
import { MenuItem } from './app';
import { tree2array, TreeNode } from './utils';

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState:
    | {
        currentUser?: API.User;
        menus: MenuItem[];
      }
    | undefined,
) {
  const { currentUser, menus } = initialState ?? {};
  const menuList = tree2array((menus as TreeNode[]) || []);
  const permissionList =
    currentUser?.permissions.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>) || {};
  return {
    routeFilter: (route: RouteType) => menuList.some((menu) => menu.path === route.path),
    ...permissionList,
  };
}
