declare namespace AIS {
  // 子组件接收对象
  type ChildComponentProps = {
    // 是否展示
    visible: boolean;
    // 回调父组件函数-关闭
    cancelView?: () => void;
    // 回调父组件函数-提交
    submitView?: (data) => void;
    // 唯一键值（一般用于详细等功能使用）
    parentKey?: string;
  };
}
