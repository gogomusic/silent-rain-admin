// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录日志列表 POST /log/loginLogList */
export async function logControllerLoginLogList(
  body: API.LoginLogListDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.LoginLogResDto[]; current?: number; pageSize?: number; total?: number };
    }
  >('/log/loginLogList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 操作日志列表 POST /log/operationLogList */
export async function logControllerOperationLogList(
  body: API.OperationLogListDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: {
        list?: API.OperationLogResDto[];
        current?: number;
        pageSize?: number;
        total?: number;
      };
    }
  >('/log/operationLogList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
