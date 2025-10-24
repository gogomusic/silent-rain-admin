import { formatListRes, normalizeDateRangeParams } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { logControllerOperationLogList } from '@/services/silent-rain-admin/log';
import { operationStatusOptions } from '@/options';
import { Tag } from 'antd';

type TableDataType = API.OperationLogResDto;
type TableSearchParams = API.OperationLogListDto & { dateRange?: [string, string] };
const pageTitle = '';
const tableTitle = '操作日志';

/** 操作日志 */
const OperationLog: React.FC = () => {
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
      title: '模块',
      key: 'module',
      dataIndex: 'module',
      width: 100,
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: 100,
      ellipsis: true,
    },
    {
      title: '请求方式',
      key: 'method',
      dataIndex: 'method',
      width: 100,
      ellipsis: true,
      search: false,
    },
    {
      title: '请求接口',
      key: 'url',
      dataIndex: 'url',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: '请求参数',
      key: 'params',
      dataIndex: 'params',
      search: false,
      width: 150,
      ellipsis: true,
      renderText: (text) => (text ? JSON.stringify(text) : ''),
    },
    {
      title: '操作结果',
      key: 'status',
      dataIndex: 'status',
      width: 100,
      search: false,
      align: 'center',
      render(_dom, entity) {
        const text = operationStatusOptions.find((item) => item.value === entity.status)?.label;
        const color = entity.status === 1 ? 'success' : 'error';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '响应时间',
      key: 'duration',
      dataIndex: 'duration',
      width: 100,
      renderText: (text) => `${text} ms`,
      align: 'center',
      search: false,
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
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: '操作系统',
      key: 'os',
      dataIndex: 'os',
      width: 120,
      search: false,
      ellipsis: true,
    },
    {
      title: '用户代理',
      key: 'user_agent',
      dataIndex: 'user_agent',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      width: 150,
      search: false,
    },
    {
      title: '异常信息',
      key: 'fail_result',
      dataIndex: 'fail_result',
      width: 200,
      ellipsis: true,
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
        request={(p) => formatListRes(logControllerOperationLogList)(normalizeDateRangeParams(p))}
      />
    </PageContainer>
  );
};

export default OperationLog;
