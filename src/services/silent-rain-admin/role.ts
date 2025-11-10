// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 角色下拉列表 不分页，返回所有角色 GET /role/all */
export async function roleControllerAll(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: { list?: API.AllRolesVo[]; total?: number } }>(
    '/role/all',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 创建角色 POST /role/create */
export async function roleControllerCreate(
  body: API.CreateRoleDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /role/delete */
export async function roleControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerDeleteParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/role/delete', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 角色列表 POST /role/list */
export async function roleControllerList(body: API.RoleListDto, options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: { list?: API.Role[]; total?: number } }>('/role/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色关联的菜单ID列表 GET /role/menus */
export async function roleControllerMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerMenusParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: number[] }>('/role/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑角色 PATCH /role/update */
export async function roleControllerUpdate(
  body: API.UpdateRoleDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: any }>('/role/update', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
