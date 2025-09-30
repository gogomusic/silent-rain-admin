import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import type { HttpStatus } from '@nestjs/common';

/** 与后端约定的响应数据格式 */
interface ResponseStructure<T = any> {
  data?: T;
  code: HttpStatus;
  msg: string;
  success: boolean;
  timestamp: number;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { data, code, msg, success } = res;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { code, msg, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { msg } = errorInfo;
          message.error(msg);
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(error.response.data.message || '服务器错误，请稍后重试');
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('服务器无响应，请检查网络或稍后重试');
      } else {
        // 发送请求时出了点问题
        message.error('请求失败，请重试');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url;
      return { ...config, url, baseURL: '/api' };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const data = { ...response.data } as ResponseStructure & { message?: string };
      const { code, message: msg, timestamp, success } = data;
      const newData = {
        code,
        msg,
        timestamp,
        data: data.data,
        success,
      } as ResponseStructure;
      return {
        ...response,
        data: newData,
      } as typeof response;
    },
  ],
};
