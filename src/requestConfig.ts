import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { getToken, removeToken } from './utils';
import { history } from '@umijs/max';
import { message } from '@/components/EscapeAntd';

/** 与后端约定的响应数据格式 */
interface ResponseStructure<T = any> {
  data?: T;
  code: number;
  msg: string | string[];
  success: boolean;
}

/** 提交`FormData`数据时，进行排序，将`file`字段排序到最后
 *
 * 这么做是因为后端采用了`Multer`中间件处理文件上传，其在读取`req.body`时，如果`file`是第一个字段，则无法读取到后续字段
 */
const formdataSort = (formData: FormData) => {
  let data = formData;
  if (formData instanceof FormData) {
    const newFormData = new FormData();
    const entries = Array.from(formData.entries());
    entries
      .filter(([key]) => key !== 'file')
      .forEach(([key, value]) => newFormData.append(key, value));
    entries
      .filter(([key]) => key === 'file')
      .forEach(([key, value]) => newFormData.append(key, value));
    data = newFormData;
  }
  return data;
};

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
        let message = '';
        if (Array.isArray(msg)) {
          message = msg.join('\n');
        } else {
          message = msg as string;
        }
        const error: any = new Error(message);
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
        if (error.response.status === 401) {
          history.push('/user/login');
          removeToken();
          message.error('登录已过期，请重新登录');
        }
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        else message.error(error.response.data.msg || '服务器错误，请稍后再试');
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('服务器无响应，请检查网络或稍后重试');
      } else {
        // 发送请求时出了点问题
        message.error(error.message || '请求失败，请重试');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      const url = config?.url;
      const token = getToken();
      const Authorization = token ? `Bearer ${token}` : undefined;

      return {
        ...config,
        url,
        data: formdataSort(config.data),
        baseURL: '/api',
        headers: {
          ...config.headers,
          Authorization,
        },
      } as RequestOptions;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      const data = { ...response.data } as ResponseStructure & { message?: string };
      const { code, msg, success } = data;
      const newData = {
        code,
        data: data.data,
        msg,
        success,
      } as ResponseStructure;

      return {
        ...response,
        data: newData,
      } as typeof response;
    },
  ],
};
