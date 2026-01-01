"use client";

import Image from "next/image";

export default function Whatsapp() {
  return (
    <a
      href="https://wa.me/6281227008100"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        flex h-18 w-18 items-center justify-center
        hover:scale-110 transition-transform
      "
      aria-label="Chat via WhatsApp"
    >
      <Image
        src="/images/general/logo/whatsapp.png"
        alt="WhatsApp"
        width={120}
        height={120}
        priority
      />
    </a>
  );
}
