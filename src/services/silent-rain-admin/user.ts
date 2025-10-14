// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 当前登陆用户详情 GET /user/current */
export async function userControllerFindCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.CurrentUserInfoDto }>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户详情 GET /user/info */
export async function userControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindOneParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.UserInfoDto }>('/user/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户列表 POST /user/list */
export async function userControllerList(
  body: API.UserListReqDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.UserInfoDto[]; current?: number; pageSize?: number; total?: number };
    }
  >('/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /user/login */
export async function userControllerLogin(
  body: API.LoginUserDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: string }>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 GET /user/logout */
export async function userControllerLogout(options?: { [key: string]: any }) {
  return request<API.ResponseDto>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
