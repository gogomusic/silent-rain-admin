import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Button, Form, Input } from 'antd';
import { createStyles } from 'antd-style';
import { useCountDown } from '@/hooks/useCountDown';
import {
  userControllerChangePassword,
  userControllerGetCaptcha,
} from '@/services/silent-rain-admin/user';

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

const ChangePwd: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}> = ({ open, onSubmit, onClose }) => {
  const [formInstance] = Form.useForm<API.UserChangePwdDto>();
  const { message } = App.useApp();
  const { styles } = useStyles();
  const { startCountDown, loading, stopCountDown, second } = useCountDown();
  const { initialState } = useModel('@@initialState');
  const email = initialState?.currentUser?.email;

  const onFinish = async (values: API.UserChangePwdDto) => {
    const { success } = await userControllerChangePassword(values);
    if (success) {
      message.success('密码修改成功！');
      onSubmit?.();
      return true;
    }
    return false;
  };

  return (
    <ModalForm<API.UserChangePwdDto>
      width={500}
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="修改密码"
      form={formInstance}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        centered: true,
        onCancel: onClose,
      }}
      labelAlign="right"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      labelWrap
      onFinish={onFinish}
    >
      <br />
      <ProFormText.Password
        name="oldPassword"
        label="旧密码"
        placeholder="请输入旧密码"
        rules={[{ required: true, message: '请输入旧密码' }]}
      />
      <ProFormText.Password
        name="newPassword"
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
              if (getFieldValue('oldPassword') !== value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('新密码不能和旧密码相同'));
            },
          }),
        ]}
      />
      <ProFormText.Password
        hasFeedback
        name="confirmPassword"
        dependencies={['newPassword']}
        label="确认新密码"
        placeholder="请再次输入新密码"
        rules={[
          { required: true, message: '请再次输入新密码' },
          { min: 6, message: '密码至少6位' },
          { max: 32, message: '密码最多32位' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
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
            { len: 6, message: '验证码必须为6位' },
          ]}
        >
          <Input placeholder="请输入验证码" className={styles.code} />
        </Form.Item>
        <Button
          type="primary"
          style={{ padding: '0 8px' }}
          disabled={loading}
          onClick={async () => {
            if (!email) {
              message.error('请先输入邮箱');
              return;
            }
            try {
              startCountDown();
              const { success } = await userControllerGetCaptcha({
                email,
              });
              if (success)
                message.success('验证码已发送至您的注册邮箱，请注意查收！');
              else throw new Error('验证码发送失败');
            } catch (err) {
              console.error(err);
              stopCountDown();
            }
          }}
        >
          <span className={styles['code-text']}>
            {loading ? `${second}s` : '获取验证码'}
          </span>
        </Button>
      </Form.Item>
    </ModalForm>
  );
};

export default ChangePwd;
