declare namespace API {
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

  type SysControllerRegisterCodeParams = {
    email: string;
  };
}
