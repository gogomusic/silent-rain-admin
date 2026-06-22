import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { App, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import ResetPwd from '@/components/ResetPwd';
import { userControllerLogin } from '@/services/silent-rain-admin/user';
import { getToken, removeToken, setToken } from '@/utils';
import Settings from '../../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
    },
    bg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  };
});

const Login: React.FC = () => {
  const type = 'account';
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    } else {
      removeToken();
    }
    return { success: !!userInfo };
  };

  const jump = async () => {
    const { success } = await fetchUserInfo();
    if (success) {
      const urlParams = new URL(window.location.href).searchParams;
      window.location.replace(urlParams.get('redirect') || '/');
    } else {
      removeToken();
    }
  };

  const handleSubmit = async (values: API.UserLoginDto) => {
    const { success, data } = await userControllerLogin(values);
    if (success) {
      setToken(data?.token as string);
      message.success('登录成功！');
      const urlParams = new URL(window.location.href).searchParams;
      window.location.replace(urlParams.get('redirect') || '/');
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) jump();
  }, []);

  useEffect(() => {
    const colorBg = new Color4Bg.BlurGradientBg({
      dom: 'login-bg',
      colors: ['#4098DB', '#ECF3FC', '#C1EBFB', '#A9E0F8'],
      loop: true,
      vUv: 0,
    });
    colorBg.update('noise', 0);
  }, []);

  return (
    <div className={styles.container}>
      <div id="login-bg" className={styles.bg}></div>
      <Helmet>
        <title>登录 ☺ {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm<API.UserLoginDto>
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="「静夜聆雨」网站管理后台"
          subTitle={<i>Per Aspera Ad Astra.</i>}
          onFinish={handleSubmit}
        >
          <Tabs
            activeKey={type}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />

          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="请输入用户名/邮箱"
            rules={[
              {
                required: true,
                message: '请输入用户名或邮箱!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />

          <div>
            <div
              style={{
                float: 'right',
              }}
            >
              <a onClick={() => history.push('/user/register')}>注册账户</a>
              &nbsp;&nbsp;
              <a
                onClick={() => {
                  setUpdateModalOpen(true);
                }}
              >
                忘记密码
              </a>
            </div>
          </div>
          <br />
          <br />
        </LoginForm>
      </div>

      <Footer />
      <ResetPwd
        open={updateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
        }}
      />
    </div>
  );
};

export default Login;
