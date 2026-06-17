import { CloseCircleOutlined, TeamOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { statusOptions } from '@/common/options';
import { defaultConfig } from '@/common/pro-table.config';
import AccessButton from '@/components/AccessButton';
import AvatarView from '@/components/AvatarView';
import { roleControllerAll } from '@/services/silent-rain-admin/role';
import { userControllerList } from '@/services/silent-rain-admin/user';
import { formatListRes } from '@/utils/antd-utils';
import SetRoles from './components/SetRoles';

type TableDataType = API.User;
type TableSearchParams = API.UserListDto;
const pageTitle = '';
const tableTitle = '用户管理';

/** 用户管理 */
const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [allRoles, setAllRoles] = useState<API.RoleSelectVo[]>([]);
  const [roleModalParams, setRoleModalParams] =
    useState<Partial<API.UserSetRolesDto>>();
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
          <AvatarView
            filePath={record.avatarInfo?.filePath}
            nickname={record.nickname}
          />
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
              style={{ marginBottom: 2, marginTop: 2, marginRight: 5 }}
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
      valueType: 'select',
      fieldProps: {
        options: statusOptions,
      },
    },
    {
      title: '上次登录',
      key: 'lastLoginAt',
      dataIndex: 'lastLoginAt',
      width: 160,
      search: false,
    },
    {
      title: '更新时间',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      width: 150,
      search: false,
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
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
