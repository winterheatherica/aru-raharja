"use client";

import { memo } from "react";
import GridContent from "./GridContent";
import Socials from "./Socials";
import BottomBar from "./BottomBar";
import type { Dictionary, Locale } from "@/i18n/getDictionary";

function FooterComponent({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="mt-6 text-lg lg:mt-16 rounded-t-2xl">
      <div
        className="
          relative mx-auto max-w-screen-1440
          px-6 pt-10 pb-10
          lg:px-12 lg:pt-14
          lg:pb-40
        "
      >
        <GridContent dict={dict} locale={locale} />
        <Socials />
        <BottomBar dict={dict} locale={locale} />
      </div>
    </footer>
  );
}

export default memo(FooterComponent);
