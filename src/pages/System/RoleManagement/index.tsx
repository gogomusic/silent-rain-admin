import { statusOptions } from '@/common/options';
import { formatListRes } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { defaultConfig } from '@/common/pro-table.config';
import { roleControllerDelete, roleControllerList } from '@/services/silent-rain-admin/role';
import UpdateRole from './components/UpdateRole';
import AccessButton from '@/components/AccessButton';
import AccessPopconfirmButton from '@/components/AccessPopconfirmButton';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

type TableDataType = API.Role;
type TableSearchParams = API.RoleListDto;
const pageTitle = '';
const tableTitle = '角色管理';

/** 角色管理 */
const RoleManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState<Partial<API.UpdateRoleDto>>();
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const columns: ProColumns<TableDataType>[] = [
    {
      title: '角色',
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
      width: 100,
    },
    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      width: 300,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 100,
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
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 150,
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
          key="role:update"
          code="role:update"
          icon={<EditOutlined />}
          onClick={() => {
            setModalParams(record);
            setMode('update');
            setModalOpen(true);
          }}
        >
          编辑
        </AccessButton>,
        <AccessPopconfirmButton
          key="role:delete"
          code="role:delete"
          onConfirm={async () => {
            const { success } = await roleControllerDelete({ id: record.id });
            if (success) {
              actionRef.current?.reload();
            }
          }}
          buttonProps={{
            children: '删除',
            icon: <DeleteOutlined />,
          }}
        ></AccessPopconfirmButton>,
      ],
    },
  ];

  return (
    <PageContainer header={{ title: pageTitle }}>
      <ProTable<TableDataType, TableSearchParams>
        {...defaultConfig()}
        search={false}
        headerTitle={tableTitle}
        actionRef={actionRef}
        columns={columns}
        request={formatListRes(roleControllerList)}
        toolBarRender={() => [
          <AccessButton
            key="role:create"
            code="role:create"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setModalParams({
                status: 1,
              });
              setMode('create');
              setModalOpen(true);
            }}
          >
            新建角色
          </AccessButton>,
        ]}
      />
      <UpdateRole
        mode={mode}
        open={modalOpen}
        params={modalParams}
        onClose={() => void setModalOpen(false)}
        onSubmit={() => void actionRef.current?.reload()}
      />
    </PageContainer>
  );
};

export default RoleManagement;
