import AntdIconSelect from '@/components/AntdIconSelect';
import { Button } from 'antd';
import { useState } from 'react';

const Demo: React.FC = () => {
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [currentIcon, setCurrentIcon] = useState<string>('');

  const setIcon = (icon: string) => {
    setCurrentIcon(icon);
    setIconVisible(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setIconVisible(true);
        }}
      >
        选择图标
      </Button>
      <AntdIconSelect
        visible={iconVisible}
        parentKey={currentIcon}
        cancelView={() => setIconVisible(false)}
        submitView={setIcon}
      />
      {currentIcon}
    </>
  );
};

export default Demo;
