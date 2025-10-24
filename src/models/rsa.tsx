import { sysControllerGetPublicKey } from '@/services/silent-rain-admin/sys';
import { useEffect, useState } from 'react';

export default () => {
  const [public_key, set_public_key] = useState<string>();
  const fetchRsaKey = async () => {
    const { data } = await sysControllerGetPublicKey();
    set_public_key(data);
  };
  useEffect(() => {
    fetchRsaKey();
  }, []);
  return { public_key };
};
