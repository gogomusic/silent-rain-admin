// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 创建菜单 POST /api/menu/create */
export async function menuControllerCreate(
  body: API.MenuCreateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/menu/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /api/menu/delete */
export async function menuControllerDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerDeleteParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/menu/delete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 菜单列表 GET /api/menu/list */
export async function menuControllerList(options?: { [key: string]: any }) {
  return request<
    API.ResponseDto & { data?: { list?: API.Menu[]; total?: number } }
  >("/api/menu/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 简要菜单列表 GET /api/menu/simpleList */
export async function menuControllerSimpleList(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseDto & { data?: { list?: API.MenuSimpleVo[]; total?: number } }
  >("/api/menu/simpleList", {
    method: "GET",
    ...(options || {}),
  });
}

/** 编辑菜单 PATCH /api/menu/update */
export async function menuControllerUpdate(
  body: API.MenuUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/menu/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
