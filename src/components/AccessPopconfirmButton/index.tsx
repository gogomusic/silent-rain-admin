import useHasAccess from '@/hooks/useHaveAccess';
import { Access } from '@umijs/max';
import { Button, type GetProps, Popconfirm } from 'antd';

type AccessPopconfirmButtonProps = Omit<GetProps<typeof Popconfirm>, 'title'> & {
  title?: string;
  /** 权限标识，不需要加`sys:`前缀 */
  code: string;
  buttonProps?: GetProps<typeof Button>;
};

const AccessPopconfirmButton: React.FC<AccessPopconfirmButtonProps> = ({
  code,
  buttonProps,
  title,
  children,
  ...props
}) => {
  const { hasAccess } = useHasAccess();

  return (
    <Access accessible={hasAccess(code)}>
      <Popconfirm
        {...{
          title: title || '确认删除？',
          ...props,
        }}
      >
        <Button
          {...{
            type: 'primary',
            size: 'middle',
            danger: true,
            ...buttonProps,
          }}
        >
          {children || buttonProps?.children}
        </Button>
      </Popconfirm>
    </Access>
  );
};

export default AccessPopconfirmButton;
