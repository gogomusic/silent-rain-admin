import AntdIconSelect from '@/components/AntdIconSelect';
import { ProFormItem, type ProFormItemProps } from '@ant-design/pro-components';
import { Col } from 'antd';
import React from 'react';
import { useState } from 'react';
import { Icon } from '@/components/AntdIconSelect';
import styles from './index.less';

const SelectIconBtn: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  disabled: boolean;
}> = ({ value, onChange, disabled }) => {
  const [iconVisible, setIconVisible] = useState<boolean>(false);

  const setIcon = (icon: string) => {
    onChange?.(`<${icon} />`);
    setIconVisible(false);
  };
  return (
    <>
      <div
        role="button"
        className={styles.btn}
        tabIndex={0}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        onClick={() => {
          if (!disabled) setIconVisible(true);
        }}
      >
        {value ? <Icon name={value.replace('<', '').replace(' />', '')} /> : null}
        <span className={styles['icon-name']}>{value || '选择图标'}</span>
      </div>
      <AntdIconSelect
        visible={iconVisible}
        parentKey={value}
        cancelView={() => setIconVisible(false)}
        submitView={setIcon}
      />
    </>
  );
};

const AntdIconSelectComponent: React.FC<ProFormItemProps> = ({
  colProps,
  required = false,
  ...props
}) => {
  const disabled = props.disabled ? true : false;

  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <ProFormItem required={required} {...props}>
            <SelectIconBtn disabled={disabled} />
          </ProFormItem>
        </Col>
      ) : (
        <ProFormItem required={required} {...props}>
          <SelectIconBtn disabled={disabled} />
        </ProFormItem>
      )}
    </>
  );
};

const CommonFormAntdIconSelect: React.FC<ProFormItemProps> = ({ colProps, ...props }) => {
  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <AntdIconSelectComponent {...props} />
        </Col>
      ) : (
        <AntdIconSelectComponent {...props} />
      )}
    </>
  );
};

export default CommonFormAntdIconSelect;
