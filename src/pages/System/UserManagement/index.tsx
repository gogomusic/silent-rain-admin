import AvatarView from '@/components/AvatarView';
import { statusOptions } from '@/common/options';
import { userControllerChangeStatus, userControllerList } from '@/services/silent-rain-admin/user';
import { formatListRes } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { App, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Switch } from 'antd';
import { defaultConfig } from '@/common/pro-table.config';
import { roleControllerAll } from '@/services/silent-rain-admin/role';
import { CloseCircleOutlined, TeamOutlined } from '@ant-design/icons';
import SetRoles from './components/SetRoles';
import AccessButton from '@/components/AccessButton';

type TableDataType = API.User;
type TableSearchParams = API.UserListDto;
const pageTitle = '';
const tableTitle = '用户管理';

/** 用户管理 */
const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const [allRoles, setAllRoles] = useState<API.AllRolesVo[]>([]);
  const [roleModalParams, setRoleModalParams] = useState<Partial<API.SetRolesDto>>();
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  useEffect(() => {
    roleControllerAll().then(({ success, data }) => {
      if (success) setAllRoles(data?.list || []);
    });
  }, []);
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
          <AvatarView file_path={record.avatar_info.file_path} nickname={record.nickname} />
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
    {
      key: 'roles',
      title: '角色',
      dataIndex: 'roles',
      align: 'left',
      search: false,
      render: (_, record) => {
        return record?.roles?.map((item) => {
          const name = allRoles.find((role) => role.id === item)?.name;
          return (
            <Tag
              style={{ marginBottom: '2px', marginTop: '2px' }}
              key={item}
              icon={name ? undefined : <CloseCircleOutlined />}
              color={name ? undefined : 'red'}
            >
              {name || '未知角色'}
            </Tag>
          );
        });
      },
      ellipsis: false,
      width: 150,
    },
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
        options: statusOptions,
      },
    },
    {
      title: '更新时间',
      key: 'updated_at',
      dataIndex: 'updated_at',
      width: 150,
      search: false,
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 150,
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <AccessButton
          key="user:setRoles"
          code="user:setRoles"
          icon={<TeamOutlined />}
          onClick={() => {
            setRoleModalParams(record);
            setRoleModalOpen(true);
          }}
        >
          分配角色
        </AccessButton>,
      ],
    },
  ];

  return (
    <PageContainer header={{ title: pageTitle }}>
      <ProTable<TableDataType, TableSearchParams>
        {...defaultConfig()}
        headerTitle={tableTitle}
        actionRef={actionRef}
        columns={columns}
        request={formatListRes(userControllerList)}
      />
      <SetRoles
        open={roleModalOpen}
        params={roleModalParams}
        allRoles={allRoles}
        onClose={() => void setRoleModalOpen(false)}
        onSubmit={() => void actionRef.current?.reload()}
      />
    </PageContainer>
  );
};

export default UserManagement;
