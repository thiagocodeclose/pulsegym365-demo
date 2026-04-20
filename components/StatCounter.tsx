'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({ value, suffix = '', label, duration = 1600 }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div className="stat-counter" ref={ref}>
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}
