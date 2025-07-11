// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 注册 新用户注册 POST /sys/register */
export async function sysControllerRegister(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<any>('/sys/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取注册验证码 通过邮箱获取注册验证码 GET /sys/registerCode */
export async function sysControllerRegisterCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysControllerRegisterCodeParams,
  options?: { [key: string]: any },
) {
  return request<any>('/sys/registerCode', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
