// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 发送注册验证码 将注册验证码将发送至用户邮箱 GET /api/user/captcha */
export async function userControllerGetCaptcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerGetCaptchaParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/user/captcha", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改密码 POST /api/user/changePwd */
export async function userControllerChangePassword(
  body: API.UserChangePwdDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/user/changePwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /api/user/current */
export async function userControllerFindCurrent(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseDto & { data?: API.User }>("/api/user/current", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询用户详情 GET /api/user/info */
export async function userControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindOneParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: API.User }>("/api/user/info", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户列表 POST /api/user/list */
export async function userControllerList(
  body: API.UserListDto,
  options?: { [key: string]: any }
) {
  return request<
    API.ResponseDto & { data?: { list?: API.User[]; total?: number } }
  >("/api/user/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 登录 POST /api/user/login */
export async function userControllerLogin(
  body: API.UserLoginDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: API.UserLoginVo }>(
    "/api/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 退出登录 GET /api/user/logout */
export async function userControllerLogout(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: any }>("/api/user/logout", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取当前用户的菜单 POST /api/user/menus */
export async function userControllerMenus(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.Menu[] }>("/api/user/menus", {
    method: "POST",
    ...(options || {}),
  });
}

/** 用户注册 POST /api/user/register */
export async function userControllerRegister(
  body: API.UserRegisterDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: API.User }>("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 POST /api/user/resetPwd */
export async function userControllerResetPassword(
  body: API.UserResetPwdDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/user/resetPwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送重置密码验证码 GET /api/user/resetPwdCaptcha */
export async function userControllerSendResetPwdCaptcha(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerSendResetPwdCaptchaParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>(
    "/api/user/resetPwdCaptcha",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 设置角色 POST /api/user/setRoles */
export async function userControllerSetRoles(
  body: API.UserSetRolesDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/user/setRoles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改个人资料 POST /api/user/updateSelf */
export async function userControllerUpdateSelf(
  body: API.UserUpdateSelfDto,
  options?: { [key: string]: any }
) {
  return request<API.ResponseDto & { data?: any }>("/api/user/updateSelf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
