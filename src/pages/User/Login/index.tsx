import { Footer } from '@/components';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, Helmet } from '@umijs/max';
import { Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React from 'react';
import { createStyles } from 'antd-style';

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
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
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

  // const handleSubmit = async (values: API.LoginParams) => {
  //   try {
  //     // 登录
  //     const msg = await login({ ...values });
  //     if (msg.status === 'ok') {
  //       const defaultLoginSuccessMessage = '登录成功！';
  //       message.success(defaultLoginSuccessMessage);
  //       await fetchUserInfo();
  //       const urlParams = new URL(window.location.href).searchParams;
  //       history.push(urlParams.get('redirect') || '/');
  //       return;
  //     }
  //     console.info(msg);
  //     // 如果失败去设置用户错误信息
  //     setUserLoginState(msg);
  //   } catch (error) {
  //     const defaultLoginFailureMessage = '登录失败，请重试！'
  //     console.error(error);
  //     message.error(defaultLoginFailureMessage);
  //   }
  // };
  // const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>登录 ☺ {Settings.title}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="「静夜聆雨」管理后台"
          subTitle={<i>Per Aspera Ad Astra.</i>}
          onFinish={async (_values) => {
            // await handleSubmit(values as API.LoginParams);
          }}
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
