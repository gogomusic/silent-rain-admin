import { ProForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Button, Card, Form, Input, Space } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import banner from '@/assets/images/personal-center-bg.jpg';
import AvatarUpload from '@/components/AvatarUpload';
import AvatarView from '@/components/AvatarView';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import CommonFormTextArea from '@/components/CommonFormItem/CommonFormTextArea';
import {
  userControllerFindCurrent,
  userControllerUpdateSelf,
} from '@/services/silent-rain-admin/user';
import styles from './index.module.less';

const PersonalCenter: React.FC = () => {
  const [formInstance] = Form.useForm<API.UserUpdateSelfDto>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialData = useRef<API.User>(null);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { message } = App.useApp();

  /** 获取当前用户信息并填充表单 */
  const getCurrentUserInfo = useCallback(async () => {
    const { success, data } = await userControllerFindCurrent();
    if (success && data) {
      initialData.current = data;
      formInstance.setFieldsValue(data);
    }
  }, [formInstance]);

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  /** 提交修改个人资料 */
  const onSubmit = async () => {
    setLoading(true);
    try {
      const values = await formInstance.validateFields();
      const { avatarInfo, ...data } = values as API.UserUpdateSelfDto & {
        avatarInfo?: Record<string, unknown>;
      };
      let avatar = initialData.current?.avatar;
      if (avatarInfo) {
        const newFileId = (avatarInfo as Record<string, unknown>)?.fileId;
        if (typeof newFileId === 'number') {
          avatar = newFileId;
        }
      }
      const { success } = await userControllerUpdateSelf({
        ...data,
        avatar,
      });
      if (success) {
        message.success('修改成功');
        await getCurrentUserInfo();
        setInitialState((s) => ({
          ...s,
          currentUser: initialData.current,
        }));
        setDisabled(true);
      } else {
        message.error('修改失败，请稍后重试');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'errorFields' in err) {
        return;
      }
      message.error('操作失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  /** 取消编辑，恢复为初始数据 */
  const onCancel = () => {
    setDisabled(true);
    formInstance.setFieldsValue(initialData.current || {});
  };
  const currentUser = initialState?.currentUser;

  return (
    <div className={styles.personalCenter}>
      <div className={styles.banner}>
        <img src={banner} alt="personal center" />
        <div className={styles.info}>
          <div className={styles.avatar}>
            <AvatarView isCurrentUser size={64} />
          </div>
          <div className={styles.right}>
            <h2>{currentUser?.nickname}</h2>
            <p>
              @{currentUser?.username} / {currentUser?.email}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.cards}>
        <Card
          variant="outlined"
          hoverable
          className={styles['form-card']}
          title=""
        >
          <ProForm<API.UserUpdateSelfDto>
            submitter={false}
            autoFocusFirstInput
            layout="horizontal"
            form={formInstance}
            style={{
              width: '100%',
              maxWidth: '400px',
            }}
            scrollToFirstError={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            rowProps={{
              gutter: 10,
            }}
          >
            <ProForm.Item name="id" label="id" hidden>
              <Input />
            </ProForm.Item>
            <ProForm.Item name="avatarInfo" label="头像">
              <AvatarUpload readonly={disabled} />
            </ProForm.Item>
            <CommonFormText
              name="username"
              label="用户名"
              readonly={disabled}
              disabled
              required
            />
            <CommonFormText
              name="nickname"
              label="昵称"
              readonly={disabled}
              required
            />
            {disabled ? (
              <CommonFormText
                name="email"
                label="邮箱"
                readonly={disabled}
                disabled
                required
              />
            ) : (
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
                <Input disabled />
              </Form.Item>
            )}
            <CommonFormTextArea
              name="description"
              label="简介"
              readonly={disabled}
            />

            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              <Space>
                {disabled && (
                  <Button type="primary" onClick={() => setDisabled(false)}>
                    修改个人资料
                  </Button>
                )}
                {!disabled && (
                  <>
                    <Button onClick={onCancel}>取消</Button>
                    <Button type="primary" onClick={onSubmit} loading={loading}>
                      提交
                    </Button>
                  </>
                )}
              </Space>
            </div>
          </ProForm>
        </Card>
      </div>
    </div>
  );
};
export default PersonalCenter;
