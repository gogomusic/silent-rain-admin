import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, message, notification, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { statusOptions } from '@/common/options';
import { defaultConfig } from '@/common/pro-table.config';
import AccessPopconfirmButton from '@/components/AccessPopconfirmButton';
import {
  menuControllerDelete,
  menuControllerList,
} from '@/services/silent-rain-admin/menu';
import { array2tree, renderAntdIcon } from '@/utils';
import MenuUpdateModal from './components/MenuUpdateModal';

const Menu: React.FC = () => {
  const [tableListDataSource, setTableListDataSource] = useState(
    [] as API.MenuTree[],
  );
  const actionRef = useRef<ActionType>(null);
  const access = useAccess();
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const getMenuList = async () => {
    const { success, data } = await menuControllerList();
    const { list = [], total = 0 } = data ?? {};
    let treeData: API.MenuTree[] = [];
    if (success) treeData = array2tree(list);
    setTableListDataSource(treeData);
    return {
      data: treeData,
      success,
      total,
    };
  };

  const deleteMenu = async (id: number) => {
    const { success } = await menuControllerDelete({ id });
    if (success) {
      messageApi.success('删除成功');
      actionRef?.current?.reload();
    }
  };

  const showReloadConfirm = () => {
    notificationApi.open({
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
        <Tag color={record?.type === 0 ? 'red' : 'blue'} key={record?.id}>
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
      key: 'permission',
      title: '权限标识',
      dataIndex: 'permission',
      ellipsis: true,
      width: 180,
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
      width: 270,
      key: 'operate',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, record) => [
        <Access accessible={!!access['menu:create']} key="add">
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
        <Access accessible={!!access['menu:update']} key="update">
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
        <Access accessible={!!access['menu:create']} key="copy">
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
        request={async () => getMenuList()}
        toolBarRender={() => [
          <Access accessible={!!access['menu:create']} key="copy">
            <MenuUpdateModal
              key="create-top"
              op="CreateTop"
              menuTree={tableListDataSource}
              commitCallback={() => {
                actionRef?.current?.reload();
                showReloadConfirm();
              }}
            />
          </Access>,
        ]}
      />
      {contextHolder}
      {notificationContextHolder}
    </PageContainer>
  );
};
export default Menu;
