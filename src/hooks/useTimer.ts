import { useCallback, useEffect, useRef, useState } from "react";

/** Hitung mundur berbasis deadline (akurat walau tab sempat lag). */
export function useTimer(onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [duration, setDuration] = useState(0);
  const [running, setRunning] = useState(false);
  const deadline = useRef(0);
  const expireRef = useRef(onExpire);

  useEffect(() => {
    expireRef.current = onExpire;
  });

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const left = Math.max(0, (deadline.current - Date.now()) / 1000);
      setTimeLeft(left);
      if (left <= 0) {
        setRunning(false);
        expireRef.current();
      }
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback((seconds: number) => {
    deadline.current = Date.now() + seconds * 1000;
    setDuration(seconds);
    setTimeLeft(seconds);
    setRunning(true);
  }, []);

  /** Hentikan timer dan kembalikan sisa waktu (detik). */
  const stop = useCallback(() => {
    setRunning(false);
    return Math.max(0, (deadline.current - Date.now()) / 1000);
  }, []);

  return { timeLeft, duration, running, start, stop };
}
