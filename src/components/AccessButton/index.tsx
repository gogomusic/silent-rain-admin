import useHasAccess from '@/hooks/useHaveAccess';
import { Access } from '@umijs/max';
import { Button, type GetProps } from 'antd';

type AccessButtonProps = GetProps<typeof Button> & {
  /** 权限标识，不需要加`sys:`前缀
   *
   * 如果不传则不进行权限控制
   */
  code?: string;
};

const AccessButton: React.FC<AccessButtonProps> = ({ code, ...props }) => {
  const { hasAccess } = useHasAccess();

  return (
    <Access accessible={code ? hasAccess(code) : true}>
      <Button
        {...{
          type: 'primary',
          size: 'middle',
          ...props,
        }}
      ></Button>
    </Access>
  );
};

export default AccessButton;
