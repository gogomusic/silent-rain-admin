import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { statusOptions } from '@/common/options';
import CommonFormRadio from '@/components/CommonFormItem/CommonFormRadio';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import CommonFormTextArea from '@/components/CommonFormItem/CommonFormTextArea';
import {
  roleControllerCreate,
  roleControllerUpdate,
} from '@/services/silent-rain-admin/role';

type FormValues = Omit<API.RoleUpdateDto, 'permissions'>;

const submitApiMap = {
  create: roleControllerCreate,
  update: roleControllerUpdate,
};

const titleMap = {
  create: '创建角色',
  update: '编辑角色',
};

const UpdateRole: React.FC<{
  open: boolean;
  mode: 'create' | 'update';
  params?: Partial<API.RoleUpdateDto>;
  onClose: () => void;
  onSubmit?: () => void;
}> = ({ open, onSubmit, onClose, mode, params = {} }) => {
  const [formInstance] = Form.useForm<FormValues>();
  const { message } = App.useApp();

  const onFinish = async (values: FormValues) => {
    const { success } = await submitApiMap[mode](values);
    if (success) {
      message.success(`${titleMap[mode]}成功！`);
      onSubmit?.();
      return true;
    } else {
      return false;
    }
  };

  return (
    <ModalForm<FormValues>
      width={500}
      open={open}
      onOpenChange={(open) => {
        if (open) {
          if (params.id) formInstance.setFieldsValue(params);
        } else {
          formInstance.resetFields();
          onClose();
        }
      }}
      title={titleMap[mode]}
      form={formInstance}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        centered: true,
        onCancel: onClose,
      }}
      labelAlign="right"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      labelWrap
      onFinish={onFinish}
    >
      <br />
      <CommonFormText name="id" hidden />
      <CommonFormText label="角色" name="name" required />
      <CommonFormTextArea label="备注" name="remark" />
      <CommonFormRadio
        label="状态"
        name="status"
        options={statusOptions}
        required
        radioType="button"
      />
    </ModalForm>
  );
};
export default UpdateRole;
