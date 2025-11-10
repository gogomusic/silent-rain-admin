import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import {
  roleControllerCreate,
  roleControllerMenus,
  roleControllerUpdate,
} from '@/services/silent-rain-admin/role';
import CommonFormText from '@/components/CommonFormItem/CommonFormText';
import CommonFormTextArea from '@/components/CommonFormItem/CommonFormTextArea';
import CommonFormRadio from '@/components/CommonFormItem/CommonFormRadio';
import { statusOptions } from '@/common/options';
import { useEffect, useState } from 'react';
import { menuControllerSimpleList } from '@/services/silent-rain-admin/menu';
import { array2tree, renderAntdIcon } from '@/utils';
import CommonFormTree from '@/components/CommonFormItem/CommonFormTree';
import { MenuType } from '../../MenuManagement/components/MenuUpdateModal';
import IconApi from '@/components/Icons/IconApi';
import { createStyles } from 'antd-style';

interface FormValues extends Omit<API.UpdateRoleDto, 'permissions'> {
  permissions: {
    checked: number[];
    halfChecked: number[];
  };
}
interface MenuItem extends Partial<API.Menu> {
  id: number;
  pid: number;
  key: number;
  title: string;
  checked?: boolean;
  children?: MenuItem[];
}

const useStyles = createStyles(() => {
  return {
    modal: {
      height: 600,
      overflowY: 'auto',
    },
  };
});
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
  params?: Partial<API.UpdateRoleDto>;
  onClose: () => void;
  onSubmit?: () => void;
}> = ({ open, onSubmit, onClose, mode, params = {} }) => {
  const { styles } = useStyles();
  const [formInstance] = Form.useForm<FormValues>();
  const { message } = App.useApp();
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const onFinish = async (values: FormValues) => {
    const { permissions: p } = values;
    const { success } = await submitApiMap[mode]({
      ...values,
      permissions: [...p.checked, ...p.halfChecked],
    });
    if (success) {
      message.success(`${titleMap[mode]}成功！`);
      onSubmit?.();
      return true;
    } else {
      return false;
    }
  };

  const getMenus = async () => {
    const { success, data } = await menuControllerSimpleList();
    if (success && data) {
      setMenus(
        data.list?.map((item) => {
          let icon: any = item.icon || undefined;
          if (item.type === MenuType.MENU) {
            if (item.icon) {
              icon = renderAntdIcon(item.icon);
            }
          } else if (item.type === MenuType.BUTTON) {
            icon = <IconApi size={20} />;
          }
          return {
            ...item,
            key: item.id,
            title: item.name,
            icon,
          };
        }) || [],
      );
    }
  };

  const getRoleMenus = async () => {
    let permissionArray: number[] = [];

    if (params.id) {
      const { success, data } = await roleControllerMenus({ id: params.id });
      if (success && data) {
        permissionArray = data;
      }
    }
    const menusWithCheckStatus = menus.map((menu) => ({
      ...menu,
      checked: permissionArray.includes(menu.id!) ? true : false,
    }));
    const treeData = array2tree(menusWithCheckStatus) as MenuItem[];

    /** 根据节点的`checked`状态，设置初始`permissions` */
    const setDefaultPermissions = (nodes: typeof treeData) => {
      const checked: number[] = [];
      const halfChecked: number[] = [];

      /** 判断节点的选中状态，选中时返回`true`，半选中或未选中返回`false` */
      const checkNode = (node: (typeof treeData)[number]): boolean => {
        // 未选中，返回 false
        if (!node.checked) return false;
        // 选中，且没有子节点，返回 true
        if (!node.children || node.children.length === 0) {
          checked.push(node.id);
          return true;
        } else {
          /** 所有子节点是否全部被选中 */
          let isChildrenAllChecked: boolean = true;
          node.children.forEach((child) => {
            const isChecked = checkNode(child);
            if (!isChecked) isChildrenAllChecked = false;
          });
          if (isChildrenAllChecked) {
            checked.push(node.id);
          } else {
            halfChecked.push(node.id);
          }
          return node.checked && isChildrenAllChecked;
        }
      };
      nodes.forEach(checkNode);
      return { checked, halfChecked };
    };

    formInstance.setFieldsValue({
      ...params,
      permissions: setDefaultPermissions(treeData),
    });
  };
  useEffect(() => {
    getMenus();
  }, []);

  return (
    <ModalForm<FormValues>
      width={600}
      className={styles.modal}
      open={open}
      onOpenChange={(open) => {
        if (open) {
          getRoleMenus();
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
        span: 5,
      }}
      wrapperCol={{
        span: 16,
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
      <CommonFormTree
        required
        label="权限"
        name="permissions"
        treeData={array2tree(menus)}
        fieldProps={{
          showLine: true,
          showIcon: true,
        }}
      />
    </ModalForm>
  );
};
export default UpdateRole;
