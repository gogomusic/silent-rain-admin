import {
  CopyOutlined,
  EditOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  ModalForm,
  ProFormDependency,
  ProFormDigit,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useState } from 'react';
import { statusOptions } from '@/common/options';
import CommonFormAntdIconSelect from '@/components/CommonFormItem/CommonFormAntdIconSelect';
import CommonFormRadio from '@/components/CommonFormItem/CommonFormRadio';
import {
  menuControllerCreate,
  menuControllerUpdate,
} from '@/services/silent-rain-admin/menu';
import { disableChildren, exhaustiveCheck } from '@/utils';

type OperateType = 'Create' | 'Update' | 'CreateTop' | 'Copy';

const titleMap = {
  Create: '创建菜单',
  Update: '编辑菜单',
  CreateTop: '创建菜单',
  Copy: '复制菜单',
};

const MenuUpdateModal: React.FC<{
  op: OperateType;
  params?: API.MenuTree;
  menuTree: API.MenuTree[];
  commitCallback: () => void;
}> = ({ op, params, menuTree, commitCallback }) => {
  const [form] = Form.useForm<API.MenuTree>();
  const [messageApi, contextHolder] = message.useMessage();
  const [treeExpandedKeys, setTreeExpandedKeys] = useState<(number | string)[]>(
    [],
  );

  const updateMenu = async (values: API.MenuTree) => {
    let id: number | undefined;
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
      CreateTop: menuControllerCreate,
      Copy: menuControllerCreate,
      Update: menuControllerUpdate,
    }[op](data);
    if (success) {
      messageApi.success('操作成功');
      commitCallback();
      return true;
    }
    return false;
  };

  const getModalData = async () => {
    switch (op) {
      case 'Update':
        if (params) form.setFieldsValue(params);
        break;
      case 'Create':
        if (params)
          form.setFieldsValue({
            type: 0,
            pid: params.id,
            isHidden: false,
            status: true,
          });
        break;
      case 'CreateTop':
        form.setFieldsValue({
          type: 0,
          pid: 0,
          isHidden: false,
          status: true,
        });
        break;
      case 'Copy':
        if (params)
          form.setFieldsValue({
            ...params,
            sort: params.sort + 1,
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
          <Button size="small" type="link" icon={<PlusCircleOutlined />}>
            添加子菜单
          </Button>
        );
      case 'Copy':
        return (
          <Button size="small" type="link" icon={<CopyOutlined />}>
            复制
          </Button>
        );
      case 'Update':
        return (
          <Button size="small" type="link" icon={<EditOutlined />}>
            编辑
          </Button>
        );
      case 'CreateTop':
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
            value: 0,
          },
          {
            label: '按钮',
            value: 1,
          },
        ]}
        name="type"
        required
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          switch (type) {
            case 0:
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
            case 1:
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
                  <ProFormText
                    width="md"
                    name="permission"
                    label="权限标识"
                    placeholder="例如: user:list"
                    rules={[
                      {
                        required: true,
                        message: '请输入权限标识',
                      },
                      {
                        pattern: /^[a-zA-Z]+:[a-zA-Z]+$/,
                        message: '权限标识格式不正确，示例：user:list',
                      },
                    ]}
                  />
                </>
              );
            default:
              return null;
          }
        }}
      </ProFormDependency>

      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === 0) {
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
                <ProFormText
                  width="md"
                  name="component"
                  label="组件路径"
                  placeholder=""
                />

                <CommonFormRadio
                  label="是否在菜单中显示"
                  options={[
                    {
                      label: '显示',
                      value: false,
                    },
                    {
                      label: '隐藏',
                      value: true,
                    },
                  ]}
                  name="isHidden"
                  required
                />
              </>
            );
          } else {
            return null;
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
      <CommonFormRadio
        label="状态"
        options={statusOptions}
        name="status"
        required
      />
      {contextHolder}
    </ModalForm>
  );
};

export default MenuUpdateModal;
