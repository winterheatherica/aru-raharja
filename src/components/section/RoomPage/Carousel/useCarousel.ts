import { useEffect, useRef, useState } from "react";

export function useCarousel(initial = 0) {
  // virtualIndex is unbounded (infinite)
  const [virtualIndex, setVirtualIndex] = useState<number>(initial);

  // responsive cfg (gap & widths) determined by container; caller can override
  const [cfg, setCfg] = useState({ gap: 260, activeW: 420, smallW: 220 });

  const containerRef = (ref: HTMLElement | null) => {
    // no-op handle for compatibility; resizing handled by effect below in hook consumer if needed
  };

  // helper to set cfg externally
  const updateCfg = (c: { gap: number; activeW: number; smallW: number }) => setCfg(c);

  useEffect(() => {
    // nothing here by default — actual ResizeObserver managed in Carousel component
  }, []);

  return {
    virtualIndex,
    setVirtualIndex,
    cfg,
    updateCfg,
    containerRef,
  };
}
