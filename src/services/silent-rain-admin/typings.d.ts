declare namespace API {
  type ChangeStatusDto = {
    /** id */
    id: number;
    /** 用户状态 0停用 1启用 */
    status: UserStatusEnum;
  };

  type ChangeUserPwdDto = {
    /** 密码 */
    password: string;
    /** 新密码 */
    new_password: string;
    /** 确认新密码 */
    confirm: string;
    /** 验证码 */
    captcha: string;
  };

  type CreateUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 确认密码 */
    confirm: string;
    /** 邮箱 */
    email: string;
    /** 验证码 */
    captcha: string;
  };

  type CurrentUserInfoResDto = {
    /** id */
    id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 用户类型 0超级管理员 1普通用户 */
    user_type: 0 | 1;
    /** 用户状态 0停用 1启用 */
    status: 0 | 1;
    /** 角色 */
    roles: string[];
    /** 头像 */
    avatar: number;
    /** 头像详情 */
    avatar_info: FileBaseDto;
    /** 描述 */
    description: string;
    /** 创建时间 */
    create_time: string;
    /** 更新时间 */
    update_time: string;
    /** 权限 */
    permissions: string[];
  };

  type FileBaseDto = {
    /** 文件ID */
    file_id: number;
    /** 文件路径 */
    file_path: string;
    /** 原始文件名 */
    file_original_name: string;
  };

  type LoginLogListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 年份 */
    year: number;
    /** 开始日期 */
    start_date: string;
    /** 结束日期 */
    end_date: string;
  };

  type LoginLogResDto = {
    /** id */
    id: number;
    /** 用户ID */
    user_id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 登录类型 0退出系统 1登录系统 */
    type: 0 | 1;
    /** IP地址 */
    ip: string;
    /** 设备 */
    device: string;
    /** 浏览器 */
    browser: string;
    /** 操作系统 */
    os: string;
    /** 用户代理 */
    user_agent: string;
    /** 创建时间 */
    create_time: string;
  };

  type LoginUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type OperationLogListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 年份 */
    year: number;
    /** 开始日期 */
    start_date: string;
    /** 结束日期 */
    end_date: string;
    /** 模块 */
    module: string;
    /** 操作 */
    action: string;
    /** 操作结果 */
    status: 0 | 1;
    /** IP */
    ip: string;
  };

  type OperationLogResDto = {
    /** id */
    id: number;
    /** 用户ID */
    user_id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 模块 */
    module: string;
    /** 操作 */
    action: string;
    /** 请求方式 */
    method: string;
    /** 请求接口 */
    url: string;
    /** 请求参数 */
    params: string;
    /** 操作结果 */
    status: 0 | 1;
    /** 响应时间（ms） */
    duration: number;
    /** 异常信息 */
    fail_result: string;
    /** IP地址 */
    ip: string;
    /** 设备 */
    device: string;
    /** 浏览器 */
    browser: string;
    /** 操作系统 */
    os: string;
    /** 用户代理 */
    user_agent: string;
    /** 创建时间 */
    create_time: string;
  };

  type ResponseDto = {
    /** 响应状态码 */
    code: number;
    /** 响应数据 */
    data?: Record<string, any>;
    /** 响应消息 */
    msg: Record<string, any>;
    /** 请求是否成功 */
    success: boolean;
  };

  type RoleControllerFindOneParams = {
    id: string;
  };

  type RoleControllerRemoveParams = {
    id: string;
  };

  type String = {};

  type SysControllerChangePwdCodeParams = {
    email: string;
  };

  type SysControllerRegisterCodeParams = {
    email: string;
  };

  type UpdateSelfDto = {
    /** id */
    id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 头像 */
    avatar?: number;
    /** 描述 */
    description?: string;
  };

  type UserControllerFindOneParams = {
    id: string;
  };

  type UserInfoResDto = {
    /** id */
    id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 用户类型 0超级管理员 1普通用户 */
    user_type: 0 | 1;
    /** 用户状态 0停用 1启用 */
    status: 0 | 1;
    /** 角色 */
    roles: string[];
    /** 头像 */
    avatar: number;
    /** 头像详情 */
    avatar_info: FileBaseDto;
    /** 描述 */
    description: string;
    /** 创建时间 */
    create_time: string;
    /** 更新时间 */
    update_time: string;
  };

  type UserListReqDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username: string;
    /** 用户状态 0停用 1启用 */
    status: 0 | 1;
  };

  type UserResetPwdDto = {
    /** 新密码 */
    new_password: string;
    /** 确认新密码 */
    confirm: string;
    /** 验证码 */
    captcha: string;
    /** 用户名 */
    username: string;
    /** 邮箱 */
    email: string;
  };

  type UserStatusEnum = 0 | 1;
}
