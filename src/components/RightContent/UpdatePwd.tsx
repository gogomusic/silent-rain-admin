import { useCountDown } from '@/hooks/useCountDown';
import { sysControllerChangePwdCode } from '@/services/silent-rain-admin/sys';
import { userControllerChangePwd, userControllerResetPwd } from '@/services/silent-rain-admin/user';
import { rsaEncrypt } from '@/utils';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, AutoComplete, Button, Form, Input } from 'antd';
import { createStyles } from 'antd-style';
import CommonFormText from '../CommonFormItem/CommonFormText';
import useAutoCompleteEmail from '@/hooks/useAutoCompleteEmail';

const useStyles = createStyles(() => {
  return {
    code: {
      width: 'calc(100% - 108px)',
      marginRight: 16,
      marginBottom: 10,
    },
    'code-text': {
      width: 70,
      textAlign: 'center',
    },
  };
});

const UpdatePwd: React.FC<{
  open: boolean;
  onModalClose: () => void;
  mode: 'change' | 'reset'; // change: 修改密码，reset: 重置密码
  onSubmit?: () => void;
}> = ({ open, onSubmit, onModalClose, mode }) => {
  const [formInstance] = Form.useForm<API.UserResetPwdDto | API.ChangeUserPwdDto>();
  const { message } = App.useApp();
  const { styles } = useStyles();
  const { startCountDown, loading, stopCountDown, second } = useCountDown();
  const { public_key } = useModel('rsa');
  const autoCompleteCfg = useAutoCompleteEmail();

  const onChangeFinish = async (values: API.ChangeUserPwdDto) => {
    const password = rsaEncrypt(values.password, public_key!);
    const new_password = rsaEncrypt(values.new_password, public_key!);
    const confirm = rsaEncrypt(values.confirm, public_key!);

    const { success } = await userControllerChangePwd({
      captcha: values.captcha,
      password,
      new_password,
      confirm,
    });
    if (success) {
      message.success('密码修改成功！');
      onSubmit?.();
      return true;
    } else {
      return false;
    }
  };

  const onResetFinish = async (values: API.UserResetPwdDto) => {
    const new_password = rsaEncrypt(values.new_password, public_key!);
    const confirm = rsaEncrypt(values.confirm, public_key!);

    const { success } = await userControllerResetPwd({
      username: values.username,
      email: values.email,
      captcha: values.captcha,
      new_password,
      confirm,
    });
    if (success) {
      message.success('密码重置成功！');
      onSubmit?.();
      return true;
    } else {
      return false;
    }
  };

  return (
    <ModalForm<API.UserResetPwdDto | API.ChangeUserPwdDto>
      width={500}
      open={open}
      onOpenChange={(open) => {
        if (!open) onModalClose();
      }}
      title={mode === 'reset' ? '重置密码' : '修改密码'}
      form={formInstance}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        centered: true,
        onCancel: onModalClose,
      }}
      labelAlign="right"
      labelCol={{
        span: mode === 'reset' ? 6 : 7,
      }}
      wrapperCol={{
        span: mode === 'reset' ? 16 : 7,
      }}
      labelWrap
      // @ts-ignore
      onFinish={mode === 'reset' ? onResetFinish : onChangeFinish}
    >
      <br />
      {mode === 'reset' && (
        <>
          <CommonFormText label="用户名" name="username" required />
          <Form.Item
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
              {
                type: 'email',
                message: '邮箱格式不正确',
              },
            ]}
            name="email"
            label="邮箱"
          >
            <AutoComplete {...autoCompleteCfg} allowClear />
          </Form.Item>
        </>
      )}
      {mode === 'change' && (
        <ProFormText.Password
          name="password"
          label="旧密码"
          placeholder="请输入旧密码"
          rules={[
            {
              required: true,
              message: '请输入旧密码',
            },
          ]}
        />
      )}
      <ProFormText.Password
        name="new_password"
        label="新密码"
        placeholder="请输入新密码"
        rules={[
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码至少6位' },
          { max: 32, message: '密码最多32位' },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
            message: '密码至少应包含字母和数字',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('password') !== value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('新密码不能和旧密码相同'));
            },
          }),
        ]}
      />
      <ProFormText.Password
        hasFeedback
        name="confirm"
        dependencies={['new_password']}
        label="确认新密码"
        placeholder="请再次输入新密码"
        rules={[
          {
            required: true,
            message: '请再次输入新密码',
          },
          { min: 6, message: '密码至少6位' },
          { max: 32, message: '密码最多32位' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不匹配'));
            },
          }),
        ]}
      />
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
          disabled={loading}
          onClick={async () => {
            const email = formInstance.getFieldValue('email');
            if (!email) {
              message.error('请先输入邮箱');
              return;
            }
            try {
              startCountDown();
              const { success } = await sysControllerChangePwdCode({ email });
              if (success) message.success('验证码已发送至您的注册邮箱，请注意查收！');
              else throw new Error('验证码发送失败');
            } catch (err) {
              console.error(err);
              stopCountDown();
            }
          }}
        >
          <span className={styles['code-text']}>{loading ? `${second}s` : '获取验证码'}</span>
        </Button>
      </Form.Item>
    </ModalForm>
  );
};
export default UpdatePwd;
