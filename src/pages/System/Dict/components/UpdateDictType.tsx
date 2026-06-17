import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { statusOptions } from '@/common/options';
import CommonFormRadio from '@/components/CommonFormItem/CommonFormRadio';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import CommonFormTextArea from '@/components/CommonFormItem/CommonFormTextArea';
import {
  dictControllerCreateType,
  dictControllerUpdateType,
} from '@/services/silent-rain-admin/dict';

type FormValues = API.DictTypeCreateDto;

const submitApiMap = {
  create: dictControllerCreateType,
  update: dictControllerUpdateType,
};

const titleMap = {
  create: '创建字典类型',
  update: '编辑字典类型',
};

const UpdateDictType: React.FC<{
  open: boolean;
  mode: 'create' | 'update';
  params?: Partial<API.DictTypeUpdateDto>;
  onClose: () => void;
  onSubmit?: () => void;
}> = ({ open, onSubmit, onClose, mode, params = {} }) => {
  const [formInstance] = Form.useForm<FormValues>();
  const { message } = App.useApp();

  const onFinish = async (values: FormValues) => {
    const { success } = await (submitApiMap[mode] as (data: FormValues) => any)(
      values,
    );
    if (success) {
      message.success(`${titleMap[mode]}成功！`);
      onSubmit?.();
      return true;
    }
    return false;
  };

  return (
    <ModalForm<FormValues>
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
      title={titleMap[mode]}
      form={formInstance}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        centered: true,
        onCancel: onClose,
      }}
      labelAlign="right"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 18 }}
      labelWrap
      onFinish={onFinish}
    >
      <br />
      <CommonFormText name="id" hidden />
      <CommonFormText label="字典名称" name="name" required />
      <CommonFormText label="字典编码" name="code" required />
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

export default UpdateDictType;
