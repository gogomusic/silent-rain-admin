declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare const NODE_ENV: 'development' | 'production';
declare const API_URL: string;
/** 管理员的邮箱 */
declare const ADMIN_EMAIL: string;

declare const Color4Bg = {
  BlurGradientBg: any,
};

declare interface Window {
  /** 忽略的错误信息 */
  IGNORED_ERRORS: string[];
}

declare namespace API {
  type ResponseDto = {
    /** 响应状态码 */
    code: number;
    /** 响应数据 */
    data?: Record<string, any> | string;
    /** 响应消息 */
    msg: string | string[];
    /** 请求是否成功 */
    success: boolean;
  };
}
