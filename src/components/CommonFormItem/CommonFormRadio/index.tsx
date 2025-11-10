import { ProFormRadio } from '@ant-design/pro-components';
import { type ProFormRadioGroupProps } from '@ant-design/pro-components/lib/index';

const CommonFormRadio: React.FC<ProFormRadioGroupProps> = ({
  required = false,
  rules = [],
  placeholder = '',
  radioType = 'button',
  options = [
    { label: '是', value: 1 },
    { label: '否', value: 0 },
  ],
  ...props
}) => {
  return (
    <ProFormRadio.Group
      {...props}
      radioType={radioType}
      placeholder={placeholder}
      fieldProps={{
        buttonStyle: 'solid',
        ...props.fieldProps,
      }}
      options={options}
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
  );
};

export default CommonFormRadio;
