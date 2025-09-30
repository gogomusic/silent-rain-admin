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

  type HttpStatus =
    | 100
    | 101
    | 102
    | 103
    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 210
    | 300
    | 301
    | 302
    | 303
    | 304
    | 307
    | 308
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 418
    | 421
    | 422
    | 423
    | 424
    | 428
    | 429
    | 456
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 507
    | 508;

  type LoginUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type ResponseDto = {
    /** 响应状态码 */
    code: HttpStatus;
    /** 响应数据 */
    data?: Record<string, any>;
    /** 响应消息 */
    message: string;
    /** 响应时间戳 */
    timestamp: number;
    /** 请求是否成功 */
    success: boolean;
  };

  type String = {};

  type SysControllerRegisterCodeParams = {
    email: string;
  };
}
