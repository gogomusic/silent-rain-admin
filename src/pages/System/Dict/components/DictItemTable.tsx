import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App } from 'antd';
import { useRef, useState } from 'react';
import { statusOptions } from '@/common/options';
import AccessButton from '@/components/AccessButton';
import AccessPopconfirmButton from '@/components/AccessPopconfirmButton';
import {
  dictControllerDeleteItem,
  dictControllerListItem,
} from '@/services/silent-rain-admin/dict';
import DictItemUpdateModal from './DictItemUpdateModal';

type TableDataType = API.DictItem;

const DictItemTable: React.FC<{
  typeId: number;
  onTypeChange?: () => void;
}> = ({ typeId, onTypeChange }) => {
  const actionRef = useRef<ActionType>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [modalParams, setModalParams] =
    useState<Partial<API.DictItemUpdateDto>>();
  const { message } = App.useApp();

  const columns: ProColumns<TableDataType>[] = [
    {
      title: '标签',
      key: 'label',
      dataIndex: 'label',
      fixed: 'left',
      width: 150,
    },
    {
      title: '字典值',
      key: 'value',
      dataIndex: 'value',
      width: 150,
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
      width: 80,
      align: 'center',
      search: false,
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
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      width: 200,
      ellipsis: true,
      search: false,
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record) => [
        <AccessButton
          key="dict:itemUpdate"
          code="dict:itemUpdate"
          icon={<EditOutlined />}
          type="link"
          size="small"
          onClick={() => {
            setModalParams(record);
            setModalMode('update');
            setModalOpen(true);
          }}
        >
          编辑
        </AccessButton>,
        <AccessPopconfirmButton
          key="dict:itemDelete"
          code="dict:itemDelete"
          onConfirm={async () => {
            const { success } = await dictControllerDeleteItem({
              id: record.id,
            });
            if (success) {
              message.success('删除成功！');
              actionRef.current?.reload();
              onTypeChange?.();
            }
          }}
          buttonProps={{
            children: '删除',
            type: 'link',
            size: 'small',
            danger: true,
            icon: <DeleteOutlined />,
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <ProTable<TableDataType>
        rowKey="id"
        headerTitle="字典项"
        actionRef={actionRef}
        columns={columns}
        search={false}
        pagination={false}
        params={{ typeId }}
        request={async () => {
          const { success, data } = await dictControllerListItem({
            id: typeId,
          });
          if (success) {
            return {
              data: data?.list || [],
              total: data?.total || 0,
              success: true,
            };
          }
          return { data: [], total: 0, success: false };
        }}
        toolBarRender={() => [
          <AccessButton
            key="dict:itemCreate"
            code="dict:itemCreate"
            size="middle"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => {
              setModalParams({
                typeId,
                status: true,
              });
              setModalMode('create');
              setModalOpen(true);
            }}
          >
            新建字典项
          </AccessButton>,
        ]}
      />
      <DictItemUpdateModal
        open={modalOpen}
        mode={modalMode}
        params={modalParams}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {
          setModalOpen(false);
          actionRef.current?.reload();
          onTypeChange?.();
        }}
      />
    </>
  );
};

export default DictItemTable;
