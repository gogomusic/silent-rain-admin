import { Footer, AvatarDropdown, AvatarName } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RuntimeConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { requestConfig } from './requestConfig';
import React from 'react';
import { userControllerFindCurrent } from './services/silent-rain-admin/user';
import { ignoreConsoleError } from './utils/console';
import { App, ConfigProvider } from 'antd';
import { removeToken } from './utils';
import { isDev, loginPath, registerPath } from './config';
import EscapeAntd from './components/EscapeAntd';
import { avatarBgColor } from './components/AvatarView';

ignoreConsoleError();

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUserInfoDto;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUserInfoDto | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const { success, data } = await userControllerFindCurrent();
      if (success) return data;
    } catch (error) {
      console.error(error);
      removeToken();
      history.push(loginPath);
    }
    return undefined;
  };
  const { location } = history;
  if (![registerPath, loginPath].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    actionsRender: () => [],
    avatarProps: {
      src: API_URL + initialState?.currentUser?.avatar_info.file_path,
      title: <AvatarName />,
      style: {
        backgroundColor: avatarBgColor,
      },
      children: initialState?.currentUser?.avatar
        ? undefined
        : initialState?.currentUser?.nickname.charAt(0),
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && ![registerPath, loginPath].includes(location.pathname)) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <a key="openapi" href={`${API_URL}/api`} target="_blank" rel="noreferrer">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </a>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    childrenRender: (children) => {
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig,
};

export const rootContainer: RuntimeConfig['rootContainer'] = (container) => {
  return (
    <ConfigProvider>
      <App>
        {container}
        <EscapeAntd />
      </App>
    </ConfigProvider>
  );
};
