import { useModel } from '@umijs/max';
import { type AnyEnum, Enum } from 'enum-plus';
import { useEffect, useState } from 'react';
import { dictControllerGetDictData } from '@/services/silent-rain-admin/dict';

/** 全局请求去重缓存，同一时刻相同 code 的请求只发一次 */
const requestCache = new Map<string, Promise<AnyEnum | undefined>>();

/**
 * 使用动态字典
 * @param dictCode 字典编码
 */
const useDict = (dictCode: string) => {
  const { dicts, setDicts } = useModel('dicts');
  const [dict, setDict] = useState<AnyEnum>();

  useEffect(() => {
    // 1. 命中 model 缓存 → 直接使用
    if (dicts[dictCode]) {
      setDict(dicts[dictCode]);
      return;
    }

    // 2. 命中请求去重缓存 → 等待进行中的请求
    if (requestCache.has(dictCode)) {
      requestCache.get(dictCode)?.then(setDict);
      return;
    }

    // 3. 发起新请求
    const promise = dictControllerGetDictData({ code: dictCode })
      .then(({ success, data }) => {
        if (success && data) {
          const dataEnum = Enum(data) as AnyEnum;
          // 写入 model 缓存，后续组件直接读取避免重复请求
          setDicts((prev) => ({ ...prev, [dictCode]: dataEnum }));
          return dataEnum;
        }
        return undefined;
      })
      .finally(() => {
        requestCache.delete(dictCode);
      });

    requestCache.set(dictCode, promise);
    promise.then(setDict);
  }, [dictCode, dicts, setDicts]);

  return [dict] as const;
};

export default useDict;
