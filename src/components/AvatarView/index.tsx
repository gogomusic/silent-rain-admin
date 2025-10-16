import { UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd';

interface AvatarViewProps {
  isCurrentUser?: boolean;
  file_path?: string;
  nickname?: string;
  size?: number;
}

export const avatarBgColor = '#87d068';

const AvatarView: React.FC<AvatarViewProps> = ({
  isCurrentUser,
  file_path = '',
  nickname = '',
  size = 32,
}) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const path = isCurrentUser ? currentUser?.avatar_info?.file_path : file_path;
  const name = isCurrentUser ? currentUser?.nickname : nickname;

  if (path) {
    return <Avatar src={API_URL + path} size={size} />;
  } else if (name)
    return (
      <Avatar size={size} style={{ backgroundColor: avatarBgColor }}>
        {name?.charAt(0)}
      </Avatar>
    );
  else
    return (
      <Avatar
        size={size}
        icon={<UserOutlined />}
        style={{ backgroundColor: avatarBgColor }}
      ></Avatar>
    );
};

export default AvatarView;
