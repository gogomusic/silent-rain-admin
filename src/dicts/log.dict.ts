import { commonDict } from './common.dict';

export const logDict:Record<keyof API.Log,string> = {
  ...commonDict,
  module: '模块',
  action: '操作',
  method: '请求方式',
  url: '请求接口',
  params: '请求参数',
  status: '操作结果',
  duration: '响应时间',
  device: '设备',
  browser: '浏览器',
  os: '操作系统',
  userAgent: '用户代理',
};
