"use client";

import Image from "next/image";

export default function Whatsapp() {
  return (
    <a
      href="https://wa.me/6281227008100"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="
        fixed bottom-4 right-4 z-50
        flex items-center justify-center
        h-16 w-16
        md:h-20 md:w-20
        lg:h-24 lg:w-24
        hover:scale-110 transition-transform
      "
    >
      <Image
        src="/images/general/logo/whatsapp.png"
        alt="WhatsApp"
        width={120}
        height={120}
        className="h-full w-full object-contain"
        priority
      />
    </a>
  );
}
