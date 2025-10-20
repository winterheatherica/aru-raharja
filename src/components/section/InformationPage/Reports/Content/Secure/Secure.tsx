"use client";

import * as React from "react";
import PortraitWithBackground, {
  SecureItem,
} from "../Template/Portrait-with-backgorund/Portrait-with-backgorund";

export default function Secure({ dict, locale }: { dict?: any; locale?: string }) {
  const demo: SecureItem[] = [
    {
      id: "secure-1",
      title: "Secure Magazine April 2025 - Juni 2025",
      date: "21/07/2025",
      viewers: 361,
      downloads: 218,
      image: "/images/information/report/secure/secure1.webp",
      href: "https://majalahsecure.id/files/april_juni_2025/",
    },
    {
      id: "secure-2",
      title: "Secure Magazine Februari 2024 - Februari 2024",
      date: "24/12/2024",
      viewers: 229,
      downloads: 138,
      image: "/images/information/report/secure/secure2.webp",
      href: "https://majalahsecure.id/files/februari_2024/",
    },
    {
      id: "secure-3",
      title: "Secure Magazine Maret 2024 - Maret 2024",
      date: "24/12/2024",
      viewers: 174,
      downloads: 105,
      image: "/images/information/report/secure/secure1.webp",
      href: "https://majalahsecure.id/files/maret_2024/",
    },
    {
      id: "secure-4",
      title: "Secure Magazine April 2024 - April 2024",
      date: "24/12/2024",
      viewers: 231,
      downloads: 139,
      image: "/images/information/report/secure/secure2.webp",
      href: "https://majalahsecure.id/files/april_2024/",
    },
    {
      id: "secure-5",
      title: "Secure Magazine Mei 2024 - Mei 2024",
      date: "24/12/2024",
      viewers: 244,
      downloads: 146,
      image: "/images/information/report/secure/secure1.webp",
      href: "https://majalahsecure.id/files/mei_2024/",
    },
    {
      id: "secure-6",
      title: "Secure Magazine Juni 2024 - Juni 2024",
      date: "24/12/2024",
      viewers: 137,
      downloads: 82,
      image: "/images/information/report/secure/secure2.webp",
      href: "https://majalahsecure.id/files/juni_2024/",
    },
  ];

  const woodBg = "/images/information/report/secure/wood-bg.jpg";

  return (
    <section className="py-8 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="mt-12">
          <div className="grid gap-x-6 gap-y-8 lg:grid-cols-3">
            {demo.map((d) => (
              <PortraitWithBackground key={d.id} item={d} bg={woodBg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
