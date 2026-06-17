import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { createStyles } from 'antd-style';
import { useRef, useState } from 'react';
import { defaultConfig } from '@/common/pro-table.config';
import AccessButton from '@/components/AccessButton';
import CommonDetailModal from '@/components/CommonDetailModal/CommonDetailModal';
import JsonView from '@/components/JsonView';
import { commonDict } from '@/dicts/common.dict';
import { logDict } from '@/dicts/log.dict';
import { logControllerList } from '@/services/silent-rain-admin/log';
import { formatDateRangeParams } from '@/utils';
import { formatListRes } from '@/utils/antd-utils';

type TableDataType = API.Log;
type TableSearchParams = API.LogDto & {
  dateRange?: [string, string];
};
const pageTitle = '';
const tableTitle = '日志管理';

const operationStatusOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
];

const renderOperationStatus = (status: boolean) => {
  const text = operationStatusOptions.find(
    (item) => item.value === status,
  )?.label;
  const color = status === true ? 'var(--success-color)' : 'var(--error-color)';
  return <Tag color={color}>{text}</Tag>;
};

const useStyles = createStyles(() => ({
  errorMessage: {
    color: 'var(--error-color)',
    fontFamily: 'monospace',
  },
}));

/** 操作日志 */
const OperationLog: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [detailModalParams, setDetailModalParams] = useState<TableDataType>();
  const { styles } = useStyles();

  const columns: ProColumns<TableDataType>[] = [
    {
      title: commonDict.year,
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
      title: logDict.nickname,
      key: 'nickname',
      dataIndex: 'nickname',
      hideInTable: true,
    },
    {
      title: '昵称（用户名）',
      key: 'name',
      dataIndex: 'name',
      width: 180,
      search: false,
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
      valueEnum: operationStatusOptions.reduce(
        (acc, item) => {
          acc[String(item.value)] = { text: renderOperationStatus(item.value) };
          return acc;
        },
        {} as Record<string, { text: React.ReactNode }>,
      ),
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
      title: commonDict.dateRange,
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
      title: logDict.userAgent,
      key: 'userAgent',
      dataIndex: 'userAgent',
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: logDict.createdAt,
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: 150,
      search: false,
    },
    {
      title: logDict.errorMessage,
      key: 'errorMessage',
      dataIndex: 'errorMessage',
      width: 200,
      ellipsis: true,
      search: false,
      render: (_, record) => (
        <div className={styles.errorMessage}>{record.errorMessage}</div>
      ),
    },
    {
      title: commonDict.option,
      key: 'option',
      valueType: 'option',
      width: 100,
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <AccessButton
            onClick={() => {
              setDetailModalParams(record);
              setDetailModalOpen(true);
            }}
          >
            查看
          </AccessButton>
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
        request={(p) =>
          formatListRes(logControllerList)(formatDateRangeParams(p))
        }
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
          'userAgent',
          'createdAt',
          'errorMessage',
        ]}
        renderSpecialData={(label, value) => {
          switch (label) {
            case 'params':
              return <JsonView value={value} />;
            case 'duration':
              return value ? `${value}ms` : null;
            case 'status':
              return renderOperationStatus(value);
            case 'errorMessage':
              return <div className={styles.errorMessage}>{value}</div>;
            default:
              return value;
          }
        }}
      />
    </PageContainer>
  );
};

export default OperationLog;
