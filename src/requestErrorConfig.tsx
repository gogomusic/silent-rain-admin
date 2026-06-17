import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { getIntl } from '@umijs/max';
import { message, notification } from '@/components/EscapeAntd';
import { getToken, logoutAndRedirect, toMessageContent } from './utils';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: unknown;
  errorCode?: number;
  errorMessage?: string | string[];
  showType?: ErrorShowType;
}

function arrayErrorTransform(err?: string) {
  let msg: string | string[] = err ?? '未知错误';
  try {
    if (err) {
      const result = JSON.parse(err as unknown as string);
      if (Array.isArray(result)) msg = result;
    }
  } catch {}
  return msg;
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
      .forEach(([key, value]) => {
        newFormData.append(key, value);
      });
    entries
      .filter(([key]) => key === 'file')
      .forEach(([key, value]) => {
        newFormData.append(key, value);
      });
    data = newFormData;
  }
  return data;
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  timeout: 5000,
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(
          Array.isArray(errorMessage)
            ? JSON.stringify(errorMessage)
            : errorMessage,
        );
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
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
          const errorCode = errorInfo.errorCode;
          const errorMessage = arrayErrorTransform(
            errorInfo.errorMessage as unknown as string,
          );

          const content = toMessageContent(errorMessage);

          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(content);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(content);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                title: errorCode,
                description: content,
              });
              break;
            case ErrorShowType.REDIRECT:
              window.location.href = '/user/login';
              break;
            default:
              message.error(content);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const errorMessage = arrayErrorTransform(
          (error.response.data.errorMessage as unknown as string) ??
            error.message,
        );
        message.error(toMessageContent(errorMessage));
        switch (error.response.status) {
          case 401:
            logoutAndRedirect();
            break;
          default:
            break;
        }
      } else if (typeof navigator !== 'undefined' && !navigator.onLine) {
        message.error(
          getIntl().formatMessage({
            id: 'app.request.offline',
            defaultMessage:
              'Network unavailable. Please check your connection and try again.',
          }),
        );
      } else if (error.request) {
        message.error('None response! Please retry.');
      } else {
        message.error('Request error, please retry.');
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
        headers: {
          ...config.headers,
          Authorization,
        },
      } as RequestOptions;
    },
  ],

  // 响应拦截器
  responseInterceptors: [],
};
