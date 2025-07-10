import { API_URL as DEV_API_URL } from './config.dev';
import { API_URL as PROD_API_URL } from './config.prod';

const envOptions: Record<string, string> = {
  dev: '使用开发环境接口：' + DEV_API_URL,
  prod: '使用生产环境接口：' + PROD_API_URL,
};

console.info(`\x1b[33m${envOptions[process.env.UMI_ENV || 'dev']}\x1b[0m`);

const API_URL = {
  dev: DEV_API_URL,
  prod: PROD_API_URL,
}[process.env.UMI_ENV || 'dev'];

/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/': {
      // 要代理的地址
      target: API_URL,
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      // 重写路径
      pathRewrite: { '^/api': '' },
    },
  },
};
