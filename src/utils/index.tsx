import * as Icons from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import { createElement, type ReactNode } from 'react';
import { message } from '@/components/EscapeAntd';

export const TokenKey = 'authorized-token';

export const getToken = () => {
  return localStorage.getItem(TokenKey);
};

export const setToken = (token: string) =>
  localStorage.setItem(TokenKey, token);

export const removeToken = () => {
  localStorage.removeItem(TokenKey);
};

/** 移除 token 并重定向到登录页，携带当前路径作为 redirect 参数 */
export const logoutAndRedirect = () => {
  removeToken();
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  const searchParams = new URLSearchParams({
    redirect: pathname + search,
  });
  const redirect = urlParams.get('redirect');
  if (window.location.pathname !== '/user/login' && !redirect) {
    window.location.replace(`/user/login?${searchParams.toString()}`);
  }
};

/** 将数组错误信息转为优雅的展示内容 */
export function toMessageContent(msg: string | string[]): React.ReactNode {
  if (Array.isArray(msg)) {
    return (
      <ul style={{ marginBottom: 0, paddingLeft: 16 }}>
        {msg.map((m, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable for static display list
          <li key={i}>{m}</li>
        ))}
      </ul>
    );
  }
  return msg;
}

/** 规范化日期范围参数 */
export const formatDateRangeParams: <
  T extends { dateRange?: [string, string] },
>(
  params: T,
) => Omit<T, 'dateRange'> = (params) => {
  const { dateRange, ...rest } = params;
  const [startDate, endDate] = dateRange || [];
  return startDate && endDate
    ? {
        ...rest,
        startDate,
        endDate,
      }
    : rest;
};

export interface TreeNode {
  id: number | string;
  pid: number | string;
  children?: TreeNode[];
  sort?: number;
  [key: string]: any;
}
/** 数组转树形结构,并自动处理排序 */
export function array2tree<T extends TreeNode>(
  array: T[],
  pid: number | string = 0,
  childrenKey: string = 'children',
): T[] {
  try {
    if (!Array.isArray(array) || array.length === 0) return [];

    // 第一遍：克隆所有节点并存入 Map
    const map = new Map<number | string, T>();
    for (const item of array) {
      map.set(item.id, cloneDeep(item));
    }

    // 第二遍：建立父子关系（O(n) 一次遍历）
    const roots: T[] = [];
    for (const item of map.values()) {
      if ((item as any).pid === pid) {
        roots.push(item);
      } else {
        const parent = map.get((item as any).pid);
        if (parent) {
          (parent as any)[childrenKey] ??= [];
          (parent as any)[childrenKey].push(item);
        }
      }
    }

    // 递归排序
    const sortNodes = (nodes: T[]) => {
      nodes.sort((a, b) => ((a as any).sort ?? 0) - ((b as any).sort ?? 0));
      for (const node of nodes) {
        const children = (node as any)[childrenKey];
        if (Array.isArray(children) && children.length > 0) {
          sortNodes(children);
        }
      }
    };
    sortNodes(roots);

    return roots;
  } catch (err) {
    console.error('数组转树形结构出错：', err);
    return [];
  }
}

/** 树形结构转数组（前序遍历） */
export function tree2array<T extends TreeNode>(
  tree: T[],
): Omit<TreeNode, 'children'>[] {
  const result: Omit<TreeNode, 'children'>[] = [];
  const walk = (nodes: T[]) => {
    for (const node of nodes) {
      const { children, ...rest } = node;
      if (Array.isArray(children) && children.length > 0) {
        walk(children as T[]);
      }
      result.push(rest);
    }
  };
  walk(cloneDeep(tree));
  return result;
}

/** 禁用目标节点及其所有子孙节点 */
export const disableChildren = (
  treeData: TreeNode[],
  parentId?: TreeNode['pid'],
) => {
  if (!parentId) return treeData;

  const d = cloneDeep(treeData);

  // 查找目标节点，找到后禁用整个子树
  const walk = (nodes: TreeNode[]): boolean => {
    for (const node of nodes) {
      if (node.id === parentId) {
        const dfs = (n: TreeNode) => {
          n.disabled = true;
          n.children?.forEach(dfs);
        };
        dfs(node);
        return true;
      }
      if (node.children?.length && walk(node.children)) return true;
    }
    return false;
  };

  walk(d);
  return d;
};

/**
 * 穷举检查（exhaustive check）
 *
 * 用于 TypeScript 的 switch 语句中确保所有情况都被处理。
 * 用法：
 *   switch (value) {
 *     case 'a': ...
 *     case 'b': ...
 *     default: exhaustiveCheck(value);
 *   }
 */
export function exhaustiveCheck(param: never): never {
  const msg = `未处理的情况: ${JSON.stringify(param)}`;
  message.error(msg);
  throw new Error(msg);
}

/** 传入Antd图标名称（字符串），返回对应的图标组件 */
export const renderAntdIcon = (icon?: string | ReactNode) => {
  if (typeof icon !== 'string') return null;
  const Icon = (Icons as Record<string, unknown>)[
    /^<.* \/>$/.test(icon) ? icon.replace('<', '').replace(' />', '') : icon
  ];
  if (Icon) return createElement(Icon as React.ComponentType);
  return null;
};

export function safeJsonParse(jsonString: string): object | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('非法的JSON格式', error);
    return null;
  }
}
