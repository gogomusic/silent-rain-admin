import { useEffect, useRef, useState } from 'react';

const countDownKey = 'countdown-timestamp';
const codeTimeout = 60 - 1; // 验证码有效时间，单位秒

export const useCountDown = () => {
  const [second, setSecond] = useState(codeTimeout);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startCountDown = (reset: boolean = true) => {
    if (reset) localStorage.setItem(countDownKey, Date.now().toString());
    setLoading(true);
    timerRef.current = window.setInterval(() => {
      setSecond((prev) => {
        if (prev <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setLoading(false);
          return codeTimeout;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const stopCountDown = () => {
    setLoading(false);
    setSecond(codeTimeout);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  useEffect(() => {
    const startTime = localStorage.getItem(countDownKey);
    if (startTime) {
      const now = Date.now();
      const diffSeconds = Math.floor((now - parseInt(startTime, 10)) / 1000);
      if (diffSeconds < codeTimeout) {
        setSecond(codeTimeout - diffSeconds);
        startCountDown(false);
      } else {
        localStorage.removeItem(countDownKey);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      localStorage.removeItem(countDownKey);
    };
  }, []);
  return { startCountDown, stopCountDown, loading, second };
};
