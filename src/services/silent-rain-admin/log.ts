// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 日志列表 POST /api/log/list */
export async function logControllerList(
  body: API.LogDto,
  options?: { [key: string]: any }
) {
  return request<
    API.ResponseDto & { data?: { list?: API.Log[]; total?: number } }
  >("/api/log/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
