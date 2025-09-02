"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import Burger from "./Burger";
import DesktopNav from "./DesktopNav";
import PhoneCta from "./PhoneCta";
import PartnerLogo from "./PartnerLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const clusterRef = useRef<HTMLDivElement>(null);

  return (
    <header className="sticky top-0 z-20 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60 overflow-hidden">
      <nav className="mx-auto flex h-[104px] max-w-[1440px] items-center justify-between py-1 lg:px-10">
        <Brand />

        <div className="flex items-center gap-2">
          <div className="relative hidden lg:flex" ref={clusterRef}>
            <Burger open={open} onToggle={() => setOpen((s) => !s)} />
            <DesktopNav open={open} onRequestClose={() => setOpen(false)} attachTo={clusterRef} />
          </div>

          <PhoneCta />

          <PartnerLogo />

          {/* Mobile trigger coming soon*/}
        </div>
      </nav>
    </header>
  );
}
