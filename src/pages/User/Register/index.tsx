import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createStyles } from 'antd-style';
import api from '@/services/silent-rain-admin';
import { Helmet, history } from '@umijs/max';
import Settings from '../../../../config/defaultSettings';
import { sysControllerRegister } from '@/services/silent-rain-admin/sys';

const codeTimeout = 60 - 1; // 验证码有效时间，单位秒

const useStyles = createStyles(() => {
  return {
    main: {
      maxWidth: 500,
      margin: '0 auto 0 auto',
      padding: 24,
      paddingTop: 20,
    },
    bg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
    h2: {
      marginBottom: 24,
      textAlign: 'center',
    },
    code: {
      width: 'calc(100% - 108px)',
      marginRight: 16,
      marginBottom: 10,
    },
    'code-text': {
      width: 70,
      textAlign: 'center',
    },
    form: {
      padding: '30px 60px 20px',
      marginTop: 100,
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);',
      boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
      borderRadius: 8,
      position: 'relative',
    },
    login: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 80,
      fontSize: 14,
      color: '#1890ff',
      cursor: 'pointer',
      textAlign: 'right',
      padding: '8px 16px',
      background: 'url(/svg/register-corner-bg.svg) no-repeat center center',
    },
  };
});

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { styles } = useStyles();
  const email = Form.useWatch('email', form);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [emailSecond, setEmailSecond] = React.useState(codeTimeout);
  const timerRef = React.useRef<number | null>(null);

  useEffect(() => {
    let colorBg = new Color4Bg.BlurGradientBg({
      dom: 'login-bg',
      colors: ['#4098DB', '#ECF3FC', '#C1EBFB', '#A9E0F8'],
      loop: true,
      vUv: 0,
    });
    colorBg.update('noise', 0);
  }, []);

  const startEmailLoading = () => {
    setEmailLoading(true);
    timerRef.current = window.setInterval(() => {
      setEmailSecond((prev) => {
        if (prev <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setEmailLoading(false);
          return codeTimeout;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const stopEmailLoading = () => {
    setEmailLoading(false);
    setEmailSecond(codeTimeout);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const onFinish = async (values: API.CreateUserDto) => {
    const { success } = await sysControllerRegister(values);
    if (success) {
      message.success('注册成功，即将返回登录页');
      setTimeout(() => {
        history.push('/user/login');
      }, 1000);
    }
  };

  return (
    <div className={styles.main}>
      <div id="login-bg" className={styles.bg}></div>
      <Helmet>
        <title>注册 {Settings.title}</title>
      </Helmet>
      <div className={styles.form}>
        <div className={styles.login} onClick={() => history.push('/user/login')}>
          登录
        </div>
        <h2 className={styles.h2}>用户注册</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 16, message: '用户名最多16个字符' },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>
          <Form.Item label="验证码">
            <Form.Item
              noStyle
              name="captcha"
              rules={[
                { required: true, message: '请输入验证码' },
                {
                  len: 6,
                  message: '验证码必须为6位',
                },
              ]}
            >
              <Input placeholder="请输入验证码" className={styles.code} />
            </Form.Item>
            <Button
              type="primary"
              style={{ padding: '0 8px' }}
              disabled={!email || emailLoading}
              onClick={async () => {
                if (!form.getFieldValue('email')) {
                  message.warning('请先输入邮箱');
                  return;
                }
                try {
                  startEmailLoading();
                  await api.sys.sysControllerRegisterCode({ email });
                  message.success('验证码已发送');
                } catch (_error) {
                  stopEmailLoading();
                } finally {
                }
              }}
            >
              <span className={styles['code-text']}>
                {emailLoading ? `${emailSecond}s` : '获取验证码'}
              </span>
            </Button>
          </Form.Item>
          <br />
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
