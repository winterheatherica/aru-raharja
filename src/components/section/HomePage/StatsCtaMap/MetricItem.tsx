"use client";

import { useEffect, useRef, useState } from "react";

export default function MetricItem({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    let start: number | null = null;
    const duration = 1200;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [visible, value]);

  return (
    <div ref={ref} className="relative flex h-full gap-1">
      <div className="w-[7px] bg-bumn-gradient-primary-17" />
      <div className="pl-2 flex flex-col mb-1">
        <p className="text-[64px] font-bold leading-[64px] tabular-nums w-[4ch]">
          {count}
          {suffix}
        </p>
        <p className="text-2xl font-light">{label}</p>
      </div>
    </div>
  );
}
