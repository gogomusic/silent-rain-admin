import type {
  ProFieldValueType,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
} from '@ant-design/pro-components';
import antdPlugin from '@enum-plus/plugin-antd';
import type { Rule } from 'antd/lib/form';
import type { AnyEnum } from 'enum-plus';
import { Enum } from 'enum-plus';

interface EnumToColumnType<Key> {
  key: Key;
  dataIndex: string;
  title: string;
  width: number;
  ellipsis: boolean;
  search: false | undefined;
  align: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  valueType: ProFieldValueType;
  valueEnum?: AnyEnum;
}
interface EnumToColumnReturnType<Key>
  extends Omit<EnumToColumnType<Key>, 'valueEnum'> {
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
}
interface EnumToFormItemReturnType<Key> {
  name: Key;
  label: string;
  rules?: Rule[];
  options?: Option[];
}

type ToOptionsMode = 'enabled' | 'all' | 'allEnabled';

declare module 'enum-plus/extension' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface EnumExtension<T, K, V> {
    /** 生成`ProTable`列定义的常用字段
     *
     * 默认配置为：`dataIndex`与`key`相同，`title`为枚举的`label`，`search`为`undefined`默认运行搜索，`ellipsis`为`true`，`valueType`为`text`，`align`为`left`
     */
    toColumn: <Key extends K | 'name'>(key: Key) => EnumToColumnReturnType<Key>;
    /** 批量生成`ProTable`列定义的常用字段 */
    toColumns: <Key extends K | 'name'>(
      keys: Key[],
    ) => EnumToColumnReturnType<Key>[];
    /** 生成`ProForm`表单项的常用字段：`name`、`label`、`rules`、`options` */
    toFormItem: <Key extends K | 'name'>(
      key: Key,
    ) => EnumToFormItemReturnType<Key>;
    /** 生成`label`、`value`组成的数组。
     *
     * @param mode `enabled`（默认）仅显示未禁用数据；`all`显示所有数据且禁用项保持`disabled=true`；`allEnabled`显示所有数据且禁用项也可选
     */
    toOptions: (
      mode?: ToOptionsMode,
    ) => { label: string; value: string; disabled?: boolean }[];
  }
}

export function initializeEnumExtensions() {
  Enum.install(antdPlugin);
  Enum.extends({
    toColumn(key: string) {
      const k = key === 'name' ? 'NAME' : key;
      const raw = this.raw(k) as EnumToColumnReturnType<typeof k> & {
        label: string;
        valueEnum?: AnyEnum;
      };
      if (raw === undefined)
        return {
          key: k,
          dataIndex: k,
          title: k,
          width: 120,
          ellipsis: true,
          valueType: 'text',
        };
      const ellipsis = raw?.ellipsis;
      const valueEnum = raw?.valueEnum;

      const fieldProps = valueEnum
        ? {
            options:
              valueEnum.meta?.renderLabel?.length > 0
                ? valueEnum?.toSelect().map((item) => ({
                    value: item.value,
                    label:
                      valueEnum?.raw(item.value)?.renderLabel ?? item.label,
                  }))
                : valueEnum?.toSelect(),
          }
        : undefined;

      return {
        key: key,
        dataIndex: raw?.dataIndex ?? key,
        title: raw.label,
        search: raw?.search,
        width: raw?.width || 120,
        ellipsis: ellipsis === undefined ? true : ellipsis,
        align: raw?.align || 'left',
        valueType: raw.valueType || 'text',
        fixed: raw?.fixed,
        fieldProps: fieldProps,
      };
    },
    toColumns(keys: string[]) {
      return keys.map((key) => this.toColumn(key));
    },
    toFormItem(key: string) {
      const k = key === 'name' ? 'NAME' : key;
      const raw = this.raw(k) as EnumToFormItemReturnType<typeof k> & {
        valueEnum?: AnyEnum;
      };
      if (raw === undefined)
        return {
          name: key,
          label: key,
        };
      return {
        name: key,
        label: raw.label,
        rules: raw?.rules || [],
        options: raw.valueEnum ? raw.valueEnum.toSelect() : undefined,
      };
    },
    toOptions(mode: ToOptionsMode = 'enabled') {
      const showAll = mode !== 'enabled';
      const forceEnableDisabled = mode === 'allEnabled';
      return this.items
        .toSorted((a, b) => {
          return (
            ((a.raw as API.DictItem)?.sort ?? 0) -
            ((b.raw as API.DictItem)?.sort ?? 0)
          );
        })
        .map(({ label, value, raw }) => {
          const isDisabled = !(raw as API.DictItem)?.status;
          return {
            label: label,
            value: value,
            disabled: forceEnableDisabled ? false : isDisabled,
          };
        })
        .filter((item) => (showAll ? true : !item.disabled));
    },
  });
}
