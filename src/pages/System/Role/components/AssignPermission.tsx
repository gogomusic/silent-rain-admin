import { ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { useEffect, useState } from 'react';
import CommonFormTree from '@/components/CommonFormItem/CommonFormTree';
import IconApi from '@/components/Icons/IconApi';
import { menuControllerSimpleList } from '@/services/silent-rain-admin/menu';
import {
  roleControllerAssignMenus,
  roleControllerMenus,
} from '@/services/silent-rain-admin/role';
import { array2tree, renderAntdIcon } from '@/utils';

interface MenuItem extends Partial<API.Menu> {
  id: number;
  pid: number;
  key: number;
  title: string;
  checked?: boolean;
  children?: MenuItem[];
}

interface FormValues {
  permissions: {
    checked: number[];
    halfChecked: number[];
  };
}

interface AssignPermissionProps {
  open: boolean;
  roleId?: number;
  roleName?: string;
  onClose: () => void;
  onSubmit?: () => void;
}

/** 分配角色权限弹窗 */
const AssignPermission: React.FC<AssignPermissionProps> = ({
  open,
  roleId,
  roleName,
  onClose,
  onSubmit,
}) => {
  const [formInstance] = Form.useForm<FormValues>();
  const { message } = App.useApp();
  const [menus, setMenus] = useState<MenuItem[]>([]);

  /** 获取菜单树数据 */
  const fetchMenus = async () => {
    const { success, data } = await menuControllerSimpleList();
    if (success && data) {
      setMenus(
        data.list?.map((item) => {
          let icon: any = item.icon || undefined;
          if (item.type === 0) {
            if (item.icon) {
              icon = renderAntdIcon(item.icon);
            }
          } else if (item.type === 1) {
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

  /** 递归遍历树节点，计算选中和半选中的节点 ID */
  const collectCheckedKeys = (
    nodes: MenuItem[],
  ): { checked: number[]; halfChecked: number[] } => {
    const checked: number[] = [];
    const halfChecked: number[] = [];

    const traverse = (node: MenuItem): boolean => {
      // 未选中，返回 false
      if (!node.checked) return false;
      // 选中且没有子节点，加入选中列表
      if (!node.children || node.children.length === 0) {
        checked.push(node.id);
        return true;
      }
      // 有子节点，递归检查子节点
      let allChildrenChecked = true;
      for (const child of node.children) {
        const isChecked = traverse(child);
        if (!isChecked) allChildrenChecked = false;
      }
      if (allChildrenChecked) {
        checked.push(node.id);
      } else {
        halfChecked.push(node.id);
      }
      return node.checked && allChildrenChecked;
    };

    nodes.forEach(traverse);
    return { checked, halfChecked };
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // 菜单加载完成后，再加载角色已有权限
  useEffect(() => {
    if (open && roleId && menus.length > 0) {
      const loadRolePermissions = async () => {
        let permissionArray: number[] = [];
        const { success, data } = await roleControllerMenus({ id: roleId });
        if (success && data) {
          permissionArray = data;
        }

        const menusWithCheckStatus = menus.map((menu) => ({
          ...menu,
          checked: permissionArray.includes(menu.id),
        }));
        // 递归遍历树节点，计算选中和半选中的节点 ID
        const treeData = array2tree(menusWithCheckStatus) as MenuItem[];
        const permissions = collectCheckedKeys(treeData);

        formInstance.setFieldsValue({ permissions });
      };
      loadRolePermissions();
    }
  }, [open, roleId, menus, formInstance]);

  const onFinish = async (values: FormValues) => {
    if (!roleId) return false;
    const { permissions: p } = values;
    const { success } = await roleControllerAssignMenus({
      roleId,
      menuIds: [...p.checked, ...p.halfChecked],
    });
    if (success) {
      message.success('权限分配成功！');
      onSubmit?.();
      return true;
    }
    return false;
  };

  return (
    <ModalForm<FormValues>
      width={600}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          formInstance.resetFields();
          onClose();
        }
      }}
      title={`分配权限 - ${roleName ?? ''}`}
      form={formInstance}
      layout="horizontal"
      modalProps={{ centered: true }}
      labelAlign="right"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      labelWrap
      onFinish={onFinish}
    >
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

export default AssignPermission;
