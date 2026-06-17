declare namespace API {
  type DictControllerDeleteItemParams = {
    /** ID */
    id: number;
  };

  type DictControllerDeleteTypeParams = {
    /** ID */
    id: number;
  };

  type DictControllerGetDictDataParams = {
    code: string;
  };

  type DictControllerListItemParams = {
    /** ID */
    id: number;
  };

  type DictItem = {
    /** ID */
    id: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 字典类型ID */
    typeId: number;
    /** 字典标签（显示名） */
    label: string;
    /** 字典值 */
    value: string;
    /** 排序 */
    sort: number;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
  };

  type DictItemCreateDto = {
    /** 字典类型ID */
    typeId: number;
    /** 字典标签（显示名） */
    label: string;
    /** 字典值 */
    value: string;
    /** 排序 */
    sort?: number;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
  };

  type DictItemUpdateDto = {
    /** 字典类型ID */
    typeId: number;
    /** 字典标签（显示名） */
    label: string;
    /** 字典值 */
    value: string;
    /** 排序 */
    sort?: number;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
    /** ID */
    id: number;
  };

  type DictType = {
    /** ID */
    id: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 字典名称 */
    name: string;
    /** 字典编码（唯一标识） */
    code: string;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
  };

  type DictTypeCreateDto = {
    /** 字典名称 */
    name: string;
    /** 字典编码（唯一标识） */
    code: string;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
  };

  type DictTypeListDto = {
    /** 页码 */
    current?: number;
    /** 分页大小 */
    pageSize?: number;
  };

  type DictTypeUpdateDto = {
    /** 字典名称 */
    name: string;
    /** 字典编码（唯一标识） */
    code: string;
    /** 状态 */
    status: boolean;
    /** 备注 */
    remark?: string;
    /** ID */
    id: number;
  };

  type ErrorShowType = 0 | 1 | 2 | 3 | 9;

  type FileBaseDto = {
    /** 文件ID */
    fileId: number;
    /** 文件路径 */
    filePath: string;
    /** 原始文件名 */
    fileOriginalName: string;
  };

  type Log = {
    /** id */
    id: number;
    /** 用户ID */
    userId: number;
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
    status: boolean;
    /** 响应时间（ms） */
    duration: number;
    /** 异常信息 */
    errorMessage: string;
    /** IP地址 */
    ip: string;
    /** 设备 */
    device: string;
    /** 浏览器 */
    browser: string;
    /** 操作系统 */
    os: string;
    /** 用户代理 */
    userAgent: string;
    /** 创建时间 */
    createdAt: string;
  };

  type LogDto = {
    /** 页码 */
    current?: number;
    /** 分页大小 */
    pageSize?: number;
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 年份 */
    year?: number;
    /** 开始日期 */
    startDate?: string;
    /** 结束日期 */
    endDate?: string;
    /** 模块 */
    module?: string;
    /** 操作 */
    action?: string;
    /** 操作结果 */
    status?: boolean;
    /** IP */
    ip?: string;
  };

  type Menu = {
    /** ID */
    id: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
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
    /** 权限标识 */
    permission: string;
    /** （菜单）是否在导航中隐藏 */
    isHidden: boolean;
    /** 排序 */
    sort: number;
    /** 状态 */
    status: boolean;
  };

  type MenuControllerDeleteParams = {
    /** ID */
    id: number;
  };

  type MenuCreateDto = {
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
    /** 权限标识 */
    permission?: string;
    /** （菜单）是否在导航中隐藏 */
    isHidden?: boolean;
    /** 排序 */
    sort: number;
    /** 状态 */
    status: boolean;
  };

  type MenuSimpleVo = {
    /** ID */
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

  type MenuType = 0 | 1;

  type MenuUpdateDto = {
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
    /** 权限标识 */
    permission?: string;
    /** （菜单）是否在导航中隐藏 */
    isHidden?: boolean;
    /** 排序 */
    sort: number;
    /** 状态 */
    status: boolean;
    /** id */
    id: number;
  };

  type Number = {};

  type ResponseDto = {
    /** 响应状态 */
    success: boolean;
    /** 响应数据 */
    data?: Record<string, any>;
    /** 错误码 */
    errorCode?: number;
    /** 错误消息 */
    errorMessage?: string | string[];
    /** 错误消息展示方式 */
    showType?: ErrorShowType;
  };

  type Role = {
    /** ID */
    id: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status: boolean;
    /** 是否内置角色 */
    builtIn: boolean;
  };

  type RoleControllerDeleteParams = {
    /** ID */
    id: number;
  };

  type RoleControllerMenusParams = {
    /** ID */
    id: number;
  };

  type RoleCreateDto = {
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status: boolean;
    /** 权限ID列表 */
    permissions?: number[];
  };

  type RoleListDto = {
    /** 页码 */
    current?: number;
    /** 分页大小 */
    pageSize?: number;
  };

  type RoleMenusDto = {
    /** 角色ID */
    roleId: number;
    /** 菜单ID列表 */
    menuIds: number[];
  };

  type RoleSelectVo = {
    /** 角色ID */
    id: number;
    /** 角色名称 */
    name: string;
  };

  type RoleUpdateDto = {
    /** 角色名称 */
    name: string;
    /** 备注 */
    remark?: string;
    /** 状态 */
    status: boolean;
    /** 权限ID列表 */
    permissions?: number[];
    /** 角色ID */
    id: number;
  };

  type String = {};

  type User = {
    /** ID */
    id: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 密码 */
    password: string;
    /** 邮箱 */
    email: string;
    /** 头像 */
    avatar: number;
    /** 用户类型，0-超级管理员，1-普通用户 */
    type: 0 | 1;
    /** 状态 */
    status: boolean;
    /** 描述 */
    description: string;
    /** 上次登录时间 */
    lastLoginAt: Record<string, any>;
    /** 角色 */
    roles: number[];
    /** 头像详情 */
    avatarInfo: FileBaseDto;
    /** 权限 */
    permissions: string[];
  };

  type UserChangePwdDto = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
    /** 确认新密码 */
    confirmPassword: string;
  };

  type UserControllerFindOneParams = {
    /** ID */
    id: number;
  };

  type UserControllerGetCaptchaParams = {
    /** 邮箱 */
    email: string;
  };

  type UserControllerSendResetPwdCaptchaParams = {
    /** 邮箱 */
    email: string;
  };

  type UserListDto = {
    /** 页码 */
    current?: number;
    /** 分页大小 */
    pageSize?: number;
    /** 用户名 */
    username?: string;
    /** 用户状态 */
    status?: boolean;
  };

  type UserLoginDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type UserRegisterDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 昵称 */
    nickname: string;
    /** 确认密码 */
    confirmPassword: string;
    /** 邮箱 */
    email: string;
    /** 验证码 */
    captcha: string;
  };

  type UserResetPwdDto = {
    /** 邮箱 */
    email: string;
    /** 验证码 */
    captcha: string;
    /** 新密码 */
    password: string;
    /** 确认新密码 */
    confirmPassword: string;
  };

  type UserSetRolesDto = {
    /** id */
    id: number;
    /** 角色列表 */
    roles: number[];
  };

  type UserUpdateSelfDto = {
    /** ID */
    id: number;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 头像 */
    avatar?: number;
    /** 描述 */
    description?: string;
  };
}
