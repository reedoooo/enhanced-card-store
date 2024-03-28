import { useState, useEffect, useCallback } from 'react';

const useIdle = (timeout, onIdle) => {
  const [isIdle, setIsIdle] = useState(false);
  let idleTimer = null;

  const resetTimer = useCallback(() => {
    clearTimeout(idleTimer);
    setIsIdle(false);
    idleTimer = setTimeout(() => {
      setIsIdle(true);
      if (onIdle) onIdle();
    }, timeout);
  }, [onIdle, timeout]);

  useEffect(() => {
    resetTimer();

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  return isIdle;
};

export default useIdle;
