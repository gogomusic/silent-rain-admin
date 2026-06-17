import type { MenuItem } from './app';
import { type TreeNode, tree2array } from './utils';

/**
 * @see https://umijs.org/docs/max/access#access
 * */

type AccessResult = {
  routeFilter: (route: any) => boolean;
  [key: string]: boolean | ((route: any) => boolean);
};

export default function access(
  initialState: { currentUser?: API.User; menus: MenuItem[] } | undefined,
): AccessResult {
  const { currentUser, menus } = initialState ?? {};
  const menuList = tree2array((menus as TreeNode[]) || []);
  const permissionList =
    currentUser?.permissions.reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    ) || {};
  return {
    routeFilter: (route: any) =>
      menuList.some((menu) => menu.path === route.path),
    ...permissionList,
  };
}
