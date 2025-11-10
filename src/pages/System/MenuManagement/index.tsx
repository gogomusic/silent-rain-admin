import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { array2tree, renderAntdIcon } from '@/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { App, Button, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import MenuUpdateModal, { MenuType } from './components/MenuUpdateModal';
import { menuControllerDelete, menuControllerList } from '@/services/silent-rain-admin/menu';
import { statusOptions } from '@/common/options';
import { defaultConfig } from '@/common/pro-table.config';
import useHasAccess from '@/hooks/useHaveAccess';
import { Access } from '@umijs/max';
import AccessPopconfirmButton from '@/components/AccessPopconfirmButton';

const MenuManagement: React.FC = () => {
  const [tableListDataSource, setTableListDataSource] = useState([] as API.MenuTree[]);
  const actionRef = useRef<ActionType>();
  const { message, notification } = App.useApp();
  const { hasAccess } = useHasAccess();

  const gerMenuList = async () => {
    let { success, data } = await menuControllerList();
    let treeData: API.MenuTree[] = [];
    if (success) {
      treeData = array2tree(data?.list || []) as API.MenuTree[];
    }
    setTableListDataSource(treeData);
    return {
      data: treeData,
      success,
      total: treeData.length,
    };
  };

  const deleteMenu = async (id: number) => {
    const { success } = await menuControllerDelete({ id });
    if (success) {
      message.success('删除成功！');
      actionRef?.current?.reload();
    }
  };

  const showReloadConfirm = () => {
    notification.open({
      message: '您已经更改了菜单，是否需要立即刷新页面使更改生效?',
      icon: <ExclamationCircleOutlined />,
      actions: (
        <Button type="primary" onClick={() => window.location.reload()}>
          确定
        </Button>
      ),
      placement: 'topRight',
      duration: 5,
    });
  };

  const columns: ProColumns<API.MenuTree>[] = [
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
      width: 200,
      ellipsis: true,
      fixed: 'left',
      render: (_, record) => {
        return (
          <Space>
            {renderAntdIcon(record.icon)}
            {record.name}
          </Space>
        );
      },
    },
    {
      title: '菜单类型',
      key: 'type',
      dataIndex: 'type',
      width: 80,
      render: (_, record) => [
        <Tag color={record?.type === MenuType.MENU ? 'red' : 'blue'} key={record?.id}>
          {['菜单', '按钮']?.[record?.type]}
        </Tag>,
      ],
    },
    {
      key: 'path',
      title: '路由地址',
      dataIndex: 'path',
      ellipsis: true,
      width: 180,
    },
    {
      key: 'component',
      title: '组件路径',
      dataIndex: 'component',
      ellipsis: true,
      width: 180,
    },
    {
      width: 120,
      key: 'permission',
      title: '权限标识',
      dataIndex: 'permission',
      ellipsis: true,
    },
    {
      width: 80,
      key: 'sort',
      title: '排序',
      align: 'center',
      dataIndex: 'sort',
    },
    {
      key: 'status',
      title: '状态',
      width: 50,
      align: 'center',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: statusOptions,
      },
    },
    {
      title: '操作',
      width: 250,
      key: 'operate',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <Access accessible={hasAccess('menu:update')} key="add">
          <MenuUpdateModal
            op="Create"
            params={record}
            menuTree={tableListDataSource}
            commitCallback={() => {
              actionRef?.current?.reload();
              showReloadConfirm();
            }}
          />
        </Access>,
        <Access accessible={hasAccess('menu:update')} key="update">
          <MenuUpdateModal
            op="Update"
            params={record}
            menuTree={tableListDataSource}
            commitCallback={() => {
              actionRef?.current?.reload();
              showReloadConfirm();
            }}
          />
        </Access>,
        <Access accessible={hasAccess('menu:update')} key="copy">
          <MenuUpdateModal
            op="Copy"
            params={record}
            menuTree={tableListDataSource}
            commitCallback={() => {
              actionRef?.current?.reload();
              showReloadConfirm();
            }}
          />
        </Access>,
        <AccessPopconfirmButton
          code="menu:delete"
          key="delete"
          onConfirm={() => deleteMenu(record.id)}
          buttonProps={{
            size: 'small',
          }}
        >
          删除
        </AccessPopconfirmButton>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
      }}
    >
      <ProTable<API.MenuTree>
        {...defaultConfig()}
        headerTitle="菜单管理"
        actionRef={actionRef}
        dataSource={tableListDataSource}
        pagination={false}
        columns={columns}
        search={false}
        request={async () => gerMenuList()}
        toolBarRender={() => [
          <MenuUpdateModal
            key="create-top"
            op="Create_Top"
            menuTree={tableListDataSource}
            commitCallback={() => {
              actionRef?.current?.reload();
              showReloadConfirm();
            }}
          />,
        ]}
      />
    </PageContainer>
  );
};
export default MenuManagement;
