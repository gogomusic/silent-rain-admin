import { Footer } from '@/components';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, Helmet } from '@umijs/max';
import { message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useEffect } from 'react';
import { createStyles } from 'antd-style';
import { sysControllerLogin } from '@/services/silent-rain-admin/sys';

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
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const type = 'account';
  // const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  // const intl = useIntl();

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     flushSync(() => {
  //       setInitialState((s) => ({
  //         ...s,
  //         currentUser: userInfo,
  //       }));
  //     });
  //   }
  // };

  const handleSubmit = async (values: API.LoginUserDto) => {
    const { success, data: token } = await sysControllerLogin(values);
    if (success) {
      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      console.log(token);
      //  await fetchUserInfo();
      //  const urlParams = new URL(window.location.href).searchParams;
      //  history.push(urlParams.get('redirect') || '/');
      //  return;
    }
  };

  useEffect(() => {
    let colorBg = new Color4Bg.BlurGradientBg({
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
        <LoginForm<API.LoginUserDto>
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="「静夜聆雨」管理后台"
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

          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
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
          </>

          <div>
            <div
              style={{
                float: 'right',
              }}
            >
              <a onClick={() => history.push('/user/register')}>注册账户</a>
              &nbsp;&nbsp;
              <a>忘记密码</a>
            </div>
          </div>
          <br />
          <br />
        </LoginForm>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
