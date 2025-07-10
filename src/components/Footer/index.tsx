import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'gogomusic',
          title: 'gogomusic',
          href: '#',
          blankTarget: false,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/gogomusic/silent-rain-admin',
          blankTarget: true,
        },
      ]}
      copyright={`Powered by 静夜聆雨`}
    />
  );
};

export default Footer;
