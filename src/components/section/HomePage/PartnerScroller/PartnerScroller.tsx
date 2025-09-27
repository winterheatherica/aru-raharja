"use client";

import React from "react";

export default function PartnerScroller() {
  const logosLeft = [
    "partner/KlienKami/logo-1.png",
    "partner/KlienKami/logo-2.png",
    "partner/KlienKami/logo-3.png",
    "partner/KlienKami/logo-4.png",
    "partner/KlienKami/logo-5.png",
    "partner/KlienKami/logo-6.png",
  ];

  const logosRight = [
    "partner/MitraKerjaKami/6estates-1.png",
    "partner/MitraKerjaKami/Alibaba-Cloud-Logo-dudi-irawan-1-300x47.png",
    "partner/MitraKerjaKami/cyberark-1.jpg",
    "partner/MitraKerjaKami/ersa455.jpg",
    "partner/MitraKerjaKami/getwell-PhotoRoom.png-PhotoRoom.png",
    "partner/MitraKerjaKami/huawei-logo.jpeg",
    "partner/MitraKerjaKami/logo-10.png",
    "partner/MitraKerjaKami/logo-11.png",
    "partner/MitraKerjaKami/logo-12.png",
    "partner/MitraKerjaKami/LOGO-HOLL-PhotoRoom.png-PhotoRoom-150x150.png",
    "partner/MitraKerjaKami/Oracle-Logo.png",
    "partner/MitraKerjaKami/Promise-logo-PhotoRoom.png-PhotoRoom.png",
    "partner/MitraKerjaKami/Screenshot-5-PhotoRoom.png-PhotoRoom.png",
    "partner/MitraKerjaKami/Security-scorecard.png",
    "partner/MitraKerjaKami/Zoom-Logo.png",
  ];

  const loopLeft = [...logosLeft, ...logosLeft, ...logosLeft, ...logosLeft];
  const loopRight = [...logosRight, ...logosRight, ...logosRight];

  return (
    <div className="mt-16 space-y-20">
      <div className="marquee marquee-left">
        <div className="marquee__track">
          {loopLeft.map((src, i) => (
            <div key={`left-${i}`} className="marquee__item">
              <img
                src={src}
                alt={`Partner Logo Left ${i}`}
                className="logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee marquee-right">
        <div className="marquee__track">
          {loopRight.map((src, i) => (
            <div key={`right-${i}`} className="marquee__item">
              <img
                src={src}
                alt={`Partner Logo Right ${i}`}
                className="logo-img"
                loading="lazy"
              />
            </div>
          ))}
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
    </div>
  );
}
