import { Access, useAccess } from '@umijs/max';
import { Button, type GetProps, Popconfirm } from 'antd';

type AccessPopconfirmButtonProps = Omit<
  GetProps<typeof Popconfirm>,
  'title'
> & {
  title?: string;
  /** 权限标识 */
  code: `${string}:${string}`;
  buttonProps?: GetProps<typeof Button>;
};

const AccessPopconfirmButton: React.FC<AccessPopconfirmButtonProps> = ({
  code,
  buttonProps,
  title,
  children,
  ...props
}) => {
  const access = useAccess();

  return (
    <Access accessible={Boolean(access[code])}>
      <Popconfirm title={title || '确认删除？'} {...props}>
        <Button type="primary" size="middle" danger {...buttonProps}>
          {children}
        </Button>
      </Popconfirm>
    </Access>
  );
};

export default AccessPopconfirmButton;
