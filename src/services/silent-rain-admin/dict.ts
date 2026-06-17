// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 按编码获取字典数据 根据字典编码返回字典项列表，禁用的字典也会返回，需要前端做处理，示例：/api/dict/data?code=gender GET /api/dict/data */
export async function dictControllerGetDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerGetDictDataParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: API.DictItem[] }>(
    "/api/dict/data",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 创建字典项 POST /api/dict/itemCreate */
export async function dictControllerCreateItem(
  body: API.DictItemCreateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/itemCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典项 DELETE /api/dict/itemDelete */
export async function dictControllerDeleteItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerDeleteItemParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/itemDelete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 字典项列表 GET /api/dict/itemList */
export async function dictControllerListItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerListItemParams,
  options?: { [key: string]: any }
) {
  return request<
    API.ResponseDto & { data?: { list?: API.DictItem[]; total?: number } }
  >("/api/dict/itemList", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑字典项 PATCH /api/dict/itemUpdate */
export async function dictControllerUpdateItem(
  body: API.DictItemUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/itemUpdate", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 字典变更 SSE 流 建立 SSE 长连接，当字典数据变更时自动推送最新数据 GET /api/dict/stream */
export async function dictControllerStream(options?: { [key: string]: any }) {
  return request<any>("/api/dict/stream", {
    method: "GET",
    ...(options || {}),
  });
}

/** 所有启用的字典类型 GET /api/dict/typeAll */
export async function dictControllerAllTypes(options?: { [key: string]: any }) {
  return request<
    API.ResponseDto & { data?: { list?: API.DictType[]; total?: number } }
  >("/api/dict/typeAll", {
    method: "GET",
    ...(options || {}),
  });
}

/** 创建字典类型 POST /api/dict/typeCreate */
export async function dictControllerCreateType(
  body: API.DictTypeCreateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/typeCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典类型 DELETE /api/dict/typeDelete */
export async function dictControllerDeleteType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DictControllerDeleteTypeParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/typeDelete", {
    method: "DELETE",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 字典类型列表 POST /api/dict/typeList */
export async function dictControllerListType(
  body: API.DictTypeListDto,
  options?: { [key: string]: any }
) {
  return request<
    API.ResponseDto & { data?: { list?: API.DictType[]; total?: number } }
  >("/api/dict/typeList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑字典类型 PATCH /api/dict/typeUpdate */
export async function dictControllerUpdateType(
  body: API.DictTypeUpdateDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/dict/typeUpdate", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
