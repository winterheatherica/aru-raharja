"use client";

import { memo } from "react";
import GridContent from "./GridContent";
import Socials from "./Socials";
import BottomBar from "./BottomBar";

function FooterComponent() {
  return (
    <footer className="mt-6 text-lg lg:mt-16 bg-bumnslate-1 rounded-t-2xl">
      <div
        className="
          relative mx-auto max-w-screen-1440
          px-6 pt-10 pb-10
          lg:px-12 lg:pt-14
          /* kasih ruang ekstra di desktop agar BottomBar absolute tidak menimpa konten */
          lg:pb-40
        "
      >
        <GridContent />
        <Socials />
        <BottomBar />
      </div>
    </footer>
  );
}

export default memo(FooterComponent);
