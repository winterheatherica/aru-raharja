"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import Burger from "./Burger";
import DesktopNav from "./DesktopNav";
import PhoneCta from "./PhoneCta";
import CompanyLogo from "./CompanyLogo";
import MobileNav from "./MobileNav";
import Portal from "./Portal";
import type { Locale, Dictionary } from "@/i18n/getDictionary";

type HeaderProps = {
  locale: Locale;
  dict?: Dictionary;
};

export default function Header({ locale, dict }: HeaderProps) {
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = usePathname();
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // setOpenDesktop(false);
    setOpenMobile(false);
  }, [pathname]);

  const handleCloseDesktop = useCallback(() => setOpenDesktop(false), []);
  const handleCloseMobile = useCallback(() => setOpenMobile(false), []);

  return (
    <header className="sticky top-0 z-30 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/85 overflow-hidden">
      <div className="mx-auto flex h-[104px] max-w-screen-1440 items-center justify-between px-2 py-1 lg:px-10">
        <div className="pl-8 sm:pl-0">
          <Brand locale={locale} />
        </div>

        <nav className="flex flex-row-reverse items-center gap-2 lg:flex-row">
          <div className="relative hidden lg:flex flex-1 min-w-0" ref={clusterRef}>
            <Burger open={openDesktop} onToggle={() => setOpenDesktop((s) => !s)} />
            <DesktopNav
              open={openDesktop}
              onRequestClose={handleCloseDesktop}
              attachTo={clusterRef}
              locale={locale}
              dict={dict}
            />
          </div>

          <div className="lg:hidden">
            <Burger open={openMobile} onToggle={() => setOpenMobile((s) => !s)} />
          </div>

          <PhoneCta locale={locale} />

          <CompanyLogo className="me-4 lg:me-0" />
        </nav>
      </div>

      <Portal>
        <MobileNav
          open={openMobile}
          onRequestClose={handleCloseMobile}
          locale={locale}
          dict={dict}
        />
      </Portal>
    </header>
  );
}
