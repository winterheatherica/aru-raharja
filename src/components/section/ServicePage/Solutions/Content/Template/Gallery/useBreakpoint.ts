"use client";

import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(1440);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1440,
    isDesktop: width >= 1440,
  };
}
