import { type ProFormItemProps, ProFormText } from "@ant-design/pro-components";
import { Col, type InputProps, type InputRef } from "antd";

const FormText: React.FC<ProFormItemProps<InputProps, InputRef>> = ({
  required = false,
  rules = [],
  placeholder = "",
  ...props
}) => {
  return (
    <ProFormText
      {...props}
      placeholder={placeholder}
      rules={
        rules.some((rule) => "required" in rule)
          ? rules
          : [
              {
                required,
                message: `请输入${props.label}`,
              },
              ...rules,
            ]
      }
      fieldProps={{
        ...(props?.fieldProps || {}),
        onKeyDown: (e) => {
          e.stopPropagation();
        },
      }}
    />
  );
};

const CommonFormText: React.FC<ProFormItemProps<InputProps, InputRef>> = ({
  colProps,
  ...props
}) => {
  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <FormText {...props} />
        </Col>
      ) : (
        <FormText {...props} />
      )}
    </>
  );
};

export default CommonFormText;
