import NodeRSA from 'node-rsa';
import { message } from '@/components/EscapeAntd';
import { cloneDeep } from 'lodash';
import * as Icons from '@ant-design/icons';
import { createElement, ReactNode } from 'react';

export const TokenKey = 'authorized-token';

export const getToken = () => {
  return localStorage.getItem(TokenKey);
};

export const setToken = (token: string) => localStorage.setItem(TokenKey, token);

export const removeToken = () => {
  localStorage.removeItem(TokenKey);
};

/**
 * 使用提供的RSA公钥加密字符串。
 */
export const rsaEncrypt = (data: string, publicKey: string) => {
  const key = new NodeRSA();
  key.setOptions({ encryptionScheme: 'pkcs1_oaep' });
  key.importKey(publicKey);
  return key.encrypt(data, 'base64');
};

/** 将列表请求转化为适合ProTable展示的数据 */
export const formatListRes =
  <T>(
    fn: (params: T) => Promise<
      API.ResponseDto & {
        data?: { list?: any[]; current?: number; pageSize?: number; total?: number };
      }
    >,
  ) =>
  async (params: T) => {
    {
      const { success, data } = await fn(params);
      if (success) {
        return {
          data: data?.list || [],
          total: data?.total || 0,
          success: true,
        };
      }
      return {
        data: [],
        total: 0,
        success: false,
      };
    }
  };

/** 规范化日期范围参数 */
export const normalizeDateRangeParams: <T extends { dateRange?: [string, string] }>(
  params: T,
) => Omit<T, 'dateRange'> = (params) => {
  const { dateRange, ...rest } = params;
  const [start_date, end_date] = dateRange || [];
  return start_date && end_date
    ? {
        ...rest,
        start_date,
        end_date,
      }
    : rest;
};

/** 不会报错的Json.Parse */
export function safeJsonParse(jsonString: string): object | undefined {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('非法的JSON格式', error);
    return undefined;
  }
}

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
): (T & TreeNode)[] {
  try {
    const tree: any[] = [];
    array.forEach((item) => {
      const _item = cloneDeep(item);
      if (_item?.pid === pid) {
        const children = array2tree(array, _item.id);
        // @ts-ignore
        // TODO: 修复此处的ts报错
        if (children?.length > 0) _item[childrenKey] = children;
        tree.push(_item);
      }
    });
    return tree.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0));
  } catch (err) {
    console.error('数组转树形结构出错：', err);
    return [];
  }
}

/** 树形结构转数组 */
export function tree2array(tree: TreeNode[]) {
  const result = [] as Omit<TreeNode, 'children'>[];
  const fn = (_tree: TreeNode[]) => {
    _tree.forEach((item) => {
      if (item.children && item.children.length > 0) {
        fn(item.children);
        delete item.children;
        result.push(item);
      } else {
        result.push(item);
      }
    });
  };
  fn(cloneDeep(tree));
  return result;
}

/** 禁用父节点及其所有子节点 */
export const disableChildren = (treeData: TreeNode[], parentId?: TreeNode['pid']) => {
  if (!parentId) return treeData;

  const recursionFn = (data: TreeNode[], parentId: TreeNode['pid']) => {
    data.forEach((node) => {
      if (node.id === parentId) {
        node.disabled = true;
        if (node.children) {
          node.children.forEach((child) => {
            child.disabled = true;
            if (child.children) {
              recursionFn([child], child.id); // 递归处理更深层次的子节点
            }
          });
        }
      } else if (node.children) {
        recursionFn(node.children, parentId); // 递归查找
      }
    });
  };

  const d = cloneDeep(treeData);
  recursionFn(d, parentId);

  return d;
};

/** 传入Antd图标名称或组件名，返回对应的图标组件 */
export const renderAntdIcon = (icon?: ReactNode) => {
  if (typeof icon !== 'string') return null;
  const Icon = (Icons as Record<string, unknown>)[
    /^<.* \/>$/.test(icon) ? icon.replace('<', '').replace(' />', '') : icon
  ];
  if (Icon) return createElement(Icon as React.ComponentType);
  return null;
};
