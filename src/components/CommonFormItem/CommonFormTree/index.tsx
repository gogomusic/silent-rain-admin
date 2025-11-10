import { ProFormItem, type ProFormItemProps } from '@ant-design/pro-components';
import React, { Key } from 'react';
import { Tree, TreeProps } from 'antd';
import { type TreeDataNode, Col } from 'antd';

type ValueType = Key[] | { checked: Key[]; halfChecked: Key[] };

const MyTree: React.FC<{
  value?: ValueType;
  onChange?: (value: ValueType) => void;
  disabled: boolean;
  treeData: TreeDataNode[];
  fieldProps: TreeProps;
}> = ({ value, onChange, disabled, treeData, fieldProps }) => {
  return (
    <Tree
      disabled={disabled}
      checkable
      checkedKeys={value}
      onCheck={(checked, info) => {
        if (Array.isArray(value)) onChange?.(checked);
        else {
          onChange?.({
            checked: checked as Key[],
            halfChecked: info.halfCheckedKeys as Key[],
          });
        }
      }}
      treeData={treeData}
      {...fieldProps}
    />
  );
};

const TreeComponent: React.FC<
  ProFormItemProps & {
    treeData: TreeDataNode[];
    fieldProps: TreeProps;
  }
> = ({ colProps, treeData, fieldProps, ...props }) => {
  const disabled = props.disabled ? true : false;

  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <ProFormItem {...props}>
            <MyTree fieldProps={fieldProps} treeData={treeData} disabled={disabled} />
          </ProFormItem>
        </Col>
      ) : (
        <ProFormItem {...props}>
          <MyTree fieldProps={fieldProps} disabled={disabled} treeData={treeData} />
        </ProFormItem>
      )}
    </>
  );
};

const CommonFormTree: React.FC<
  ProFormItemProps & {
    treeData: TreeDataNode[];
    fieldProps: TreeProps;
  }
> = ({ colProps, fieldProps, ...props }) => {
  return (
    <>
      {colProps ? (
        <Col {...colProps}>
          <TreeComponent fieldProps={fieldProps} {...props} />
        </Col>
      ) : (
        <TreeComponent fieldProps={fieldProps} {...props} />
      )}
    </>
  );
};

export default CommonFormTree;
