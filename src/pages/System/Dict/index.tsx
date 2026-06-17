import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { App, Space, Tag } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import { statusOptions } from '@/common/options';
import AccessButton from '@/components/AccessButton';
import AccessPopconfirmButton from '@/components/AccessPopconfirmButton';
import {
  dictControllerDeleteType,
  dictControllerListType,
} from '@/services/silent-rain-admin/dict';
import DictItemTable from './components/DictItemTable';
import DictSseTest from './components/DictSseTest';
import UpdateDictType from './components/UpdateDictType';

const pageTitle = '';

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    display: 'flex',
    gap: 16,
    minHeight: 480,
  },
  sidebar: {
    width: 220,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  typeItem: {
    padding: '10px 16px',
    borderRadius: token.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
  typeItemActive: {
    backgroundColor: token.colorPrimaryBg,
    color: token.colorPrimary,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: token.colorPrimaryBgHover,
    },
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    display: 'inline-block',
    flexShrink: 0,
  },
}));

const DictManagement: React.FC = () => {
  const { message } = App.useApp();
  const { styles, cx } = useStyles();
  const [typeList, setTypeList] = useState<API.DictType[]>([]);
  const [activeTypeId, setActiveTypeId] = useState<number>();
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [typeModalMode, setTypeModalMode] = useState<'create' | 'update'>(
    'create',
  );
  const [typeModalParams, setTypeModalParams] =
    useState<Partial<API.DictTypeUpdateDto>>();

  const activeType = typeList.find((t) => t.id === activeTypeId);

  const loadTypes = async () => {
    const { success, data } = await dictControllerListType({
      current: 1,
      pageSize: 999,
    });
    if (success) {
      const list = data?.list || [];
      setTypeList(list);
      setActiveTypeId((prev) => {
        if (prev && list.some((t) => t.id === prev)) return prev;
        return list.length > 0 ? list[0].id : undefined;
      });
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleDeleteType = async () => {
    if (!activeTypeId) return;
    const { success } = await dictControllerDeleteType({ id: activeTypeId });
    if (success) {
      message.success('删除成功！');
      loadTypes();
    }
  };

  const statusLabel = (status: boolean) =>
    statusOptions.find((o) => o.value === status)?.label;

  return (
    <PageContainer header={{ title: pageTitle }}>
      <div className={styles.wrapper}>
        {/* 左侧：字典类型列表 */}
        <div className={styles.sidebar}>
          <AccessButton
            code="dict:typeCreate"
            icon={<PlusCircleOutlined />}
            block
            size="middle"
            type="primary"
            onClick={() => {
              setTypeModalParams({ status: true });
              setTypeModalMode('create');
              setTypeModalOpen(true);
            }}
          >
            新建字典类型
          </AccessButton>
          {typeList.map((type) => (
            <div
              key={type.id}
              className={cx(
                styles.typeItem,
                activeTypeId === type.id && styles.typeItemActive,
              )}
              onClick={() => setActiveTypeId(type.id)}
            >
              <span>{type.name}</span>
              <span
                className={styles.statusDot}
                style={{
                  backgroundColor: type.status
                    ? 'var(--success-color)'
                    : 'var(--error-color)',
                }}
              />
            </div>
          ))}
        </div>

        {/* 右侧：字典项内容 */}
        <div className={styles.content}>
          {activeType ? (
            <>
              <div
                style={{
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                  padding: '12px 16px',
                  background: 'var(--component-background)',
                  borderRadius: 8,
                }}
              >
                <span>
                  <strong>编码：</strong>
                  {activeType.code}
                </span>
                <Tag color={activeType.status ? 'success' : 'error'}>
                  {statusLabel(activeType.status)}
                </Tag>
                {activeType.remark && (
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {activeType.remark}
                  </span>
                )}
                <Space>
                  <AccessButton
                    code="dict:typeUpdate"
                    type="link"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setTypeModalParams(activeType);
                      setTypeModalMode('update');
                      setTypeModalOpen(true);
                    }}
                  >
                    编辑
                  </AccessButton>
                  <AccessPopconfirmButton
                    code="dict:typeDelete"
                    onConfirm={handleDeleteType}
                    buttonProps={{
                      children: '删除',
                      type: 'link',
                      size: 'small',
                      danger: true,
                      icon: <DeleteOutlined />,
                    }}
                  />
                </Space>
              </div>

              <DictItemTable
                key={activeType.id}
                typeId={activeType.id}
                onTypeChange={loadTypes}
              />
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 300,
                color: 'var(--text-tertiary)',
              }}
            >
              暂无字典类型，请先新建
            </div>
          )}
        </div>
      </div>

      <UpdateDictType
        open={typeModalOpen}
        mode={typeModalMode}
        params={typeModalParams}
        onClose={() => setTypeModalOpen(false)}
        onSubmit={() => {
          setTypeModalOpen(false);
          loadTypes();
        }}
      />
      <DictSseTest />
    </PageContainer>
  );
};

export default DictManagement;
