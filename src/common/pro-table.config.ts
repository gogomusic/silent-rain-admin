import { ProTableProps } from '@ant-design/pro-components';

export const defaultConfig = <DataType, Params, ValueType>() =>
  ({
    rowKey: 'id',
    defaultSize: 'small',

    revalidateOnFocus: true,
    scroll: { x: 1200 },
    sticky: { offsetHeader: 48 },
    pagination: {
      pageSizeOptions: ['10', '20', '50', '100', '200'],
      showSizeChanger: true,
      showPrevNextJumpers: true,
      showQuickJumper: true,
      size: 'small',
      responsive: true,
    },
    form: {
      syncToUrl: true,
    },
    search: {
      showHiddenNum: true,
      defaultCollapsed: false,
    },
  } as ProTableProps<DataType, Params, ValueType>);
