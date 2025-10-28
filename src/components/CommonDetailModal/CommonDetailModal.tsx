import { Descriptions, Empty, Modal } from 'antd';
import { isEmpty } from 'lodash';

interface Props<T extends Record<string, unknown>> {
  title: string;
  open: boolean;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
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
  renderSpecialData = (_label, value) => value,
  exclude,
  record,
  title,
  open,
  onCancel,
  column,
  modalWidth,
}: Props<T>) {
  {
    /** 数据筛选/排序*/
    const formatAndSetData = (data: T) => {
      const _data: Partial<T> = {};
      filter?.forEach((item) => {
        if (!exclude?.includes(item)) {
          _data[item] = data[item];
        }
      });
      const result = isEmpty(_data) ? data : _data;
      for (const key in result) {
        if (exclude?.includes(key)) {
          delete result[key];
        }
      }
      return result;
    };

    const renderDescriptions = (descriptionsData: Record<string, unknown>) => {
      const content = [];
      for (const k in descriptionsData) {
        if (Object.hasOwn(descriptionsData, k)) {
          let children: any = descriptionsData[k];
          if (!children && children !== 0) {
            children = '';
          } else if (typeof children === 'object') {
            try {
              children = JSON.stringify(children);
            } catch (_) {
              children = children.toString();
            }
          }
          content.push(
            <Descriptions.Item label={dict ? dict[k] : k} key={k}>
              {renderSpecialData?.(k, children)}
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
}

export default CommonDetailModal;
