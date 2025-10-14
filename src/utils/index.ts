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
