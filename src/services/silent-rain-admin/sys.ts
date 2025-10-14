// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 公钥接口 GET /sys/getPublicKey */
export async function sysControllerGetPublicKey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.SysControllerGetPublicKeyParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RsaDto }>('/sys/getPublicKey', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 注册 POST /sys/register */
export async function sysControllerRegister(
  body: API.CreateUserDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto>('/sys/register', {
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
