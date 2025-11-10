import { ProForm } from '@ant-design/pro-components';
import { App, AutoComplete, Button, Card, Form, Input, Space } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import banner from '@/assets/images/personal-center-bg.jpg';
import useAutoCompleteEmail from '@/hooks/useAutoCompleteEmail';
import { useModel } from '@umijs/max';
import {
  userControllerFindCurrent,
  userControllerUpdateSelf,
} from '@/services/silent-rain-admin/user';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import AvatarUpload from '@/components/AvatarUpload';
import CommonFormTextArea from '@/components/CommonFormItem/CommonFormTextArea';
import AvatarView from '@/components/AvatarView';

const PersonalCenter: React.FC = () => {
  const [formInstance] = Form.useForm<API.UpdateSelfDto>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialData = useRef<API.User>();
  const autoCompleteCfg = useAutoCompleteEmail();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { message } = App.useApp();

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

  const onSubmit = async () => {
    setLoading(true);
    formInstance
      .validateFields()
      .then(async (v) => {
        try {
          const { avatar_info, ...values } = v as API.UpdateSelfDto & {
            avatar_info: API.FileBaseDto;
          };
          let avatar: number | undefined = initialData.current?.avatar;
          if (avatar_info.file_id) {
            avatar = avatar_info.file_id;
          }
          const { success, msg } = await userControllerUpdateSelf({ ...values, avatar });
          if (success) {
            message.success(msg);
            await getCurrentUserInfo();
            setInitialState((s) => ({
              ...s,
              currentUser: initialData.current,
            }));
            setDisabled(true);
          }
        } finally {
          setLoading(false);
        }
      })
      .catch(() => void setLoading(false));
  };
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
        <Card variant="outlined" hoverable className={styles['form-card']} title="">
          <ProForm<API.UpdateSelfDto>
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
            <ProForm.Item name="avatar_info" label="头像">
              <AvatarUpload readonly={disabled} />
            </ProForm.Item>
            <CommonFormText name="username" label="用户名" readonly={disabled} disabled required />
            <CommonFormText name="nickname" label="昵称" readonly={disabled} required />
            {disabled ? (
              <CommonFormText name="email" label="邮箱" readonly={disabled} required />
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
                <AutoComplete {...autoCompleteCfg} allowClear />
              </Form.Item>
            )}
            <CommonFormTextArea name="description" label="简介" readonly={disabled} />

            <div style={{ textAlign: 'center', bottom: '10px', left: '280px', marginTop: '20px' }}>
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
