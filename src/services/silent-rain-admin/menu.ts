// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建菜单 POST /menu/create */
export async function menuControllerCreate(
  body: API.CreateMenuDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/menu/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /menu/delete */
export async function menuControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerDeleteParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/menu/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 菜单列表 POST /menu/list */
export async function menuControllerList(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: { list?: API.Menu[]; total?: number } }>('/menu/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 简要菜单列表（分配角色权限时使用） POST /menu/simpleList */
export async function menuControllerSimpleList(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: { list?: API.MenuSimpleVo[]; total?: number } }>(
    '/menu/simpleList',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 编辑菜单 PATCH /menu/update */
export async function menuControllerUpdate(
  body: API.UpdateMenuDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/menu/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
