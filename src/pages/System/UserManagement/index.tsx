import AvatarView from '@/components/AvatarView';
import { userStatusOptions } from '@/options';
import { userControllerChangeStatus, userControllerList } from '@/services/silent-rain-admin/user';
import { formatListRes } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { App, Space } from 'antd';
import { useRef } from 'react';
import { Switch } from 'antd';

type TableDataType = API.UserInfoDto;
type TableSearchParams = API.UserListReqDto;
const pageTitle = '';
const tableTitle = '用户管理';

/** 用户管理 */
const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();

  const columns: ProColumns<TableDataType>[] = [
    {
      title: '头像 / 昵称',
      key: 'nickname',
      dataIndex: 'nickname',
      fixed: 'left',
      align: 'left',
      width: 150,
      search: false,
      render: (_, record) => (
        <Space>
          <AvatarView file_path={record.avatar_info.file_path} />
          {record.nickname}
        </Space>
      ),
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
      align: 'left',
      width: 150,
    },
    // {
    //   key: 'roles',
    //   title: '角色',
    //   dataIndex: 'roles',
    //   align: 'left',
    //   search: false,
    //   render: (text, record) => {
    //     return record?.roles?.map((item) => (
    //       <Tag style={{ marginBottom: '2px', marginTop: '2px' }} key={item.id}>
    //         {item.role_name}
    //       </Tag>
    //     ));
    //   },
    //   ellipsis: false,
    //   width: 150,
    // },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email',
      align: 'left',
      search: false,
      width: 180,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 150,
      render: (_, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="停用"
            checked={record.status === 1}
            onChange={async (c) => {
              const { success } = await userControllerChangeStatus({
                id: record.id,
                status: c ? 1 : 0,
              });
              if (success) {
                message.success('操作成功');
              }
              actionRef.current?.reload();
            }}
          />
        );
      },
      valueType: 'select',
      fieldProps: {
        options: userStatusOptions,
      },
    },
    {
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
      width: 150,
      search: false,
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      width: 150,
      search: false,
    },
  ];

  return (
    <PageContainer header={{ title: pageTitle }}>
      <ProTable<TableDataType, TableSearchParams>
        headerTitle={tableTitle}
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1200 }}
        sticky={{ offsetHeader: 48 }}
        columns={columns}
        request={formatListRes(userControllerList)}
      />
    </PageContainer>
  );
};

export default UserManagement;
