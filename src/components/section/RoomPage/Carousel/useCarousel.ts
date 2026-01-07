import { useEffect, useRef, useState } from "react";

export function useCarousel(initial = 0) {
  const [virtualIndex, setVirtualIndex] = useState<number>(initial);

  const [cfg, setCfg] = useState({ gap: 260, activeW: 420, smallW: 220 });

  const containerRef = (ref: HTMLElement | null) => {
  };

  const updateCfg = (c: { gap: number; activeW: number; smallW: number }) => setCfg(c);

  useEffect(() => {
  }, []);

  return {
    virtualIndex,
    setVirtualIndex,
    cfg,
    updateCfg,
    containerRef,
  };
}
