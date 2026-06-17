import { Descriptions, Empty, Modal } from 'antd';
import { isEmpty } from 'lodash';

interface Props<T extends Record<string, unknown>> {
  title: string;
  open: boolean;
  onCancel: (e: any) => void;
  record: T | undefined;
  column?: number;
  modalWidth?: number | string;
  dict?: Partial<Record<keyof T, string>>;
  /** 传入字段数组，将按照传入顺序展示和排序 */
  filter?: (keyof Partial<T>)[];
  /** 排除的字段 */
  exclude?: (keyof Partial<T>)[];
  labelWidth?: number;
  /** 特殊数据渲染方法 */
  renderSpecialData?: (label: keyof T, value: any) => React.ReactNode;
}

/** 详情弹窗 */
function CommonDetailModal<T extends Record<string, unknown>>({
  dict,
  filter,
  labelWidth,
  renderSpecialData = (_label, value) => {
    // 默认格式化：null/undefined/'' 显示空字符串，对象转 JSON
    if (value === '' || value === null || value === undefined) return '';
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  },
  exclude,
  record,
  title,
  open,
  onCancel,
  column,
  modalWidth,
}: Props<T>) {
  /** 根据 filter/exclude 筛选并排序数据 */
  const formatAndSetData = (data: T) => {
    // 优先使用 filter 指定的字段和顺序，否则使用全部字段
    const filtered = filter
      ? (Object.fromEntries(
          filter
            .filter((key) => !exclude?.includes(key))
            .map((key) => [key, data[key]]),
        ) as Partial<T>)
      : { ...data };

    // 排除指定字段（filter 为空时也需要排除）
    if (exclude) {
      for (const key of exclude) {
        delete filtered[key as string];
      }
    }
    return filtered;
  };

  /** 渲染 Descriptions.Item 列表 */
  const renderDescriptions = (descriptionsData: Record<string, unknown>) => {
    const content: React.ReactNode[] = [];
    for (const k in descriptionsData) {
      if (Object.hasOwn(descriptionsData, k)) {
        const rawValue = descriptionsData[k];
        content.push(
          <Descriptions.Item label={dict ? dict[k as keyof T] : k} key={k}>
            {renderSpecialData(k as keyof T, rawValue)}
          </Descriptions.Item>,
        );
      }
    }
    return content;
  };

  return (
    <Modal
      destroyOnHidden
      centered
      footer={null}
      title={title}
      open={open}
      onCancel={onCancel}
      width={modalWidth || '70%'}
      style={{
        minHeight: '634px',
      }}
    >
      {!isEmpty(record) ? (
        <Descriptions
          styles={{
            root: { minHeight: 100 },
            label: {
              fontWeight: 600,
              width: labelWidth || 200,
              backgroundColor: '#ddebf7',
            },
          }}
          title=""
          bordered
          size="small"
          column={column || 2}
        >
          {renderDescriptions(formatAndSetData(record))}
        </Descriptions>
      ) : (
        <Empty
          style={{
            minHeight: '634px',
          }}
        />
      )}
    </Modal>
  );
}

export default CommonDetailModal;
