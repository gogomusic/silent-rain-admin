import { ProFormTextArea, type ProFormItemProps } from '@ant-design/pro-components';
import { Col } from 'antd';
import { type TextAreaProps, type TextAreaRef } from 'antd/lib/input/TextArea';

const FormTextArea: React.FC<ProFormItemProps<TextAreaProps, TextAreaRef>> = (props) => {
  const {
    required = false,
    rules = [],
    placeholder = '',
    fieldProps = { rows: 4 },
    allowClear = true,
    ...restProps
  } = props;
  return (
    <ProFormTextArea
      {...restProps}
      placeholder={placeholder}
      fieldProps={{
        ...fieldProps,
        allowClear,
        rows: fieldProps?.rows,
        onKeyDown: (e) => {
          e.stopPropagation();
        },
      }}
      rules={
        rules.some((rule) => 'required' in rule)
          ? rules
          : [
              {
                required,
                message: `请输入${restProps.label}`,
              },
              ...rules,
            ]
      }
    />
  );
};

const CommonFormTextArea: React.FC<ProFormItemProps<TextAreaProps, TextAreaRef>> = ({
  colProps,
  ...props
}) => {
  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <FormTextArea {...props} />
        </Col>
      ) : (
        <FormTextArea {...props} />
      )}
    </>
  );
};

export default CommonFormTextArea;
