"use client";

import React from "react";
import type { Locale } from "@/i18n/get_dictionary";

type Props = {
  locale: Locale;
};

export default function PartnerScroller({ locale }: Props) {
  const logosClients = [
    "/images/home/partner/KlienKami/logo-1.png",
    "/images/home/partner/KlienKami/logo-2.png",
    "/images/home/partner/KlienKami/logo-3.png",
    "/images/home/partner/KlienKami/logo-4.png",
    "/images/home/partner/KlienKami/logo-5.png",
    "/images/home/partner/KlienKami/logo-6.png",
  ];

  const logosPartners = [
    "/images/home/partner/MitraKerjaKami/6estates-1.png",
    "/images/home/partner/MitraKerjaKami/Alibaba-Cloud-Logo-dudi-irawan-1-300x47.png",
    "/images/home/partner/MitraKerjaKami/cyberark-1.jpg",
    "/images/home/partner/MitraKerjaKami/ersa455.jpg",
    "/images/home/partner/MitraKerjaKami/getwell-PhotoRoom.png-PhotoRoom.png",
    "/images/home/partner/MitraKerjaKami/huawei-logo.jpeg",
    "/images/home/partner/MitraKerjaKami/logo-10.png",
    "/images/home/partner/MitraKerjaKami/logo-11.png",
    "/images/home/partner/MitraKerjaKami/logo-12.png",
    "/images/home/partner/MitraKerjaKami/LOGO-HOLL-PhotoRoom.png-PhotoRoom-150x150.png",
    "/images/home/partner/MitraKerjaKami/Oracle-Logo.png",
    "/images/home/partner/MitraKerjaKami/Promise-logo-PhotoRoom.png-PhotoRoom.png",
    "/images/home/partner/MitraKerjaKami/Screenshot-5-PhotoRoom.png-PhotoRoom.png",
    "/images/home/partner/MitraKerjaKami/Security-scorecard.png",
    "/images/home/partner/MitraKerjaKami/Zoom-Logo.png",
  ];

  const loopClients = [...logosClients, ...logosClients, ...logosClients];
  const loopPartners = [...logosPartners, ...logosPartners];

  const partnerTitle = locale === "id" ? "Partner Kami" : "Our Partners";
  const clientTitle = locale === "id" ? "Klien Kami" : "Our Clients";

  return (
    <section className="mt-16 space-y-20">
      
      <div className="space-y-8">
        <h2
          className="
            text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold font-inter lg:leading-[54px]
          "
        >
          {clientTitle}
        </h2>

        <div className="marquee marquee-left">
          <div className="marquee__track">
            {loopClients.map((src, i) => (
              <div key={`client-${i}`} className="marquee__item">
                <img
                  src={src}
                  alt={`Client Logo ${i}`}
                  className="logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2
          className="
            text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold font-inter lg:leading-[54px]
          "
        >
          {partnerTitle}
        </h2>

        <div className="marquee marquee-right">
          <div className="marquee__track">
            {loopPartners.map((src, i) => (
              <div key={`partner-${i}`} className="marquee__item">
                <img
                  src={src}
                  alt={`Partner Logo ${i}`}
                  className="logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }
        .marquee__track {
          display: flex;
          align-items: center;
          gap: 2rem;
          width: max-content;
        }
        .marquee__item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
          
        .logo-img {
          height: 60px;
          width: auto;
          object-fit: contain;
        }

        .marquee-left .marquee__track {
          animation: scroll-left 25s linear infinite;
        }
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee-right .marquee__track {
          animation: scroll-right 25s linear infinite;
        }
        @keyframes scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
