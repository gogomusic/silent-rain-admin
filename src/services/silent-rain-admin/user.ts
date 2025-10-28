// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改密码 POST /user/changePwd */
export async function userControllerChangePwd(
  body: API.ChangeUserPwdDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/user/changePwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户状态 POST /user/changeStatus */
export async function userControllerChangeStatus(
  body: API.ChangeStatusDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/user/changeStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 当前登陆用户详情 GET /user/current */
export async function userControllerFindCurrent(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.CurrentUserInfoResDto }>('/user/current', {
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
  return request<API.ResponseDto & { data?: API.UserInfoResDto }>('/user/info', {
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
      data?: { list?: API.UserInfoResDto[]; current?: number; pageSize?: number; total?: number };
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

/** 重置密码 用户忘记密码时，通过用户名、邮箱、验证码重新设置密码 POST /user/resetPwd */
export async function userControllerResetPwd(
  body: API.UserResetPwdDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/user/resetPwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改个人资料 POST /user/updateSelf */
export async function userControllerUpdateSelf(
  body: API.UpdateSelfDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/user/updateSelf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
