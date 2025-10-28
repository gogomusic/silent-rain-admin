import { formatListRes, normalizeDateRangeParams } from '@/utils';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { logControllerOperationLogList } from '@/services/silent-rain-admin/log';
import { operationStatusOptions } from '@/common/options';
import { Button, Select, Tag } from 'antd';
import { defaultConfig } from '@/common/pro-table.config';
import JsonView from '@/components/JsonView';
import CommonDetailModal from '@/components/CommonDetailModal/CommonDetailModal';
import { logDict } from '@/dicts/log.dict';
import { createStyles } from 'antd-style';

type TableDataType = API.OperationLogResDto;
type TableSearchParams = API.OperationLogListDto & { dateRange?: [string, string] };
const pageTitle = '';
const tableTitle = '操作日志';

const renderOperationStatus = (status: number) => {
  const text = operationStatusOptions.find((item) => item.value === status)?.label;
  const color = status === 1 ? 'var(--success-color)' : 'var(--error-color)';
  return <Tag color={color}>{text}</Tag>;
};

const useStyles = createStyles(() => ({
  failResult: {
    color: 'var(--error-color)',
    fontFamily: 'monospace',
  },
}));

/** 操作日志 */
const OperationLog: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [detailModalParams, setDetailModalParams] = useState<TableDataType>();
  const { styles } = useStyles();

  const columns: ProColumns<TableDataType>[] = [
    {
      title: logDict.year,
      key: 'year',
      dataIndex: 'year',
      hideInTable: true,
      valueType: 'dateYear',
    },
    {
      title: logDict.username,
      key: 'username',
      dataIndex: 'username',
      fixed: 'left',
      width: 100,
      ellipsis: true,
      hideInTable: true,
    },
    {
      title: '昵称（用户名）',
      key: 'nickname',
      dataIndex: 'nickname',
      width: 150,
      ellipsis: true,
      renderText: (_text, record) =>
        record.username ? `${record.nickname} (${record.username})` : '',
    },
    {
      title: logDict.module,
      key: 'module',
      dataIndex: 'module',
      width: 100,
      ellipsis: true,
    },
    {
      title: logDict.action,
      key: 'action',
      dataIndex: 'action',
      width: 150,
      ellipsis: true,
    },
    {
      title: logDict.method,
      key: 'method',
      dataIndex: 'method',
      width: 100,
      ellipsis: true,
      search: false,
    },
    {
      title: logDict.url,
      key: 'url',
      dataIndex: 'url',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.params,
      key: 'params',
      dataIndex: 'params',
      search: false,
      width: 150,
      ellipsis: true,
      renderText: (text) => (text ? JSON.stringify(text) : ''),
    },
    {
      title: logDict.status,
      key: 'status',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      valueType: 'select',
      render: (_dom, entity) => renderOperationStatus(entity.status),
      renderFormItem: () => {
        return (
          <Select
            options={operationStatusOptions.map((item) => {
              return { label: renderOperationStatus(item.value), value: item.value };
            })}
            allowClear
          />
        );
      },
    },
    {
      title: logDict.duration,
      key: 'duration',
      dataIndex: 'duration',
      width: 100,
      renderText: (text) => (text ? `${text} ms` : null),
      align: 'center',
      search: false,
    },
    {
      title: logDict.dateRange,
      key: 'dateRange',
      dataIndex: 'dateRange',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: logDict.ip,
      key: 'ip',
      dataIndex: 'ip',
      width: 120,
    },
    {
      title: logDict.device,
      key: 'device',
      dataIndex: 'device',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.browser,
      key: 'browser',
      dataIndex: 'browser',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.os,
      key: 'os',
      dataIndex: 'os',
      width: 120,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.user_agent,
      key: 'user_agent',
      dataIndex: 'user_agent',
      width: 100,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.create_time,
      key: 'create_time',
      dataIndex: 'create_time',
      width: 150,
      search: false,
    },
    {
      title: logDict.fail_result,
      key: 'fail_result',
      dataIndex: 'fail_result',
      width: 200,
      ellipsis: true,
      search: false,
      render: (_, record) => <div className={styles.failResult}>{record.fail_result}</div>,
    },
    {
      title: logDict.option,
      key: 'option',
      valueType: 'option',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Button
            type="link"
            onClick={() => {
              setDetailModalParams(record);
              setDetailModalOpen(true);
            }}
          >
            查看
          </Button>
        );
      },
    },
  ];

  return (
    <PageContainer header={{ title: pageTitle }}>
      <ProTable<TableDataType, TableSearchParams>
        {...defaultConfig()}
        headerTitle={tableTitle}
        actionRef={actionRef}
        columns={columns}
        request={(p) => formatListRes(logControllerOperationLogList)(normalizeDateRangeParams(p))}
      />
      {/* 详情弹窗 */}
      <CommonDetailModal<TableDataType>
        key="detail-modal"
        title="查看详情"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        dict={logDict}
        record={detailModalParams}
        labelWidth={150}
        modalWidth={768}
        column={1}
        filter={[
          'username',
          'nickname',
          'module',
          'action',
          'method',
          'url',
          'params',
          'ip',
          'status',
          'duration',
          'device',
          'browser',
          'os',
          'user_agent',
          'create_time',
          'fail_result',
        ]}
        renderSpecialData={(label, value) => {
          switch (label) {
            case 'params':
              return <JsonView value={value} />;
            case 'duration':
              return value ? `${value}ms` : null;
            case 'status':
              return renderOperationStatus(value);
            case 'fail_result':
              return <div className={styles.failResult}>{value}</div>;
            default:
              return value;
          }
        }}
      />
    </PageContainer>
  );
};

export default OperationLog;
