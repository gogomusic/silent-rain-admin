import { formatListRes, normalizeDateRangeParams } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { logControllerLoginLogList } from '@/services/silent-rain-admin/log';
import { defaultConfig } from '@/common/pro-table.config';

type TableDataType = API.LoginLog;
type TableSearchParams = API.LoginLogListDto & { dateRange?: [string, string] };
const pageTitle = '';
const tableTitle = '登录日志';

/** 登录日志 */
const LoginLog: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableDataType>[] = [
    {
      title: '年份',
      key: 'year',
      dataIndex: 'year',
      hideInTable: true,
      valueType: 'dateYear',
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
      fixed: 'left',
      width: 100,
      ellipsis: true,
    },
    {
      title: '昵称',
      key: 'nickname',
      dataIndex: 'nickname',
      fixed: 'left',
      width: 100,
      ellipsis: true,
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      width: 80,
      valueType: 'select',
      search: false,
      valueEnum: {
        0: { text: '退出系统' },
        1: { text: '登录系统' },
      },
    },
    {
      title: '时间',
      key: 'dateRange',
      dataIndex: 'dateRange',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: 'IP',
      key: 'ip',
      dataIndex: 'ip',
      search: false,
      width: 120,
    },
    {
      title: '设备',
      key: 'device',
      dataIndex: 'device',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: '浏览器',
      key: 'browser',
      dataIndex: 'browser',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: '操作系统',
      key: 'os',
      dataIndex: 'os',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: '用户代理',
      key: 'user_agent',
      dataIndex: 'user_agent',
      width: 500,
      search: false,
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 150,
      search: false,
    },
  ];

  return (
    <PageContainer header={{ title: pageTitle }}>
      <ProTable<TableDataType, TableSearchParams>
        {...defaultConfig()}
        headerTitle={tableTitle}
        actionRef={actionRef}
        columns={columns}
        request={(p) => formatListRes(logControllerLoginLogList)(normalizeDateRangeParams(p))}
      />
    </PageContainer>
  );
};

export default LoginLog;
