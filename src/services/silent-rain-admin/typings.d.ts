declare namespace API {
  type ChangeStatusDto = {
    /** id */
    id: number;
    /** 用户状态 0停用 1启用 */
    status: UserStatusEnum;
  };

  type CreateUserDto = {
    /** RSA公钥唯一标识 */
    key_id: string;
    /** RSA公钥 */
    public_key: string;
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

  type CurrentUserInfoDto = {
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

  type LoginUserDto = {
    /** RSA公钥唯一标识 */
    key_id: string;
    /** RSA公钥 */
    public_key: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type ResponseDto = {
    /** 响应状态码 */
    code: number;
    /** 响应数据 */
    data?: Record<string, any>;
    /** 响应消息 */
    msg: string;
    /** 请求是否成功 */
    success: boolean;
  };

  type RoleControllerFindOneParams = {
    id: string;
  };

  type RoleControllerRemoveParams = {
    id: string;
  };

  type RsaDto = {
    /** RSA公钥唯一标识 */
    key_id: string;
    /** RSA公钥 */
    public_key: string;
  };

  type String = {};

  type SysControllerGetPublicKeyParams = {
    key_id: string;
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

  type UserInfoDto = {
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
  };

  type UserStatusEnum = 0 | 1;
}
