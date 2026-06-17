import { type AnyEnum, Enum } from 'enum-plus';
import { useCallback, useEffect, useState } from 'react';
import { getToken } from '@/utils';

const SSE_URL = '/api/dict/stream';

export default () => {
  /** 动态字典 */
  const [dicts, setDicts] = useState<Record<string, AnyEnum>>({});

  // SSE 长连接：字典数据变更时自动更新缓存
  useEffect(() => {
    const abort = new AbortController();
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const response = await fetch(SSE_URL, {
          headers: { Authorization: `Bearer ${token}` },
          signal: abort.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`SSE ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let eventData = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              eventData = line.slice(6);
            } else if (line === '' && eventData) {
              // 空行 = 事件结束，解析推送的字典数据
              try {
                const payload = JSON.parse(JSON.parse(eventData).data);
                if (payload.code && Array.isArray(payload.data)) {
                  setDicts((prev) => ({
                    ...prev,
                    [payload.code]: Enum(payload.data) as AnyEnum,
                  }));
                }
              } catch {
                /* ignore malformed SSE data */
              }
              eventData = '';
            }
          }
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
      }

      // 断线重连
      reconnectTimer = setTimeout(connect, 5000);
    };

    connect();

    return () => {
      abort.abort();
      clearTimeout(reconnectTimer);
    };
  }, []);

  const removeDict = useCallback((code: string) => {
    setDicts((prev) => {
      if (prev[code]) {
        const { [code]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }, []);

  return {
    dicts,
    setDicts,
    removeDict,
  };
};
