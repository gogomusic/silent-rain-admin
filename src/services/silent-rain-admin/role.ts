// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 角色下拉列表 不分页，返回所有角色 GET /api/role/all */
export async function roleControllerAll(options?: { [key: string]: any }) {
  return request<
    API.ResponseDto & { data?: { list?: API.RoleSelectVo[]; total?: number } }
  >("/api/role/all", {
    method: "GET",
    ...(options || {}),
  });
}

/** 创建角色 POST /api/role/create */
export async function roleControllerCreate(
  body: API.RoleCreateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/role/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /api/role/delete */
export async function roleControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerDeleteParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/role/delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 角色列表 POST /api/role/list */
export async function roleControllerList(
  body: API.RoleListDto,
  options?: { [key: string]: any }
) {
  return request<
    API.ResponseDto & { data?: { list?: API.Role[]; total?: number } }
  >("/api/role/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色关联的菜单ID列表 GET /api/role/menus */
export async function roleControllerMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerMenusParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: number[] }>("/api/role/menus", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分配角色权限 全量覆盖：传入的菜单ID列表将替换该角色原有的所有菜单权限 PUT /api/role/menus */
export async function roleControllerAssignMenus(
  body: API.RoleMenusDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/role/menus", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑角色 PATCH /api/role/update */
export async function roleControllerUpdate(
  body: API.RoleUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/role/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
