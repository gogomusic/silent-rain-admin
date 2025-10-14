// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /role */
export async function roleControllerFindAll(options?: { [key: string]: any }) {
  return request<any>('/role', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /role/${param0} */
export async function roleControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /role/${param0} */
export async function roleControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
