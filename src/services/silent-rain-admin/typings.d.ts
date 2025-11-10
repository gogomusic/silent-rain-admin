declare namespace API {
  type AllRolesVo = {
    /** 角色ID */
    id: number;
    /** 角色名称 */
    name: string;
  };

  type ChangeStatusDto = {
    /** id */
    id: number;
    /** 用户状态 0:停用 1:启用 */
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

  type CreateMenuDto = {
    /** 上级菜单ID */
    pid: number;
    /** 菜单类型 0:菜单 1:按钮 */
    type: MenuType;
    /** 菜单名称 */
    name: string;
    /** 图标 */
    icon?: string;
    /** 组件路径 */
    component?: string;
    /** 路由地址 */
    path?: string;
    /** （菜单）是否在导航中隐藏 */
    is_hidden: YesOrNoEnum;
    /** 排序 */
    sort: number;
    /** 权限标识 */
    permission: string;
    /** 状态 */
    status: StatusEnum;
  };

  type CreateRoleDto = {
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态：1:启用，0:禁用 */
    status?: RoleStatusEnum;
    /** 权限ID列表 */
    permissions?: number[];
  };

  type CreateUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 昵称 */
    nickname: string;
    /** 确认密码 */
    confirm: string;
    /** 邮箱 */
    email: string;
    /** 验证码 */
    captcha: string;
  };

  type FileBaseDto = {
    /** 文件ID */
    file_id: number;
    /** 文件路径 */
    file_path: string;
    /** 原始文件名 */
    file_original_name: string;
  };

  type LoginLog = {
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
    created_at: string;
  };

  type LoginLogListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 年份 */
    year?: number;
    /** 开始日期 */
    start_date?: string;
    /** 结束日期 */
    end_date?: string;
  };

  type LoginUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type Menu = {
    /** id */
    id: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    /** 上级菜单ID */
    pid: number;
    /** 菜单类型 0:菜单 1:按钮 */
    type: MenuType;
    /** 菜单名称 */
    name: string;
    /** 图标 */
    icon: string;
    /** 组件路径 */
    component: string;
    /** 路由地址 */
    path: string;
    /** （菜单）是否在导航中隐藏 */
    is_hidden: YesOrNoEnum;
    /** 排序 */
    sort: number;
    /** 权限标识 */
    permission: string;
    /** 状态 */
    status: MenuStatusEnum;
  };

  type MenuControllerDeleteParams = {
    id: number;
  };

  type MenuSimpleVo = {
    /** id */
    id: number;
    /** 上级菜单ID */
    pid: number;
    /** 菜单类型 0:菜单 1:按钮 */
    type: MenuType;
    /** 菜单名称 */
    name: string;
    /** 图标 */
    icon: string;
  };

  type MenuStatusEnum = 0 | 1;

  type MenuType = 0 | 1;

  type Number = {};

  type OperationLog = {
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
    created_at: string;
  };

  type OperationLogListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 年份 */
    year?: number;
    /** 开始日期 */
    start_date?: string;
    /** 结束日期 */
    end_date?: string;
    /** 模块 */
    module?: string;
    /** 操作 */
    action?: string;
    /** 操作结果 */
    status?: 0 | 1;
    /** IP */
    ip?: string;
  };

  type ResponseDto = {
    /** 响应状态码 */
    code: number;
    /** 响应数据 */
    data?: Record<string, any>;
    /** 响应消息 */
    msg: string | string[];
    /** 请求是否成功 */
    success: boolean;
  };

  type Role = {
    /** id */
    id: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark: string;
    /** 状态：1:启用，0:禁用 */
    status: RoleStatusEnum;
  };

  type RoleControllerDeleteParams = {
    id: number;
  };

  type RoleControllerMenusParams = {
    id: number;
  };

  type RoleListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
  };

  type RoleStatusEnum = 0 | 1;

  type SetRolesDto = {
    /** id */
    id: number;
    /** 角色列表 */
    roles: number[];
  };

  type StatusEnum = 0 | 1;

  type String = {};

  type SysControllerChangePwdCodeParams = {
    email: string;
  };

  type SysControllerRegisterCodeParams = {
    email: string;
  };

  type UpdateMenuDto = {
    /** 上级菜单ID */
    pid?: number;
    /** 菜单类型 0:菜单 1:按钮 */
    type?: MenuType;
    /** 菜单名称 */
    name?: string;
    /** 图标 */
    icon?: string;
    /** 组件路径 */
    component?: string;
    /** 路由地址 */
    path?: string;
    /** （菜单）是否在导航中隐藏 */
    is_hidden?: YesOrNoEnum;
    /** 排序 */
    sort?: number;
    /** 权限标识 */
    permission?: string;
    /** 状态 */
    status?: StatusEnum;
    /** id */
    id: number;
  };

  type UpdateRoleDto = {
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态：1:启用，0:禁用 */
    status?: RoleStatusEnum;
    /** 权限ID列表 */
    permissions?: number[];
    /** 角色ID */
    id: number;
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

  type User = {
    /** id */
    id: number;
    /** 创建时间 */
    created_at: string;
    /** 更新时间 */
    updated_at: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 用户类型 0:超级管理员 1:普通用户 */
    user_type: 0 | 1;
    /** 邮箱 */
    email: string;
    /** 用户状态 0:停用 1:启用 */
    status: 0 | 1;
    /** 头像 */
    avatar: number;
    /** 描述 */
    description: string;
    /** 角色 */
    roles: number[];
    /** 头像详情 */
    avatar_info: FileBaseDto;
    /** 权限 */
    permissions: string[];
  };

  type UserControllerFindOneParams = {
    id: string;
  };

  type UserListDto = {
    /** 页码 */
    current: number;
    /** 分页大小 */
    pageSize: number;
    /** 用户名 */
    username?: string;
    /** 用户状态 0停用 1启用 */
    status?: 0 | 1;
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

  type YesOrNoEnum = 0 | 1;
}
