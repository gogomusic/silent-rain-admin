import { useAccess } from '@umijs/max';
import { useCallback } from 'react';

const useHasAccess = () => {
  const access = useAccess() as ReturnType<typeof useAccess> & Record<string, boolean>;
  const hasAccess = useCallback(
    (
      /** 权限标识 */
      code: string,
      config?: {
        /** 自定义前缀，默认为`sys` */
        prefix?: string;
      },
    ) => Boolean(access?.[`${config?.prefix || 'sys'}:${code}`]),
    [access],
  );

  return {
    /** 判断是否有权限操作，前缀“sys:”不用写 */
    hasAccess,
  };
};

export default useHasAccess;
