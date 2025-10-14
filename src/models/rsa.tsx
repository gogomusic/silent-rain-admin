import { sysControllerGetPublicKey } from '@/services/silent-rain-admin/sys';
import { useEffect, useState } from 'react';

interface RsaKey {
  public_key?: string;
  key_id?: string;
}

const LocalRsaKey = 'rsa_key_id';

const defaultKey = Object.freeze({ public_key: undefined, key_id: undefined } as RsaKey);

export default () => {
  const [rsaKey, setRsaKey] = useState<RsaKey>(defaultKey);
  const fetchRsaKey = async () => {
    const localRsaKey = localStorage.getItem(LocalRsaKey);
    const { data } = await sysControllerGetPublicKey({ key_id: localRsaKey || '' });
    const { public_key, key_id } = data || {};
    setRsaKey({ public_key, key_id });
    localStorage.setItem(LocalRsaKey, key_id || '');
  };
  useEffect(() => {
    setTimeout(() => {
      fetchRsaKey();
    }, 1000);
  }, []);
  return { rsaKey };
};
