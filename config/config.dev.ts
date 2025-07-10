import { defineConfig } from '@umijs/max';

export const API_URL = 'http://10.0.46.250:9161'; // API地址

/**
 * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
 * 注意：在添加变量后，需要在src/types/global.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
 */
export default defineConfig({
  define: {
    API_URL,
  },
});
