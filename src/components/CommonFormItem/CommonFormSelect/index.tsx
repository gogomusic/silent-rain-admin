import { ProFormSelect } from '@ant-design/pro-components';
import { type ProFormSelectProps } from '@ant-design/pro-components/lib/index';

const CommonFormSelect: React.FC<ProFormSelectProps> = ({
  required = false,
  rules = [],
  mode = 'single',
  ...props
}) => {
  const requiredMsgText = mode === 'tags' ? '请输入' : '请选择';
  return (
    <ProFormSelect
      {...props}
      mode={mode}
      rules={
        rules.some((rule) => 'required' in rule)
          ? rules
          : [
              {
                required,
                message: `${requiredMsgText}${props.label}`,
              },
              ...rules,
            ]
      }
    />
  );
};

export default CommonFormSelect;
