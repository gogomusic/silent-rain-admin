import NodeRSA from 'node-rsa';

export const TokenKey = 'authorized-token';

export const getToken = () => {
  return localStorage.getItem(TokenKey);
};

export const setToken = (token: string) => {
  return localStorage.setItem(TokenKey, token);
};

export const removeToken = () => {
  return localStorage.removeItem(TokenKey);
};

/**
 * 使用提供的RSA公钥加密字符串。
 */
export const rsaEncrypt = (data: string, publicKey: string) => {
  const key = new NodeRSA();
  key.setOptions({ encryptionScheme: 'pkcs1_oaep' });
  key.importKey(publicKey);
  return key.encrypt(data, 'base64');
};

/** 将列表请求转化为适合ProTable展示的数据 */
export const formatListRes =
  <T>(
    fn: (params: T) => Promise<
      API.ResponseDto & {
        data?: { list?: any[]; current?: number; pageSize?: number; total?: number };
      }
    >,
  ) =>
  async (params: T) => {
    {
      const { success, data } = await fn(params);
      if (success) {
        return {
          data: data?.list || [],
          current: data?.current || 1,
          pageSize: data?.pageSize || 10,
          total: data?.total || 0,
          success: true,
        };
      }
      return {
        data: [],
        current: 1,
        pageSize: 10,
        total: 0,
        success: false,
      };
    }
  };
