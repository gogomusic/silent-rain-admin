import { ProFormTreeSelect } from '@ant-design/pro-components';
import type { ProFormTreeSelectProps } from '@ant-design/pro-components';

const CommonFormTreeSelect: React.FC<ProFormTreeSelectProps<any>> = ({
  required = false,
  rules = [],
  placeholder = '',
  fieldProps,
  ...props
}) => {
  const defaultFieldProps = {
    allowClear: true,
    showSearch: true,
    treeNodeFilterProp:
      fieldProps?.treeNodeFilterProp || fieldProps?.fieldNames?.label || undefined,
  };
  return (
    <>
      <ProFormTreeSelect
        {...props}
        fieldProps={{ ...defaultFieldProps, ...fieldProps }}
        placeholder={placeholder}
        rules={
          rules.some((rule) => 'required' in rule)
            ? rules
            : [
                {
                  required,
                  message: `请选择${props.label}`,
                },
                ...rules,
              ]
        }
      />
    </>
  );
};

export default CommonFormTreeSelect;
