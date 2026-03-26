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
import type { Locale, Dictionary } from "@/i18n/get_dictionary";

type HeaderClientProps = {
  locale: Locale;
  dict?: Dictionary;
};

export default function HeaderClient({ locale, dict }: HeaderClientProps) {
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const clusterRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // setOpenDesktop(false);
    setOpenMobile(false);
    setIsVisible(true);
  }, [pathname]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;

      if (delta > 0 && currentY > 20) {
        setIsVisible(false);
      } else if (delta < 0) {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCloseDesktop = useCallback(() => setOpenDesktop(false), []);
  const handleCloseMobile = useCallback(() => setOpenMobile(false), []);

  return (
    <>
      <div className="h-[104px]" aria-hidden />

      <header
        className={`fixed inset-x-0 top-0 z-30 overflow-hidden bg-white backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-transform duration-200 will-change-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-[104px] max-w-screen-1440 items-center justify-between px-2 py-1 lg:px-10">
          <div className="pl-4 sm:pl-0">
            {/* <Brand locale={locale} /> */}
            <CompanyLogo locale={locale} className="me-4 lg:me-0" />
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

            {/* <PhoneCta locale={locale} /> */}

            {/* <CompanyLogo className="me-4 lg:me-0" /> */}
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
    </>
  );
}
