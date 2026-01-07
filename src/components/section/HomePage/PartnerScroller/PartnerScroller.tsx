"use client";

import React from "react";
import type { Locale } from "@/i18n/get_dictionary";

type ScrollerItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  order: number;
};

type Props = {
  locale: Locale;
  partners: ScrollerItem[];
  clients: ScrollerItem[];
};

export default function PartnerScroller({
  locale,
  partners,
  clients,
}: Props) {
  const loopClients = [...clients, ...clients, ...clients];
  const loopPartners = [...partners, ...partners];

  const partnerTitle = locale === "id" ? "Partner Kami" : "Our Partners";
  const clientTitle = locale === "id" ? "Klien Kami" : "Our Clients";

  if (!clients.length && !partners.length) {
    return null;
  }

  return (
    <section className="mt-16 space-y-20">
      {!!clients.length && (
        <div className="space-y-8">
          <h2 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter lg:leading-[54px]">
            {clientTitle}
          </h2>

          <div className="marquee marquee-left">
            <div className="marquee__track">
              {loopClients.map((item, i) => (
                <div key={`client-${item.id}-${i}`} className="marquee__item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    className="logo-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!!partners.length && (
        <div className="space-y-8">
          <h2 className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-inter lg:leading-[54px]">
            {partnerTitle}
          </h2>

          <div className="marquee marquee-right">
            <div className="marquee__track">
              {loopPartners.map((item, i) => (
                <div key={`partner-${item.id}-${i}`} className="marquee__item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    className="logo-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
