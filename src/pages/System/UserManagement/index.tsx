import { userControllerList } from '@/services/silent-rain-admin/user';
import { formatListRes } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

type TableDataType = API.UserInfoDto;
type TableSearchParams = API.UserListReqDto;
const pageTitle = '';
const tableTitle = '用户管理';

/** 用户管理 */
const UserManagement: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableDataType>[] = [
    // {
    //   key: 'avatarInfo',
    //   title: '头像',
    //   dataIndex: 'avatarInfo',
    //   fixed: 'left',
    //   width: 80,
    //   align: 'center',
    //   search: false,
    //   render: (text, record) => {
    //     if (record.avatarInfo && record.avatarInfo.length > 0 && record.avatarInfo[0]?.file_path) {
    //       return <Avatar src={record.avatarInfo?.[0]?.file_path} style={{ width: 32 }} />;
    //     } else return <Avatar icon={<UserOutlined />} style={{ width: 32 }} />;
    //   },
    // },
    {
      title: '姓名',
      key: 'nickname',
      dataIndex: 'nickname',
      align: 'left',
      width: 150,
      search: false,
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

    // {
    //   key: 'status',
    //   title: '状态',
    //   dataIndex: 'status',
    //   align: 'center',
    //   width: 150,
    //   render: (text, record) => {
    //     const color = record.status === 0 ? '#1890ff' : '#CCCCCC';
    //     const bgColor = record.status === 0 ? '#fff2f0' : '#f6ffed';
    //     return (
    //       <div style={{ width: '100%' }}>
    //         <div
    //           style={{
    //             color,
    //             boxShadow: `0 0 4px ${color}`,
    //             fontSize: '12px',
    //             borderRadius: '4px',
    //             userSelect: 'none',
    //             padding: '2px 0',
    //             backgroundColor: bgColor,
    //             width: '60px',
    //             margin: '0 auto',
    //           }}
    //         >
    //           {userStatusEnum_CN.find((item) => item.value === record.status)?.label}
    //         </div>
    //       </div>
    //     );
    //   },
    //   valueType: 'select',
    //   fieldProps: {
    //     options: userStatusEnum_CN,
    //   },
    // },
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
