import { LinkOutlined as LinkIcon, SmileTwoTone } from '@ant-design/icons';
import type {
  Settings as LayoutSettings,
  MenuDataItem,
} from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { App, ConfigProvider, Space } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  AvatarDropdown,
  ErrorBoundary,
  Footer,
  OfflineBanner,
} from '@/components';
import defaultSettings from '../config/defaultSettings';
import EscapeAntd from './components/EscapeAntd';
import { initializeEnumExtensions } from './enums/extension';
import { errorConfig } from './requestErrorConfig';
import {
  userControllerFindCurrent,
  userControllerMenus,
} from './services/silent-rain-admin/user';
import { array2tree, renderAntdIcon, type TreeNode } from './utils';

export type MenuItem = Omit<API.Menu & TreeNode & MenuDataItem, 'children'> & {
  children?: MenuItem[];
};

initializeEnumExtensions();

dayjs.extend(relativeTime);

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.User | null;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.User | null>;
  settingDrawerOpen?: boolean;
  menus?: MenuItem[];
}> {
  const fetchUserInfo = async () => {
    const { success, data } = await userControllerFindCurrent();
    if (success) {
      return data as API.User;
    } else {
      const { pathname, search, hash } = history.location;
      history.replace(
        `${loginPath}?redirect=${encodeURIComponent(pathname + search + hash)}`,
      );
      return null;
    }
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (![loginPath, '/user/register'].includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    let menus: MenuItem[] = [];
    const { success, data } = await userControllerMenus();
    if (success) {
      menus = array2tree(
        data?.map((item) => ({ ...item, hideInMenu: item.isHidden })) || [],
      );
    }
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
      settingDrawerOpen: false,
      menus,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
    settingDrawerOpen: false,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const avatarFilePath = initialState?.currentUser?.avatarInfo?.filePath;
  const src = avatarFilePath ? `${API_URL}${avatarFilePath}` : <SmileTwoTone />;
  return {
    menuDataRender: () => initialState?.menus || [],
    subMenuItemRender: (item) => (
      <Link to={item.path}>
        <Space>
          {renderAntdIcon(item.icon)}
          {item.name}
        </Space>
      </Link>
    ),
    menuItemRender: (item) => (
      <Link to={item.path} prefetch>
        <Space>
          {renderAntdIcon(item.icon)}
          {item.name}
        </Space>
      </Link>
    ),
    actionsRender: () => [
      // <LangDropdown key="lang" />
    ],
    avatarProps: {
      src,
      title: initialState?.currentUser?.nickname ?? 'ProUser',
      render: (_, avatarChildren) => (
        <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      ),
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.replace(
          `${loginPath}?redirect=${encodeURIComponent(location.pathname + location.search + location.hash)}`,
        );
      }
    },
    bgLayoutImgList: [
      {
        src: '/images/alipay/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr.webp',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: '/images/alipay/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr.webp',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: '/images/alipay/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr.webp',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkIcon />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    // Replace ProLayout's default ErrorBoundary with our offline-aware version,
    // so chunk load errors show friendly messages instead of "Something went wrong."
    ErrorBoundary,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            collapse={initialState?.settingDrawerOpen}
            onCollapseChange={(open) => {
              setInitialState((s) => ({
                ...s,
                settingDrawerOpen: open,
              }));
            }}
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((s) => ({
                ...s,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: '/',
  ...errorConfig,
};

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider>
      <App>
        <OfflineBanner />
        <ErrorBoundary>{container}</ErrorBoundary>
        <EscapeAntd />
      </App>
    </ConfigProvider>
  );
}
