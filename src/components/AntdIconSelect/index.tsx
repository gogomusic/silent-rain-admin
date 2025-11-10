/** https://blog.csdn.net/weixin_47137972/article/details/135341211 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import * as icons from '@ant-design/icons';
import { iconData } from './iconData';
import styles from './index.less';
import type { TabsProps } from 'antd/es/tabs/index';

type Tab = Exclude<TabsProps['items'], undefined>[number];

export const Icon = (props: { name: string }) => {
  const { name } = props;
  const antIcon: Record<string, any> = icons;
  return React.createElement(antIcon[name], { title: name, style: { fontSize: '36px' } });
};

const AntdIconSelect: React.FC<AIS.ChildComponentProps> = (props) => {
  const [viewData, setViewData] = useState<Tab[]>([]);

  useEffect(() => {
    // 定义风格分类数据
    const styleData: Tab[] = [];
    iconData.forEach((styleItem) => {
      // 定义图标分类数据
      const typeData: Tab[] = [];
      // 遍历展示各个图标分类
      const typeIcons = styleItem.icons;
      typeIcons.forEach((typeItem) => {
        // 将各分类下的图标遍历到页面
        const childData = typeItem.icons;
        typeData.push({
          key: typeItem.key,
          label: typeItem.title,
          children: (
            <div className={styles['icon-body']}>
              {childData.map((item) => {
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    key={item}
                    onClick={() => props.submitView?.(item)}
                    className={styles['icon-button']}
                  >
                    <Icon name={item} />
                  </div>
                );
              })}
            </div>
          ),
        });
      });

      styleData.push({
        key: styleItem.key,
        label: styleItem.title,
        children: <Tabs items={typeData} size="large" />,
      });
    });
    setViewData(styleData);
  }, [props]);

  return (
    <Modal
      open={props.visible}
      onCancel={props.cancelView}
      okButtonProps={{ hidden: true }}
      width={'51vw'}
      title="图标选择"
      destroyOnHidden
    >
      <Tabs items={viewData} size="large" />
    </Modal>
  );
};

export default AntdIconSelect;
