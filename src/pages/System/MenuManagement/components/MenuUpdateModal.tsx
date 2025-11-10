import { statusOptions } from '@/common/options';
import CommonFormAntdIconSelect from '@/components/CommonFormItem/CommonFormAntdIconSelect';
import CommonFormRadio from '@/components/CommonFormItem/CommonFormRadio';
import { menuControllerCreate, menuControllerUpdate } from '@/services/silent-rain-admin/menu';
import { disableChildren, exhaustiveCheck } from '@/utils';
import { CopyOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, App } from 'antd';
import { useState } from 'react';

type OperateType = 'Create' | 'Update' | 'Create_Top' | 'Copy';
export enum MenuType {
  /** 菜单 */ MENU = 0,
  /** 按钮 */ BUTTON = 1,
}
const titleMap = {
  Create: '创建菜单',
  Update: '编辑菜单',
  Create_Top: '创建菜单',
  Copy: '复制菜单',
};

const MenuUpdateModal: React.FC<{
  op: OperateType;
  params?: API.MenuTree;
  menuTree: API.MenuTree[];
  commitCallback: () => void;
}> = ({ op, params, menuTree, commitCallback }) => {
  const [form] = Form.useForm<API.MenuTree>();
  const { message } = App.useApp();
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<(number | string)[]>([]);

  const updateMenu = async (values: API.MenuTree) => {
    let id: number | undefined = undefined;
    if (op === 'Update') {
      id = params?.id;
    }
    const data = id
      ? {
          ...values,
          id,
        }
      : values;
    delete data.routes;
    const { success } = await {
      Create: menuControllerCreate,
      Create_Top: menuControllerCreate,
      Copy: menuControllerCreate,
      Update: menuControllerUpdate,
    }[op](data);
    if (success) {
      message.success('操作成功');
      commitCallback();
      return true;
    }
    return false;
  };

  const getModalData = async () => {
    switch (op) {
      case 'Update':
        form.setFieldsValue(params!);
        break;
      case 'Create':
        form.setFieldsValue({
          type: 0,
          pid: params!.id,
          is_hidden: 0,
          status: 1,
        });
        break;
      case 'Create_Top':
        form.setFieldsValue({
          type: 0,
          pid: 0,
          is_hidden: 0,
          status: 1,
        });
        break;
      case 'Copy':
        form.setFieldsValue({
          ...params,
          sort: params!.sort + 1,
        });
        break;
      default:
        exhaustiveCheck(op);
    }
  };

  const renderBtn = () => {
    switch (op) {
      case 'Create':
        return (
          <Button size="small" type="primary" icon={<PlusCircleFilled />}>
            添加子菜单
          </Button>
        );
      case 'Copy':
        return (
          <Button size="small" type="primary" icon={<CopyOutlined />}>
            复制
          </Button>
        );
      case 'Update':
        return (
          <Button size="small" type="primary" icon={<EditOutlined />}>
            编辑
          </Button>
        );
      case 'Create_Top':
        return (
          <Button type="primary" size="middle" icon={<PlusCircleFilled />}>
            添加
          </Button>
        );
      default:
        exhaustiveCheck(op);
    }
  };

  return (
    <ModalForm<API.MenuTree>
      onOpenChange={async (open: boolean) => {
        if (!open) {
          form.resetFields();
        } else {
          await getModalData();
          setTreeExpandedKeys([params?.pid || 0]);
        }
      }}
      labelCol={{
        span: 8,
      }}
      title={titleMap[op]}
      trigger={<a key={op}>{renderBtn()}</a>}
      layout="horizontal"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnHidden: true,
        centered: true,
      }}
      onFinish={updateMenu}
    >
      <ProFormTreeSelect
        label="上级菜单"
        name="pid"
        placeholder="请选择上级菜单"
        allowClear
        width="md"
        rules={[
          {
            required: true,
            message: '请选择上级菜单',
          },
        ]}
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id',
          },
          treeExpandedKeys: treeExpandedKeys,
          onTreeExpand: (expandedKeys) => {
            setTreeExpandedKeys(expandedKeys);
          },
          filterTreeNode: true,
          showSearch: true,
          popupMatchSelectWidth: false,
          labelInValue: false,
          autoClearSearchValue: true,
          multiple: false,
          treeNodeFilterProp: 'title',
          treeData: [
            {
              id: 0,
              name: '/',
              children: disableChildren(menuTree, params?.id),
            },
          ],
        }}
      />

      <CommonFormRadio
        label="菜单类型"
        options={[
          {
            label: '菜单',
            value: MenuType.MENU,
          },
          {
            label: '按钮',
            value: MenuType.BUTTON,
          },
        ]}
        name="type"
        required
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === MenuType.MENU)
            return (
              <ProFormText
                width="md"
                name="name"
                placeholder=""
                label="菜单名称"
                rules={[
                  {
                    required: true,
                    message: '请输入菜单名称',
                  },
                ]}
              />
            );
          else if (type === MenuType.BUTTON)
            return (
              <>
                <ProFormText
                  width="md"
                  name="name"
                  label="按钮名称"
                  placeholder=""
                  rules={[
                    {
                      required: true,
                      message: '请输入按钮名称',
                    },
                  ]}
                />
              </>
            );
        }}
      </ProFormDependency>

      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === MenuType.MENU) {
            return (
              <>
                <CommonFormAntdIconSelect
                  wrapperCol={{ span: 10 }}
                  name="icon"
                  label="图标"
                  required
                />
                <ProFormText
                  width="md"
                  name="path"
                  label="路由地址"
                  placeholder=""
                  rules={[
                    {
                      required: true,
                      message: '请输入路由地址',
                    },
                  ]}
                />
                <ProFormText width="md" name="component" label="组件路径" placeholder="" />

                <CommonFormRadio
                  label="是否在菜单中显示"
                  options={[
                    {
                      label: '显示',
                      value: 0,
                    },
                    {
                      label: '隐藏',
                      value: 1,
                    },
                  ]}
                  name="is_hidden"
                  required
                />
              </>
            );
          } else {
            return null;
          }
        }}
      </ProFormDependency>
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type !== MenuType.MENU) {
            return (
              <>
                <ProFormText
                  width="md"
                  name="permission"
                  label="权限标识"
                  initialValue={op !== 'Update' ? 'sys:' : ''}
                  placeholder=""
                  rules={[
                    {
                      required: true,
                      message: '请输入权限标识',
                    },
                  ]}
                />
              </>
            );
          } else {
            return <></>;
          }
        }}
      </ProFormDependency>
      <ProFormDigit
        label="排序"
        placeholder=""
        name="sort"
        width="md"
        min={0}
        max={9999}
        rules={[
          {
            required: true,
            message: '请设置排序',
          },
        ]}
      />
      <CommonFormRadio label="状态" options={statusOptions} name="status" required />
    </ModalForm>
  );
};

export default MenuUpdateModal;
