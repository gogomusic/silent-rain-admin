import { Access, useAccess } from '@umijs/max';
import { Button, type GetProps } from 'antd';

type AccessButtonProps = GetProps<typeof Button> & {
  /** 权限标识，如果不传则不进行权限控制 */
  code?: `${string}:${string}`;
};

const AccessButton: React.FC<AccessButtonProps> = ({ code, ...props }) => {
  const access = useAccess();

  return (
    <Access accessible={code ? Boolean(access[code]) : true}>
      <Button type="primary" size="middle" {...props} />
    </Access>
  );
};

export default AccessButton;
