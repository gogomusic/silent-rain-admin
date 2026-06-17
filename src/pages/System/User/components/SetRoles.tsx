import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import CommonFormSelect from '@/components/CommonFormItem/CommonFormSelect';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import { userControllerSetRoles } from '@/services/silent-rain-admin/user';

const SetRoles: React.FC<{
  open: boolean;
  params?: Partial<API.UserSetRolesDto>;
  allRoles: API.RoleSelectVo[];
  onClose: () => void;
  onSubmit?: () => void;
}> = ({ open, onSubmit, onClose, allRoles, params = {} }) => {
  const [formInstance] = Form.useForm<API.UserSetRolesDto>();
  const { message } = App.useApp();

  const onFinish = async (values: API.UserSetRolesDto) => {
    const { success } = await userControllerSetRoles(values);
    if (success) {
      message.success('分配角色成功！');
      onSubmit?.();
      return true;
    } else {
      return false;
    }
  };

  return (
    <ModalForm<API.UserSetRolesDto>
      width={500}
      open={open}
      onOpenChange={(open) => {
        if (open) {
          formInstance.setFieldsValue(params);
        } else {
          formInstance.resetFields();
          onClose();
        }
      }}
      title={'分配角色'}
      form={formInstance}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        centered: true,
        onCancel: onClose,
      }}
      labelAlign="right"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      labelWrap
      onFinish={onFinish}
    >
      <CommonFormText name="id" hidden />
      <CommonFormSelect
        label="角色"
        name="roles"
        mode="multiple"
        options={allRoles}
        fieldProps={{
          fieldNames: {
            value: 'id',
            label: 'name',
          },
        }}
      />
    </ModalForm>
  );
};
export default SetRoles;
